import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import DeletePostModal from "./DeletePostModal";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const PostList = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(true);
  const [deleteModalPostId, setDeleteModalPostId] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.get("https://jsonplaceholder.typicode.com/posts").then((res) => {
      setPosts(res.data);
      setLoading(false);
    });
  }, []);
  const handleUpdate = (postId) => {
    navigate(`/posts/${postId}/edit`);
  };
  const handleDelete = (postId) => {
    setDeleteModalPostId(postId);
    setDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setDeleteModalOpen(false);
    setDeleteModalPostId(null);
  };

  const deletePost = (postId) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then(() => {
        setPosts(posts.filter((post) => post.id !== postId));
        handleDeleteModalClose();
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Body</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.body}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    onClick={() =>
                      handleUpdate(post.id, post.title, post.body)
                    }>
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(post.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {deleteModalOpen && (
        <DeletePostModal
          postId={deleteModalPostId}
          handleClose={handleDeleteModalClose}
          handleDelete={() => deletePost(deleteModalPostId)}
        />
      )}
    </div>
  );
};

export default PostList;
