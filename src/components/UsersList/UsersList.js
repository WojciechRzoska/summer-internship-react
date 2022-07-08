import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UsersListItem from 'components/UsersListItem/UsersListItem';
import { Table } from 'react-bootstrap';

const requestConfig = {
  headers: {
    Authorization: `Bearer 61d3471458ff3bb51d99625b4657a015c1a6f4a98a2f581f622adbf6bf39c559`,
  },
};

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const fetchAPI = () => {
    axios
      .get('https://gorest.co.in/public/v2/users', requestConfig)
      .then((res) => {
        setUsers(res.data);
      });
  };
  useEffect(() => {
    fetchAPI();
  }, []);

  const deleteUser = (id) => {
    axios
      .delete(`https://gorest.co.in/public/v2/users/${id}`, requestConfig)
      .then(() => {
        console.log('udało się usunąć');
        fetchAPI();
      })
      .catch((err) => console.log(err));
  };

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
};

export default UsersList;
