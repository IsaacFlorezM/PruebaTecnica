import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Grid, TextField, Button, Typography } from "@material-ui/core";
import axios from "axios";

const PostEdit = () => {
  const [post, setPost] = useState({});
  const { id } = useParams();
  const history = useNavigate();
  const { register, handleSubmit, errors } = useForm();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${id}`
        );
        setPost(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPost();
  }, [id]);

  const onSubmit = async (data) => {
    try {
      const { title, body } = data;
      await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        title,
        body,
      });
      history.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="post-edit-container">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5" component="h2">
            Edit Post
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              name="title"
              label="Title"
              defaultValue={post.title}
              inputRef={register({ required: true })}
              error={errors.title ? true : false}
              helperText={errors.title && "Title is required"}
              fullWidth
              margin = "normal"
            />
            <TextField
              name = "body"
              label = "Body"
              defaultValue = {post.body}
              inputRef = {register({ required: true })}
              error = {errors.body ? true : false}
              helperText = {errors.body && "Body is required"}
              fullWidth
              margin = "normal"
              multiline
              rows={4}
            />
            <Button variant="contained" color="primary" type="submit">
              Update
            </Button>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default PostEdit;
