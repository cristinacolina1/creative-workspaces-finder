import { useState, useEffect } from 'react';

const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    setBookmarks(storedBookmarks);
  }, []);

  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = (workspace) => {
    if (!bookmarks.some(b => b.id === workspace.id)) {
      setBookmarks([...bookmarks, workspace]);
    }
  };

  const removeBookmark = (workspaceId) => {
    setBookmarks(bookmarks.filter(b => b.id !== workspaceId));
  };

  return { bookmarks, addBookmark, removeBookmark };
};

export default useBookmarks;
