import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import { AiFillDelete } from 'react-icons/ai';

const UsersListItem = ({
  deleteUser,
  userData: { id, name, email, gender, status },
}) => {
  const navigate = useNavigate();
  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{email}</td>
      <td>{gender}</td>
      <td>{status}</td>
      <td>
        <Button
          onClick={() => {
            navigate('/edit-user', { state: { id: id } });
          }}
        >
          <FiEdit />
        </Button>
        <Button variant="danger" onClick={() => deleteUser(id)}>
          <AiFillDelete />
        </Button>
      </td>
    </tr>
  );
};

export default UsersListItem;
