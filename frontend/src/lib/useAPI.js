/*

  TODO: ADD HEADER COMMENT

*/

// Original idea by ui.dev (https://usehooks.com/useAuth/)
import * as React from 'react';
import { API_BASE_URL } from '@lib/config';
import axios from 'axios';

const apiContext = React.createContext();

// Provider hook that creates the API object and handles API requests, cache, etc
function useProvideAuth() {
  const [loading, setLoading] = React.useState(false);
  const originalPostsArray = React.useRef(null);
  const [posts, setPosts] = React.useState([]);
  const errorListeners = React.useRef([]);

  // TODO: Add retry mechanism?
  // TODO: Add cache mechanism?

  const fetchPosts = async () => {
    setLoading(true);

    try {
      const result = await axios.get(`${API_BASE_URL}/posts`);

      if (result.data && Array.isArray(result.data)) {
        setPosts(result.data);
        return result.data;
      } else throw new Error('INVALID_POST_LIST');
    } catch (error) {
      onError(error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id) => {};

  const updatePost = async () => {};

  const createPost = async () => {};

  const filterPostsByTitle = (title) => {
    if (!title && originalPostsArray.current) {
      setPosts(originalPostsArray.current);
    } else
      setPosts((old) => {
        originalPostsArray.current = old;
        return old.filter((q) => q.title.toLowerCase().includes(title.toLowerCase()));
      });
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
      const index = array.indexOf(listener);
      if (index > -1) {
        array.splice(index, 1);
      }
    } else console.error('useAPI received an invalid error listener. Error listeners should be a function!');
  };

  // Return all the methods/state to make it available to the components using this hook
  return {
    posts,
    filterPostsByTitle,
    fetchPosts,
    deletePost,
    updatePost,
    createPost,
    subscribeToErrorEvents,
    unsubscribeFromErrorEvents,
    loading,
  };
}

// Context provider component to make the API object available to any child component that calls useAPI()
export function APIProvider({ children }) {
  const API = useProvideAuth();
  return <apiContext.Provider value={API}>{children}</apiContext.Provider>;
}

// Hook for child components to get the API object from React context and re-render when it changes
export const useAPI = () => {
  return React.useContext(apiContext);
};
