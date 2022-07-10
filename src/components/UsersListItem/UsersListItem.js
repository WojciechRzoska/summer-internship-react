import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import { AiFillDelete } from 'react-icons/ai';
import { GrArticle } from 'react-icons/gr';

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
      <td className="action">
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
        <Button
          variant="success"
          onClick={() => {
            navigate('/user-posts', { state: { id: id, name: name } });
          }}
        >
          <GrArticle />
        </Button>
      </td>
    </tr>
  );
};

export default UsersListItem;
