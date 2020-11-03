import React from 'react'
import Layout from '../components/layout'
import Post from '../components/Post'
import { graphql } from 'gatsby'

const postList = (props) => {
    const posts = props.data.allMarkdownRemark.edges
    const { currentPage } = props.pageContext
    
    return (
        <Layout pageTitle={`Page: ${currentPage}`} >
            {posts.map(({ node }) => ( //from each edge we gonna get the node and from each node
                <Post key={node.id}
                    slug={node.fields.slug}
                    title={node.frontmatter.title}
                    author={node.frontmatter.author}
                    date={node.frontmatter.date}
                    body={node.excerpt}
                    tags={node.frontmatter.tags}
                    thumbnail={node.frontmatter.image.childImageSharp.fluid}
                />
            ))}
        </Layout>
    )
}

export const postListQuery = graphql`
    query postListQuery($skip: Int!, $limit: Int!){
        allMarkdownRemark(
            sort: {fields: [frontmatter___date], order: DESC}
            limit: $limit
            skip: $skip
        ){
            edges{
                node{
                    id
                    frontmatter{
                        title
                        date(formatString: "MMMM Do YYYY")
                        author
                        tags
                        image {
                            childImageSharp{
                                fluid(maxWidth: 650, maxHeight: 380){
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                    }
                    fields {
                        slug
                    }
                    excerpt
                }
            }
        }
    }
`

export default postList