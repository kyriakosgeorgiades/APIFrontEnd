import React, {useState, useEffect} from 'react';
import { withRouter } from 'react-router';
import { Image, Row, Col, Typography } from 'antd'
import { status, json } from '../utilities/requestHandlers';

const { Title, Paragraph } = Typography;

const Post = ({match}) => {
    const [post, setPost] = useState(undefined)
    useEffect(() => {
        const { id } = match.params; 
        fetch(`https://famous-pyramid-3000.codio-box.uk/api/v1/dogs/${id}`)
        .then(status => status.json())
        .then(post => {
          setPost(post)
        })
        .catch(err => {
          console.log(`Fetch error for post ${id}`)
        });
    },[])
    if (!post) {
        return <h3>Loading post...</h3>
      }
  
    
    return (
        <div>
          <Row type="flex" justify="space-around" align="middle">
            <Col span={6} align="center">
              <Image width={200} alt="Post" src={post.imgURL} />
            </Col>
            <Col span={12}>
              <Title>{post.name}</Title>
                          <div>Breed: {post.breed}</div>
                          <div>Sex: {post.sex}</div>
                          <div>Age: {post.age}</div>
													<div>Location: {post.location}</div>
              <Paragraph>{post.description}</Paragraph>
            </Col>
            <Col span={6} align="center">
              
            </Col>
          </Row>
        </div>
      );
}

export default withRouter(Post);