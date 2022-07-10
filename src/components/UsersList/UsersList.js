import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UsersListItem from 'components/UsersListItem/UsersListItem';
import { Button, Table } from 'react-bootstrap';
import Toast from 'react-bootstrap/Toast';
import { useNavigate } from 'react-router-dom';
import { requestConfig, API } from 'ApiHelper/ApiHelper';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const fetchAPI = () => {
    axios
      .get(`${API}/users`, requestConfig)
      .then((res) => {
        setLoading(false);
        setUsers(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    fetchAPI();
  }, []);

  const deleteUser = (id) => {
    axios
      .delete(`${API}/users/${id}`, requestConfig)
      .then(() => {
        console.log('udało się usunąć');
        fetchAPI();
      })
      .catch((err) => console.log(err));
    setShow(true);
  };

  const renderUsers = () => {
    if (loading) {
      return <h1>Loading...</h1>;
    } else if (users.length === 0) {
      return <h1>No users</h1>;
    } else {
      return (
        <>
          <h1>List of users</h1>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>id</th>
                <th>name</th>
                <th>email</th>
                <th>gender</th>
                <th>status</th>
                <th>action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((userData) => (
                <UsersListItem
                  key={userData.id}
                  userData={userData}
                  deleteUser={deleteUser}
                />
              ))}
            </tbody>
          </Table>
        </>
      );
    }
  };
  return (
    <>
      {renderUsers()}
      <Button
        onClick={() => {
          navigate('/add-user');
        }}
      >
        Add user
      </Button>
      <Toast
        onClose={() => setShow(false)}
        show={show}
        delay={3000}
        autohide
        bg="success"
      >
        <Toast.Body>User deleted</Toast.Body>
      </Toast>
    </>
  );
};

export default UsersList;
