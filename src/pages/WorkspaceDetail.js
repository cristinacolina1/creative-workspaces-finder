import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useBookmarks from '../hooks/useBookmarks';
import { toast } from 'react-toastify';

const WorkspaceDetail = () => {
  const [workspace, setWorkspace] = useState(null);
  const [reviews, setReviews] = useState([]);
  const { id } = useParams();
  const { addBookmark, removeBookmark, bookmarks } = useBookmarks();

  useEffect(() => {
    fetch(`http://localhost:5000/workspaces/${id}`)
      .then(response => response.json())
      .then(data => setWorkspace(data))
      .catch(error => console.error('Error fetching workspace:', error));

    fetch(`http://localhost:5000/reviews?workspaceId=${id}`)
      .then(response => response.json())
      .then(data => setReviews(data))
      .catch(error => console.error('Error fetching reviews:', error));
  }, [id]);

  const isBookmarked = bookmarks.some(b => b.id === parseInt(id));
  const handleBookmarkClick = () => {
    if (isBookmarked) {
      removeBookmark(parseInt(id));
    } else {
      addBookmark({...workspace, id: parseInt(id)});
    }
    toast.success("Action was successful!");
  };



  return (
    <div>
      <h2 className="workspace-title">{workspace ? workspace.name : 'Loading...'}</h2>
      {workspace && <button onClick={handleBookmarkClick}>
        {isBookmarked ? 'Remove Bookmark' : 'Add Bookmark'}
      </button>}
      <p>{workspace && workspace.description}</p>
      <h2>Reviews</h2>np
      {reviews.length > 0 ? reviews.map(review => (
        <div key={review.id}>
          <p>{review.name}: {review.review}</p>
          <p>Rating: {review.rating}</p>
        </div>
      )) : <p>No reviews.</p>}
    </div>
  );
};

export default WorkspaceDetail;

