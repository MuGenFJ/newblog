const { slugify } = require(`./src/util/utilityFunctions`);
const path = require('path') //we will be able to search the path in our project
const authors = require('./src/util/authors')
const _ = require('lodash')

exports.onCreateNode = ({ node, actions }) => {
    const { createNodeField } = actions
    if (node.internal.type === `MarkdownRemark`) {
        const slugFromTitle = slugify(node.frontmatter.title)
        createNodeField({
            node,
            name: `slug`,
            value: slugFromTitle
        })
    }
}

exports.createPages = ({ actions, graphql }) => {
    const { createPage } = actions;

    const templates = {
        singlePost: path.resolve("src/templates/single-post.js"),
        tagsPage: path.resolve("src/templates/tags-page.js"),
    }

    return graphql(`
        {
            allMarkdownRemark {
                edges {
                    node {
                    fields {
                    slug
                    }
                    frontmatter {
                    tags
                    author
                    }
                }
                }
            }
        }
    `).then(res => {
        if (res.errors) return Promise.reject(res.errors) //reject the error if the result is an error

        const posts = res.data.allMarkdownRemark.edges

        // Create single blog post pages
        posts.forEach(({ node }) => {
            createPage({
                path: node.fields.slug,
                component: templates.singlePost,
                context: {
                    //Passing slug for template to use to get post
                    slug: node.fields.slug,
                    // Find author imageUrl from authors and pass it to the single post template
                    imageUrl: authors.find(x => x.name === node.frontmatter.author).imageUrl
                }
            })
        })

        // It will assemble all the tags to the tag array
        let tags = []
        _.each(posts, edge => {//for each posts in the edge 
            if (_.get(edge, 'node.frontmatter.tags')) { //get from edge the tags in frontmatter if there is something otherwise do nothing
                tags = tags.concat(edge.node.frontmatter.tags)
            }
        })

        // It will add the counts behind the tag
        let tagPostCounts = {}
        tags.forEach(tag => {
            tagPostCounts[tag] = (tagPostCounts[tag] || 0) + 1; //[tag] is a proprety same name of the tag. if we don't have tagPostCounts[tag] it will be 0 otherwise we add 1
        })

        tags = _.uniq(tags) //eleminate all duplicate tags

        // Create tags page
        createPage({
            path: `/tags`,
            component: templates.tagsPage,
            context: {
                tags,
                tagPostCounts,
            }
        })
    })
}