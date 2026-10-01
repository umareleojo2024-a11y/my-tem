import { useState, useEffect, useCallback } from 'react';
import { getFeedPosts, createPost as apiCreatePost, likePost, unlikePost } from '../services/posts';

export const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error: err } = await getFeedPosts();
      if (err) throw err;
      setPosts(data || []);
    } catch (err) {
      setError(err.message || 'Failed to load posts');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const addPost = async ({ content, media = [], location = 'Nigeria' }) => {
    try {
      const { data, error: err } = await apiCreatePost({ content, media, location });
      if (err) throw err;
      if (data) {
        setPosts((prev) => [data, ...prev]);
      }
      return data;
    } catch (err) {
      setError(err.message || 'Failed to create post');
      throw err;
    }
  };

  const toggleLike = async (postId, currentlyLiked) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const delta = currentlyLiked ? -1 : 1;
          return {
            ...p,
            likes_count: Math.max(0, (p.likes_count || 0) + delta),
            is_liked: !currentlyLiked
          };
        }
        return p;
      })
    );

    try {
      if (currentlyLiked) {
        await unlikePost(postId);
      } else {
        await likePost(postId);
      }
    } catch (err) {
      console.error('Like toggle error', err);
    }
  };

  return {
    posts,
    loading,
    error,
    addPost,
    toggleLike,
    refreshPosts: fetchPosts
  };
};

export default usePosts;
