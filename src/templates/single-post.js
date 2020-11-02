import React from 'react'
import Layout from '../components/layout'
import { graphql, Link } from "gatsby"
import SEO from '../components/seo'
import { Badge, Card, CardBody, CardSubtitle } from 'reactstrap'
import Img from 'gatsby-image'
import { slugify } from '../util/utilityFunctions'
import authors from '../util/authors'

import { FiFacebook } from 'react-icons/fi';
import { SiTwitter } from 'react-icons/si';
import { AiFillLinkedin } from 'react-icons/ai';

import { DiscussionEmbed } from 'disqus-react';

const singlePost = ({ data, pageContext }) => {
    const post = data.markdownRemark.frontmatter
    const author = authors.find(x => x.name === post.author)

    const baseUrl = "https://myblog.co.uk/"

    const disqusShortname = "https-myblog-co-uk"
    const disqusConfig = {
        identifier: data.markdownRemark.id,
        title: post.title,
        url: baseUrl + pageContext.slug
    }

    return (
        <Layout pageTitle={post.title} postAuthor={author} authorImageFluid={data.file.childImageSharp.fluid}>
            <SEO title={post.title} />
            <Card>
                <Img className="card-image-top" fluid={post.image.childImageSharp.fluid} />
                <CardBody>
                    <CardSubtitle>
                        <span className="text-info">{post.date}</span> by {' '}
                        <span className="text-info">{post.author}</span>
                    </CardSubtitle>
                    <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
                    <ul className="post-tags">
                        {post.tags.map(tag => (
                            <li key={tag}>
                                <Link to={`/tag/${slugify(tag)}`}>
                                    <Badge color="primary">{tag}</Badge>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </CardBody>
            </Card>
            <h3 className="text-center">
                Share this post
            </h3>
            <div className="text-center social-share-links">
                <ul>
                    <li>
                        <a href={'https://www.facebook.com/sharer/sharer.php?u=' + baseUrl + pageContext.slug} className="facebook" target="_blank" rel="noopener noreferrer">
                            <FiFacebook />
                        </a>
                    </li>
                    <li>
                        <a href={'https://twitter.com/'} className="twitter" target="_blank" rel="noopener noreferrer">
                            <SiTwitter />
                        </a>
                    </li>
                    <li>
                        <a href={'https://www.linkedin.com/shareArticle?url=' + baseUrl + pageContext.slug} className="linkedin" target="_blank" rel="noopener noreferrer">
                            <AiFillLinkedin />
                        </a>
                    </li>
                </ul>
            </div>
            <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
        </Layout>
    )
}

//we did here export because is not a staticQuery, we will add some variable
export const postQuery = graphql` 
    query blogPostBySlug ($slug: String!, $imageUrl: String!){
        markdownRemark (fields: { slug: { eq: $slug }}) { 
            id
            html
            frontmatter {
            title
            author
            date(formatString: "MMMM Do YYYY")
            tags
            image {
                childImageSharp {
                fluid(maxWidth: 700) {
                    ...GatsbyImageSharpFluid
                }
                }
            }
            }
        }
        file(relativePath: {eq: $imageUrl}){
            childImageSharp{
                fluid(maxWidth: 300){
                    ...GatsbyImageSharpFluid
                }
            }
        }
    }
`

export default singlePost
