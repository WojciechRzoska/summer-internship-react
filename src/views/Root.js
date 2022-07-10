import UsersList from 'components/UsersList/UsersList';
import React from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserForm from 'components/UserForms/UserForm';
import EditUserForm from 'components/UserForms/EditUserForm';
import Navigation from 'components/Navbar/Navigation';
import './style.css';
import UserPosts from 'components/UserPosts/UserPosts';
import AddPost from 'components/PostForms/AddPost';
import EditPost from 'components/PostForms/EditPost';

const Root = () => (
  <Router>
    <Navigation />
    <Container className="wrapper">
      <Routes>
        <Route path="/edit-post" element={<EditPost />} />
        <Route path="/add-post" element={<AddPost />} />
        <Route path="/user-posts" element={<UserPosts />} />
        <Route path="/add-user" element={<UserForm />} />
        <Route exact path="/edit-user" element={<EditUserForm />} />
        <Route path="/" element={<UsersList />} />
      </Routes>
    </Container>
  </Router>
);

export default Root;
