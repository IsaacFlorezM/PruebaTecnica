import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export const getPosts = async (page, limit) => {
  const response = await axios.get(`${BASE_URL}/posts`, {
    params: {
      _page: page,
      _limit: limit,
    },
  });
  return response.data;
};

export const getPostById = async (id) => {
  const response = await axios.get(`${BASE_URL}/posts/${id}`);
  return response.data;
};

export const createPost = async (data) => {
  const response = await axios.post(`${BASE_URL}/posts`, data);
  return response.data;
};

export const updatePost = async (id, data) => {
  const response = await axios.put(`${BASE_URL}/posts/${id}`, data);
  return response.data;
};

export const deletePost = async (id) => {
  const response = await axios.delete(`${BASE_URL}/posts/${id}`);
  return response.data;
};
