import React from 'react'
import { Card, CardBody, CardTitle, CardText, Form, FormGroup, Input } from "reactstrap"
import { graphql, StaticQuery, Link } from "gatsby"
import Img from "gatsby-image"

import { FiFacebook } from 'react-icons/fi';
import { SiInstagram, SiTwitter } from 'react-icons/si';
import { AiFillLinkedin } from 'react-icons/ai';

const Sidebar = ({ author, authorFluid }) => {
    return (
        <div>
            {author && ( //if we have an author from (authors.js) that match with the (frontmatter author) grab all the way from singlePost.js (singlePost/layout/sidebar) show this card
                <Card>
                    <Img className="card-image-top" fluid={authorFluid} />
                    <CardBody>
                        <CardTitle className="text-center text-uppercase mb-3">{author.name}</CardTitle>
                        <CardText>{author.bio}</CardText>
                        <div className="author-social-links text-center">
                            <ul>
                                <li>
                                    <a href={author.facebook} target="_blank" rel="noopener noreferrer" className="facebook">
                                        <FiFacebook />
                                    </a>
                                </li>
                                <li>
                                    <a href={author.instagram} target="_blank" rel="noopener noreferrer" className="instagram">
                                        <SiInstagram />
                                    </a>
                                </li>
                                <li>
                                    <a href={author.twitter} target="_blank" rel="noopener noreferrer" className="twitter">
                                        <SiTwitter />
                                    </a>
                                </li>
                                <li>
                                    <a href={author.linkedin} target="_blank" rel="noopener noreferrer" className="linkedin">
                                        <AiFillLinkedin />
                                    </a>
                                </li>

                            </ul>
                        </div>
                    </CardBody>
                </Card>
            )}
            <Card>
                <CardBody className="text-center" >
                    <CardTitle className="text-center text-uppercase mb-3">
                        Newsletter
                    </CardTitle>
                    <Form className="text-center">
                        <FormGroup>
                            <Input
                                type="email"
                                name="email"
                                placeholder="Your email address.."
                            />
                        </FormGroup>
                    </Form>
                    <button className="btn btn-outline-success text-uppercase">
                        Subscribe
                    </button>
                </CardBody>
            </Card>
            <Card>
                <CardBody>
                    <CardTitle className="text-center text-uppercase">
                        Advertisement
                    </CardTitle>
                    <img src="https://via.placeholder.com/320x200" alt="advertisement-img" style={{ width: "100%" }} />
                </CardBody>
            </Card>
            <Card>
                <CardBody>
                    <CardTitle className="text-center text-uppercase mb-3">
                        Recent Posts
                    </CardTitle>
                    <StaticQuery query={sidebarQuery} render={(data) => (
                        <div>
                            {data.allMarkdownRemark.edges.map(({ node }) => (
                                <Card key={node.id}>
                                    <Link to={node.fields.slug}>
                                        <Img className="card-image-top" fluid={node.frontmatter.image.childImageSharp.fluid} />
                                    </Link>
                                    <CardBody>
                                        <CardTitle>
                                            <Link to={node.fields.slug}>
                                                {node.frontmatter.title}
                                            </Link>
                                        </CardTitle>
                                    </CardBody>
                                </Card>
                            ))}
                        </div>
                    )}
                    />
                </CardBody>
            </Card>
        </div>
    )
}

const sidebarQuery = graphql`
    query sidebarQuery {
    allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}, limit: 3) {
        edges {
        node {
            id
            frontmatter {
            title
            image {
                childImageSharp {
                fluid(maxWidth: 300) {
                    ...GatsbyImageSharpFluid
                }
                }
            }
            }
            fields{
            slug
        }
        }
        }
    }
    }
`

export default Sidebar
