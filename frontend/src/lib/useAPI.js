/*
  Hook+Context provider to manage our API

  This hook will return an object containing methods and some state:

    const api = useAPI(); then api.posts, api.fetchPosts(), etc
    or const { posts, fetchPosts, ...etc } = useAPI();

  Available state:
    posts: array of objects, the posts list
    loading: boolean, indicating if there is a pending request or not

  Available methods:
    async fetchPosts()->void: method to fetch the posts and save them on the posts state
    async getPostDetails(id: number)->object: method to fetch a post's details by id
    async deletePost(id: number)->boolean: method to delete a post by id, returns true if success and false if failed
    
    TODO: Terminar comment

*/

// Original idea by ui.dev (https://usehooks.com/useAuth/)
import * as React from 'react';
import { API_BASE_URL } from '@lib/Config';
import axios from 'axios';

const apiContext = React.createContext();

// Provider hook that creates the API object and handles API requests, cache, etc
function useProvideAPI() {
  const [loading, setLoading] = React.useState(false); // True when a request is pending
  const [posts, setPosts] = React.useState([]); // Array of objects containing the posts. Call fetchPosts() to refresh. Can contain filters.
  const [originalPosts, setOriginalPosts] = React.useState(null); // Used to save the original array when filtering
  const errorListeners = React.useRef([]); // Used in our error observer pattern

  // TODO: Add retry mechanism?
  // TODO: Add cache mechanism?

  // Get the posts list and store them on the posts state
  const fetchPosts = async () => {
    setLoading(true);

    try {
      const result = await axios.get(`${API_BASE_URL}/posts`);

      if (result.data && Array.isArray(result.data)) {
        setPosts(result.data);
        setOriginalPosts(result.data);
      } else throw new Error('INVALID_POST_LIST');
    } catch (error) {
      onError(error);
    } finally {
      setLoading(false);
    }
  };

  // Get post details by id
  // Returns an object containing the post details
  const getPostDetails = async (id) => {
    setLoading(true);

    try {
      const result = await axios.get(`${API_BASE_URL}/posts/${id}`);

      if (result.data && typeof result.data === 'object') {
        return result.data;
      } else throw new Error('INVALID_POST_DETAILS');
    } catch (error) {
      onError(error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Delete a post by id
  // Returns true if the post was successfully deleted, otherwise false
  const deletePost = async (id) => {
    setLoading(true);

    try {
      const result = await axios.delete(`${API_BASE_URL}/posts/${id}`);

      if (result.status === 200) {
        // Remove post from the original posts array (used by the filter functions)
        if (originalPosts)
          setOriginalPosts((old) => {
            return old.filter((q) => q.id !== id);
          });

        // Remove post from the current posts state
        if (posts)
          setPosts((old) => {
            return old.filter((q) => q.id !== id);
          });

        return true;
      } else return false;
    } catch (error) {
      onError(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Update a post by id
  // Returns true if the post was successfully updated, otherwise false
  const updatePost = async () => {};

  // Create a post
  // Returns a post details object if the post was successfully created, otherwise false
  const createPost = async (title, content) => {
    setLoading(true);

    try {
      const result = await axios.post(`${API_BASE_URL}/posts`, { title, body: content });
      console.log(result);
      if (result.status === 201 && result.data && result.data.id) return result.data;
      else return false;
    } catch (error) {
      onError(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Filter the posts list state by title (case insensitive)
  const filterPostsByTitle = (title) => {
    if (originalPosts) {
      if (!title) {
        setPosts(originalPosts);
      } else setPosts(originalPosts.filter((q) => q.title.toLowerCase().includes(title.toLowerCase())));
    }
  };

  // Start error events (observer pattern)

  // onError event
  // Using var to be able to define this function after all the other methods
  var onError = (error) => {
    errorListeners.current.forEach((listener) => {
      if (listener && typeof listener === 'function') {
        listener(typeof error === 'object' && error.message ? error.message : error);
      }
    });
  };

  // Subscribe a callback to the error events
  // listener: function(error: string)
  const subscribeToErrorEvents = (listener) => {
    if (listener && typeof listener === 'function') {
      errorListeners.current.push(listener);
    } else console.error('useAPI received an invalid error listener. Error listeners should be a function!');
  };

  // Unsubscribe a callback from the error events
  const unsubscribeFromErrorEvents = (listener) => {
    if (listener && typeof listener === 'function') {
      const index = errorListeners.current.indexOf(listener);
      if (index > -1) {
        errorListeners.current.splice(index, 1);
      }
    } else console.error('useAPI received an invalid error listener. Error listeners should be a function!');
  };

  // Return all the methods/state to make it available to the components using this hook
  return {
    posts, // Can contain filters
    originalPosts, // The original posts array without filters
    filterPostsByTitle,
    fetchPosts,
    deletePost,
    updatePost,
    getPostDetails,
    createPost,
    subscribeToErrorEvents,
    unsubscribeFromErrorEvents,
    loading,
  };
}

// Context provider component to make the API object available to any child component that calls useAPI()
export function APIProvider({ children }) {
  const API = useProvideAPI();
  return <apiContext.Provider value={API}>{children}</apiContext.Provider>;
}

// Hook for child components to get the API object from React context and re-render when it changes
export const useAPI = () => {
  return React.useContext(apiContext);
};
