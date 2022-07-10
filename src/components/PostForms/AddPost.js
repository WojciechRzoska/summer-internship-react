import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useLocation } from 'react-router-dom';
import { requestConfig, API } from 'ApiHelper/ApiHelper';

const AddPost = () => {
  const [formValues, setFormValues] = useState({
    title: '',
    body: '',
  });
  const [formErrors, setFormErrors] = useState([]);
  const { state } = useLocation();
  const { id } = state;
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };
  const getErrors = (e) => {
    setFormErrors(
      e.reduce((acc, cur) => ({ ...acc, [cur.field]: cur.message }), {})
    );
  };

  const submitData = (e) => {
    e.preventDefault();
    const fData = new FormData();

    Object.keys(formValues).map((key) => {
      return fData.append(`${key}`, `${formValues[key]}`);
    });

    axios
      .post(`${API}/users/${id}/posts`, fData, requestConfig)
      .then((res) => {
        console.log(res);
        navigate(-1);
      })
      .catch((e) => {
        getErrors(e.response.data);
      });
  };
  return (
    <>
      <h2>Add post</h2>
      <Form className="form">
        <Form.Group className="mb-4">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            placeholder="Enter name"
            value={formValues.title}
            onChange={handleInputChange}
            isInvalid={formErrors.title}
            isValid={!formErrors.title && formValues.title !== ''}
          />
          <Form.Text>{formErrors.title}</Form.Text>
        </Form.Group>
        <Form.Group className="mb-4" controlId="formBasicEmail">
          <Form.Label>Text</Form.Label>
          <Form.Control
            name="body"
            type="text"
            placeholder="Enter email"
            value={formValues.body}
            onChange={handleInputChange}
            isInvalid={formErrors.body}
            isValid={!formErrors.body && formValues.body !== ''}
          />
          <Form.Text>{formErrors.body}</Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit" onClick={submitData}>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default AddPost;
