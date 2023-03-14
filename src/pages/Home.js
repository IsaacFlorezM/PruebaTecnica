import React, { useState, useEffect } from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import PostTable from "../components/PostTable";
import PostList from "../components/PostList";
import Pagination from "../components/Pagination";
import { getAllPosts } from "../services/postService";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getAllPosts();
        setPosts(response.data);
        setLoading(false);
      } catch (e) {
        console.error(e);
      }
    }

    fetchData();
  }, []);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleDelete = (postId) => {
    setPosts(posts.filter((p) => p.id !== postId));
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <PostTable />
      </Grid>
      <Grid item xs={12}>
        <PostList posts={currentPosts} onDelete={handleDelete} />
      </Grid>
      <Grid item xs={12}>
        {loading ? (
          <CircularProgress />
        ) : (
          <Pagination
            totalPosts={posts.length}
            postsPerPage={postsPerPage}
            currentPage={currentPage}
            onChange={handlePageChange}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default Home;
