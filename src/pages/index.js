import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { StaticQuery, graphql } from "gatsby"
import Post from "../components/Post"
import { Row, Col } from "reactstrap"


const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Home Page</h1>
    <Row>
      <Col md="8" >
        <StaticQuery query={indexQuery} render={data => {
          return (
            <div>
              {data.allMarkdownRemark.edges.map(({ node }) => (
                <Post
                  title={node.frontmatter.title}
                  thumbnail={node.frontmatter.image.childImageSharp.fluid}
                  author={node.frontmatter.author}
                  path={node.frontmatter.path}
                  date={node.frontmatter.date}
                  body={node.excerpt}
                  tags={node.frontmatter.tags}
                />
              ))}
            </div>
          )
        }}
        />
      </Col>
      <Col md="4">
        <div style={{ width: "100%", height: "100%", backgroundColor: "grey" }}></div>
      </Col>
    </Row>
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
          tags
          image {
            childImageSharp {
              fluid(maxWidth: 600) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        excerpt
      }
    }
  }
}
`

export default IndexPage
