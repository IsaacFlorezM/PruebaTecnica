import React from "react";
import { Switch } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

import NavBar from "./components/NavBar";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostEdit from "./components/PostEdit";
import NotFound from "./components/NotFound";

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Router>
        <NavBar/>
        <Container maxWidth="lg">
          <Routes>
            <Route exact path="/" element={<PostList/>} />
            <Route exact path="/posts/new" element={<PostForm/>} />
            <Route exact path="/posts/:id/edit" element={<PostEdit/>} />
            <Route element={<NotFound/>} />
          </Routes>
        </Container>
      </Router>
    </React.Fragment>
  );
}

export default App;
