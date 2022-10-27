import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import http from "../lib/http";
import formatDate from "../lib/formatDate";

const Post = () => {
  const { id: postId } = useParams();
  const [post, setPost] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const { data } = await http.get(`/${postId}`);
      //console.log(await http.get(`/${postId}`))
      setPost(data.data.post);
    }
    fetchData();
  }, [postId]);
  const deletePost = async () => {
    //await axios.delete('http://localhost:4000/api/posts/6358ffb898f7f3f703cc2e5').catch((error) => console.log("Error: ", error));;
    await http.delete(`/${postId}`);
    //await http.delete('/api/posts/:id', { params:{ id:'6358ffb898f7f3f703cc2e50'}});
    //await http.delete('/api/posts/6358ffb898f7f3f703cc2e50');
    navigate("/");
  };
  //console.log(http.delete(`/api/posts/${postId}`))

  var content = post.content;
  var TokenizeWords = () => {
    //var content = post.content;
    let tokenizer = content.replace(/[&\/\\#`,+()$~%.'":*!?<>{}]/g, '').split(" "); // Example: Character 'á' is U+00E1
    console.log(tokenizer);
    var corpus = [];
    for (let i = 0; i < tokenizer.length; i++) {
      if (tokenizer[i] == "") continue;
      else corpus[i] = tokenizer[i].toLowerCase();
    }
    //console.log(corpus);

    corpus.map(item => console.log(item))

    /*  content.match(/\b[\w']+\b/g).map((item, index) => {
      console.log(item);
      return item;
    }); */
  };

  return (
    <>
      <Container className="my-5 text-justified" style={{ maxWidth: "800px" }}>
        <h1>{post.title}</h1>
        <div className="text-secondary mb-4">{formatDate(post.createdAt)}</div>
        {/* {post.tags?.map((tag) => <span>{tag} </span>)} */}
        <div className="h4 mt-5">{post.content}</div>
        <div className="text-secondary mb-5">- {post.author}</div>
        <div className="mb-5">
          <Link
            variant="primary"
            className=" btn btn-primary m-1"
            to={`/posts/${postId}/edit`}
          >
            Edit
          </Link>

          <Button
            variant="warning"
            className=" btn btn-primary m-1"
            style={{ color: "white" }}
            onClick={TokenizeWords}
          >
            Tokenize
          </Button>

          <Button
            variant="danger"
            className=" btn btn-primary m-1"
            onClick={deletePost}
          >
            Delete
          </Button>
        </div>
        <Link to="/" style={{ textDecoration: "none" }}>
          &#8592; Back to Home
        </Link>
      </Container>
      {/* <div>
        {content.split(" ").map((item, index) => {
          return <div key={index}>{item}</div>;
        })}
      </div> */}
    </>
  );
};

export default Post;
