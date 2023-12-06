import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

const AdminPage = () => {
  const [workspaces, setWorkspaces] = useState([]);
  const [selectedWorkspaces, setSelectedWorkspaces] = useState(new Set());
  const selectAllRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:5000/workspaces')
      .then(response => response.json())
      .then(data => setWorkspaces(Array.isArray(data) ? data : [])) // Ensure data is an array
      .catch(error => console.error('Error fetching workspaces:', error));
  }, []);

  const handleSelectAll = (e) => {
    const newSelected = e.target.checked ? new Set(workspaces.map(ws => ws.id)) : new Set();
    setSelectedWorkspaces(newSelected);
  };

  const handleSelectWorkspace = (id, isChecked) => {
    const newSelected = new Set(selectedWorkspaces);
    isChecked ? newSelected.add(id) : newSelected.delete(id);
    setSelectedWorkspaces(newSelected);
  };

  const handleBulkDelete = () => {
    Promise.all([...selectedWorkspaces].map(id =>
      fetch(`http://localhost:5000/workspaces/${id}`, { method: 'DELETE' })
    ))
    .then(() => {
      setWorkspaces(workspaces.filter(ws => !selectedWorkspaces.has(ws.id)));
      setSelectedWorkspaces(new Set());
      toast.success("Selected workspaces deleted successfully!");
    })
    .catch(error => {
      console.error('Error deleting workspaces:', error);
      toast.error("Error deleting workspaces.");
    });
  };

  // Update the indeterminate state of the select all checkbox
  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate = selectedWorkspaces.size > 0 && selectedWorkspaces.size < workspaces.length;
    }
  }, [selectedWorkspaces, workspaces]);

  return (
    <div>
      <h1>Admin Workspace Management</h1>
      <table className="table">
        <thead>
          <tr>
            <th>
              <input
                ref={selectAllRef}
                type="checkbox"
                onChange={handleSelectAll}
                checked={selectedWorkspaces.size === workspaces.length}
              />
            </th>
            <th>Name</th>
            <th>Description</th>
            {/* Other headers if needed */}
          </tr>
        </thead>
        <tbody>
          {workspaces.map(workspace => (
            <tr key={workspace.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedWorkspaces.has(workspace.id)}
                  onChange={(e) => handleSelectWorkspace(workspace.id, e.target.checked)}
                />
              </td>
              <td>{workspace.name}</td>
              <td>{workspace.description}</td>
              {/* Other data cells if needed */}
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="btn btn-danger"
        onClick={handleBulkDelete}
        disabled={selectedWorkspaces.size === 0}
      >
        Delete Selected
      </button>
    </div>
  );
};

export default AdminPage;
