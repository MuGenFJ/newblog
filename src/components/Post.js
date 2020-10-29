import React from 'react';
import {
    Card, CardText, CardBody,
    CardTitle, CardSubtitle,
} from 'reactstrap';
import { Link } from "gatsby"
import Img from "gatsby-image"

const Post = ({ title, author, path, date, body, thumbnail }) => {
    return (
        <Card>
            <Link to={path}>
                <Img className="card-image-top" fluid={thumbnail} alt="blog-thumbnail" />
            </Link>
            <CardBody>
                <CardTitle>
                    <Link to={path}>{title}</Link>
                </CardTitle>
                <CardSubtitle>
                    <span className="text-info">{date}</span> by {''}
                    <span className="text-info">{author}</span>
                </CardSubtitle>
                <CardText>{body}</CardText>
                <Link to={path} className="btn btn-outline-primary float-right">
                    Read more
                    </Link>

            </CardBody>
        </Card>
    );
};

export default Post; 
