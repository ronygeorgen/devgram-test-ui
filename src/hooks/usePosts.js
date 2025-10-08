import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { addPost, toggleLike, addComment, sharePost, clearError } from '../store/slices/postsSlice';

export const usePosts = () => {
  const dispatch = useDispatch();
  const postsState = useSelector((state) => state.posts);

  const handleAddPost = useCallback((postData) => {
    dispatch(addPost(postData));
  }, [dispatch]);

  const handleToggleLike = useCallback((postId) => {
    dispatch(toggleLike(postId));
  }, [dispatch]);

  const handleAddComment = useCallback((postId, content) => {
    dispatch(addComment({ postId, content }));
  }, [dispatch]);

  const handleSharePost = useCallback((postId) => {
    dispatch(sharePost(postId));
  }, [dispatch]);

  const handleClearError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  const getCommentsByPostId = useCallback((postId) => {
    return postsState.comments.filter(comment => comment.postId === postId);
  }, [postsState.comments]);

  return {
    // State
    posts: postsState.posts,
    comments: postsState.comments,
    loading: postsState.loading,
    error: postsState.error,
    
    // Actions
    addPost: handleAddPost,
    toggleLike: handleToggleLike,
    addComment: handleAddComment,
    sharePost: handleSharePost,
    clearError: handleClearError,
    getCommentsByPostId,
  };
};