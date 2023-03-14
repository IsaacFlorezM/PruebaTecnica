import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { useForm } from "../hooks/useForm";
import { Container, Box, Typography, Button } from "@material-ui/core";
import PostForm from "../components/PostForm";

const EditPost = () => {
  const { id } = useParams();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState({});
  const { values, handleInputChange, handleSubmit } = useForm(updatePost);

  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      setPost(data);
      setLoading(false);
    };
    fetchPost();
  }, [id]);

  function updatePost() {
    axios
      .put(`https://jsonplaceholder.typicode.com/posts/${id}`, values)
      .then(() => {
        history.push("/");
      });
  }

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" align="center">
          Edit Post
        </Typography>
        {loading ? (
          <Typography variant="body1" align="center">
            Loading...
          </Typography>
        ) : (
          <PostForm
            initialValues={{
              title: post.title,
              body: post.body,
            }}
            handleSubmit={handleSubmit}
            handleInputChange={handleInputChange}
            submitButtonText="Update"
          />
        )}
        <Box mt={2}>
          <Button variant="contained" onClick={() => history.push("/")}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default EditPost;
