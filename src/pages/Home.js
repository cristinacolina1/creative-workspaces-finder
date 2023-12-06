import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import useBookmarks from '../hooks/useBookmarks'; // Import the custom hook

const Home = () => {
  const [workspaces, setWorkspaces] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [selectedCity, setSelectedCity] = useState('New York');
  const [bookmarks, setBookmarks] = useState(() => {
    return JSON.parse(localStorage.getItem('bookmarks')) || [];
  });

  useEffect(() => {
    fetch('http://localhost:5000/workspaces')
      .then(response => response.json())
      .then(data => setWorkspaces(data))
      .catch(error => console.error('Error fetching data:', error));

    fetch('http://localhost:5000/reviews')
      .then(response => response.json())
      .then(data => setReviews(Array.isArray(data) ? data : []))
      .catch(error => console.error('Error fetching reviews:', error));
  }, []);

  const cities = ['New York', 'San Francisco', 'Los Angeles'];

  const renderCityTabs = () => {
    return (
      <div>
        {cities.map(city => (
          <button key={city} onClick={() => setSelectedCity(city)}>
            {city}
          </button>
        ))}
      </div>
    );
  };

  const toggleBookmark = (workspaceId) => {
    const updatedBookmarks = bookmarks.includes(workspaceId)
      ? bookmarks.filter(id => id !== workspaceId)
      : [...bookmarks, workspaceId];
      toast.success("Bookmark action was successful!");
    setBookmarks(updatedBookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
  };


  const renderWorkspaces = () => {
    return workspaces
      .filter(workspace => workspace.city === selectedCity)
      .map(workspace => {
        const workspaceReviews = reviews.filter(review => review.workspaceId === workspace.id);
        const isBookmarked = bookmarks.some(b => b.id === workspace.id);
        return (
          <div key={workspace.id}>
            <h2 className="workspace-title">{workspace.name}</h2>
            <p>{workspace.description}</p>
            <p className="workspace-address">{workspace.address}</p>
            <button onClick={() => toggleBookmark(workspace.id)}>
            {bookmarks.includes(workspace.id) ? 'Remove Bookmark' : 'Add to Bookmarks'}
          </button>
          
            <div className="review">
              {workspaceReviews.length > 0 ? (
                workspaceReviews.map(review => (
                  <p key={review.id}>{review.name}: {review.review}</p>
                ))
              ) : (
                <p>No reviews.</p>
              )}
            </div>
          </div>
        );
      });
  };

  return (
    <div>
      <h1 className='title'>Welcome to Creative Workspaces Finder!</h1>
      <p>
        Discover the perfect spot for your creative pursuits! Whether you're looking for a cozy cafe to write your next novel, a quiet workspace to complete your design projects, or just a relaxing corner to brainstorm your ideas, our Creative Workspaces Finder is here to help. 
      </p>
      <p>
        Browse through a variety of workspaces, read reviews from fellow creatives, and add your favorite spots to your bookmarks. Share your experiences and help others find their ideal creative environment. Start exploring now!
      </p>
      {renderCityTabs()}
      <hr></hr>
      <div>{renderWorkspaces()}</div>
      <hr></hr>
    </div>
  );
};

export default Home;