import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import WorkspaceDetail from './pages/WorkspaceDetail';
import AddReview from './pages/AddReview';
import Bookmarks from './pages/Bookmarks';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Admin from './pages/admin';



const App = () => {
  return (
    <>
    <ToastContainer />
    <Router>
       <Navbar />
      <div className="container mt-4"></div>
      <div>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/workspaces/:id" element={<WorkspaceDetail/>} />
          <Route path="/add-review" element={<AddReview/>} />
          <Route path="/bookmarks" element={<Bookmarks/>} />
          <Route path="/admin" element={<Admin/>} />
        </Routes>
      </div>
    </Router>
    </>
  );
};

export default App;
