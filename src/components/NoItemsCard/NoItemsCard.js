import React from 'react';

import Card from 'react-bootstrap/Card';

const NoItemsCard = ({ text }) => {
  return (
    <>
      <Card style={{ width: '15vw' }}>
        <Card.Body>
          <Card.Title>This user has no {text} </Card.Title>
          <Card.Body>Add first {text}</Card.Body>
        </Card.Body>
      </Card>
    </>
  );
};

export default NoItemsCard;
