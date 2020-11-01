const { slugify } = require(`./src/util/utilityFunctions`);
const path = require('path') //we will be able to search the path in our project
const authors = require('./src/util/authors')

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
    const singlePostTemplate = path.resolve("src/templates/single-post.js")

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

        posts.forEach(({ node }) => {
            createPage({
                path: node.fields.slug,
                component: singlePostTemplate,
                context: {
                    //Passing slug for template to use to get post
                    slug: node.fields.slug,
                    // Find author imageUrl from authors and pass it to the single post template
                    imageUrl: authors.find(x => x.name === node.frontmatter.author).imageUrl
                }
            })
        })
    })
}