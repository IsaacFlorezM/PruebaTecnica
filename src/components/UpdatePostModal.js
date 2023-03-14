import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@material-ui/core';
import axios from 'axios';

const UpdatePostModal = ({ open, handleClose, post, setPosts }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: { title: post.title, body: post.body },
  });

  const [error, setError] = useState('');

  const handleUpdate = async (data) => {
    try {
      const updatedPost = { ...post, title: data.title, body: data.body };
      await axios.put(`https://jsonplaceholder.typicode.com/posts/${post.id}`, updatedPost);
      setPosts((prevPosts) => {
        const updatedPosts = prevPosts.map((p) => (p.id === post.id ? updatedPost : p));
        return updatedPosts;
      });
      handleClose();
    } catch (error) {
      setError('Failed to update post');
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Update Post</DialogTitle>
      <form onSubmit={handleSubmit(handleUpdate)}>
        <DialogContent>
          <TextField
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            {...register('title', { required: true })}
          />
          <TextField
            margin="dense"
            label="Body"
            type="text"
            fullWidth
            {...register('body', { required: true })}
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Update
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UpdatePostModal;
