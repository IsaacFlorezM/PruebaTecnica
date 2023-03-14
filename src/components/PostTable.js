import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import DeletePostModal from "./DeletePostModal";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const PostTable = ({ posts, onDelete }) => {
  const classes = useStyles();
  const [selectedPost, setSelectedPost] = useState(null);

  const handleDelete = () => {
    onDelete(selectedPost.id);
    setSelectedPost(null);
  };

  const handleOpenDeleteModal = (post) => {
    setSelectedPost(post);
  };

  const handleCloseDeleteModal = () => {
    setSelectedPost(null);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="left">Title</TableCell>
              <TableCell align="left">Body</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell component="th" scope="row">
                  {post.id}
                </TableCell>
                <TableCell align="left">{post.title}</TableCell>
                <TableCell align="left">{post.body}</TableCell>
                <TableCell align="center">
                  <IconButton
                    component={Link}
                    to={`/posts/${post.id}`}
                    aria-label="edit">
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleOpenDeleteModal(post)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <DeletePostModal
        post={selectedPost}
        open={Boolean(selectedPost)}
        onClose={handleCloseDeleteModal}
        onDelete={handleDelete}
      />
    </>
  );
};

PostTable.propTypes = {
  posts: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default PostTable;
