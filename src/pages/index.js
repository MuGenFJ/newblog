import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { StaticQuery, graphql } from "gatsby"
import Post from "../components/Post"


const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Home Page</h1>
    <StaticQuery query={indexQuery} render={data => {
      return (
        <div>
          {data.allMarkdownRemark.edges.map(({ node }) => (
            <Post
              title={node.frontmatter.title}
              author={node.frontmatter.author}
              path={node.frontmatter.path}
              date={node.frontmatter.date}
              body={node.excerpt}
            />
          ))}
        </div>
      )
    }}
    />
  </Layout>
)

const indexQuery = graphql`
query MyQuery {
  allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}) {
    edges {
      node {
        id
        frontmatter {
          author
          date(formatString: "MMM Do YYYY")
          path
          title
        }
        excerpt
      }
    }
  }
}
`

export default IndexPage
