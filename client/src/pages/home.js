import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import http from '../lib/http';
import formatDate from '../lib/formatDate';
import methods from '../lib/http';
import axios from 'axios';

const Home = () => {
  const [posts, setPosts] = useState([]); 
  useEffect(() => {
     /* function fetchData() {
      console.log(methods.get());
      const { data } = methods.get('/api/posts/').then(res => {
        var blogs = res.data;
        //console.log(blogs);
      setPosts(blogs.posts);
      });

    

    }
    fetchData(); */
     function result(){
    const res = axios.get("http://localhost:3000/api/posts").then((response)=>{
      console.log(response)
    });
  console.log(res)
} result()
  }, []);
  /* const datas =  http.get('/api/posts/').then(res => {
    var blogs = res.data.posts;
    console.log(blogs);
  });

  console.log(datas) */

  
  return (
    <>
      <Container className="my-5" style={{ maxWidth: '800px' }}>
        <Image
          src="avatar.jpeg"
          width="150"
          style={{ borderRadius: '50%' }}
          className="d-block mx-auto img-fluid"
        />
        <h2 className="text-center">Welcome to the Digital Marketing blog</h2>
      </Container>
      <Container style={{ maxWidth: '800px' }}>
        <ListGroup variant="flush" as="ol">
          {
            posts.map((post) => {
              return (
                <ListGroup.Item key={post._id}> 
                  <div className="fw-bold h3">
                    <Link to={`/posts/${post._id}`} style={{ textDecoration: 'none' }}>{post.title}</Link>
                  </div>
                  <div>{post.author} - <span className="text-secondary">{formatDate(post.createdAt)}</span></div>
                </ListGroup.Item>
              );
            })
          }
        </ListGroup>
      </Container>
    </>
  );
};

export default Home;