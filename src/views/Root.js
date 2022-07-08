import UsersList from 'components/UsersList/UsersList';
import React from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserForm from 'components/Form/UserForm';
import EditUserForm from 'components/Form/EditUserForm';
import Navigation from 'components/Navbar/Navigation';
import './style.css';

const Root = () => (
  <Router>
    <Navigation />
    <Container className="wrapper">
      <Routes>
        <Route path="/add-user" element={<UserForm />} />
        <Route exact path="/edit-user" element={<EditUserForm />} />
        <Route path="/" element={<UsersList />} />
      </Routes>
    </Container>
  </Router>
);

export default Root;
