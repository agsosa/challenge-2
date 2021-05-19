/*

  TODO: ADD HEADER COMMENT

*/

// Original idea by ui.dev (https://usehooks.com/useAuth/)
import * as React from 'react';

const apiContext = React.createContext();

// Provider hook that creates the API object and handles API requests, cache, etc
function useProvideAuth() {
  const [posts, setPosts] = React.useState(null);

  const fetchPosts = async () => {};

  const deletePost = async (id) => {};

  const updatePost = async () => {};

  const createPost = async () => {};

  // Return all the methods/state to make it available to the components using this hook
  return {
    posts,
    fetchPosts,
    deletePost,
    updatePost,
    createPost,
  };
}

// Context provider component to make the API object available to any child component that calls useAuth()
export function APIProvider({ children }) {
  const API = useProvideAuth();
  return <apiContext.Provider value={API}>{children}</apiContext.Provider>;
}

// Hook for child components to get the API object from React context and re-render when it changes
export const useAuth = () => {
  return React.useContext(apiContext);
};
