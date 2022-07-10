import React from 'react';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { FiEdit } from 'react-icons/fi';
import { AiFillDelete } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const Post = ({ deletePost, postData: { id, title, body } }) => {
  const navigate = useNavigate();
  return (
    <>
      <Card style={{ width: '60vw' }}>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{body}</Card.Text>
          <Button
            style={{ width: '100px' }}
            onClick={() => {
              navigate('/edit-post', { state: { id: id } });
            }}
          >
            <FiEdit />
          </Button>
          <Button
            variant="danger"
            style={{ width: '100px', marginLeft: '15px' }}
            onClick={() => deletePost(id)}
          >
            <AiFillDelete />
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default Post;
