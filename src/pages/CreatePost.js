import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { createPost } from '../api';
import PostForm from '../components/PostForm';

function CreatePost() {
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  const handleCreatePost = async (postData) => {
    try {
      setIsLoading(true);
      await createPost(postData);
      setIsLoading(false);
      enqueueSnackbar('Post created successfully', { variant: 'success' });
      history.push('/');
    } catch (error) {
      setIsLoading(false);
      enqueueSnackbar('Failed to create post', { variant: 'error' });
    }
  };

  return (
    <div>
      <h1>Create Post</h1>
      <PostForm onSubmit={handleCreatePost} isLoading={isLoading} />
    </div>
  );
}

export default CreatePost;
