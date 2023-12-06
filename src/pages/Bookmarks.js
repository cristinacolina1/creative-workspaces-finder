import React, { useState, useEffect } from 'react';

const Bookmarks = () => {
  const [workspaces, setWorkspaces] = useState([]);
  const [bookmarkedIds, setBookmarkedIds] = useState(() => {
    return JSON.parse(localStorage.getItem('bookmarks')) || [];
  });

  useEffect(() => {
    fetch('http://localhost:5000/workspaces')
      .then(response => response.json())
      .then(data => {
        console.log('All Workspaces:', data); // Debugging
        setWorkspaces(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    console.log('Bookmarked IDs:', bookmarkedIds); // Debugging
  }, [bookmarkedIds]);

  const renderBookmarkedWorkspaces = () => {
    return workspaces
      .filter(workspace => bookmarkedIds.includes(workspace.id))
      .map(workspace => (
        <div key={workspace.id}>
          <h3>{workspace.name}</h3>
          <p>{workspace.description}</p>
          <p>{workspace.address}</p>
        </div>
      ));
  };


  return (
    <div>
      <h1>Your Bookmarked Workspaces</h1>
      <div>{renderBookmarkedWorkspaces()}</div>
    </div>
  );
};

export default Bookmarks;
