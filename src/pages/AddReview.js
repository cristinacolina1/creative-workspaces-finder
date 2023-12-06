import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const AddReview = () => {
  const [workspaces, setWorkspaces] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({ workspaceId: '', name: '', rating: '', review: '' });
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetch('http://localhost:5000/workspaces')
      .then(response => response.json())
      .then(data => setWorkspaces(data))
      .catch(error => console.error('Error fetching workspaces:', error));

    fetch('http://localhost:5000/reviews')
      .then(response => response.json())
      .then(data => setReviews(data))
      .catch(error => console.error('Error fetching reviews:', error));
  }, []);

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.workspaceId) tempErrors.workspaceId = 'Workspace selection is required';
    if (!formData.name) tempErrors.name = 'Name is required';
    if (!formData.rating) tempErrors.rating = 'Rating is required';
    if (!formData.review) tempErrors.review = 'Review is required';
    return tempErrors;
  };

  
  const handleSubmit = (event) => {
    event.preventDefault();
    const tempErrors = validateForm();
    if (Object.keys(tempErrors).length === 0) {
      const method = editingReviewId ? 'PUT' : 'POST';
      const url = `http://localhost:5000/reviews/${editingReviewId ? editingReviewId : ''}`;

      fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workspaceId: parseInt(formData.workspaceId),
          name: formData.name,
          rating: parseInt(formData.rating),
          review: formData.review
        })
      })
      .then(response => response.json())
      .then(data => {
        if (editingReviewId) {
          setReviews(reviews.map(review => review.id === editingReviewId ? data : review));
        } else {
          setReviews([...reviews, data]);
        }
        resetForm();
      })
      .catch(error => console.error('Error posting review:', error));
    } else {
      setErrors(tempErrors);
    }
    toast.success("Action was successful!");
  };

  const handleEdit = (review) => {
    setFormData({ 
      workspaceId: review.workspaceId.toString(), 
      name: review.name, 
      rating: review.rating.toString(), 
      review: review.review 
    });
    setEditingReviewId(review.id);
  };

  const handleDelete = (reviewId) => {
    fetch(`http://localhost:5000/reviews/${reviewId}`, { method: 'DELETE' })
      .then(() => setReviews(reviews.filter(review => review.id !== reviewId)))
      .catch(error => console.error('Error deleting review:', error));
  };

  const resetForm = () => {
    setFormData({ workspaceId: '', name: '', rating: '', review: '' });
    setEditingReviewId(null);
  };

  return (
    <div>
      <h2>{editingReviewId ? 'Edit Review' : 'Add Review'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Workspace:</label>
          <select
            value={formData.workspaceId}
            onChange={(e) => setFormData({ ...formData, workspaceId: e.target.value })}
          >
            <option value="">Select a Workspace</option>
            {workspaces.map(workspace => (
              <option key={workspace.id} value={workspace.id}>{workspace.name}</option>
            ))}
          </select>
          {errors.workspaceId && <div>{errors.workspaceId}</div>}
        </div>

        <div>
          <label>Name:</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          {errors.name && <div>{errors.name}</div>}
        </div>

        <div>
          <label>Rating:</label>
          <input
            type="number"
            min="1"
            max="5"
            value={formData.rating}
            onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
          />
          {errors.rating && <div>{errors.rating}</div>}
        </div>

        <div>
          <label>Review:</label>
          <textarea
            value={formData.review}
            onChange={(e) => setFormData({ ...formData, review: e.target.value })}
          />
          {errors.review && <div>{errors.review}</div>}
        </div>

        <button type="submit">{editingReviewId ? 'Update Review' : 'Submit Review'}</button>
        {editingReviewId && <button type="button" onClick={resetForm}>Cancel Edit</button>}
      </form>

      <h2>All Reviews</h2>
      <div>
        <table>
          <thead>
            <tr>
              <th>Workspace</th>
              <th>Name</th>
              <th>Rating</th>
              <th>Review</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map(review => (
              <tr key={review.id}>
                <td>{workspaces.find(ws => ws.id === review.workspaceId)?.name || 'Unknown'}</td>
                <td>{review.name}</td>
                <td>{review.rating}</td>
                <td>{review.review}</td>
                <td>
                  <button onClick={() => handleEdit(review)}>Edit</button>
                  <button onClick={() => handleDelete(review.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddReview;
      