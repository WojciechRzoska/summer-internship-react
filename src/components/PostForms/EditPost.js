import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useLocation, useNavigate } from 'react-router-dom';
import { requestConfig, API } from 'ApiHelper/ApiHelper';

const EditPost = () => {
  const [formValues, setFormValues] = useState({
    title: '',
    body: '',
  });
  const [formErrors, setFormErrors] = useState([]);
  const { state } = useLocation();
  const { id } = state;
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API}/posts/${id}`, requestConfig).then((res) => {
      setFormValues(res.data);
    });
  }, [id]);

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
      .put(`${API}/posts/${id}`, fData, requestConfig)
      .then((res) => {
        navigate(-1);
      })
      .catch((e) => {
        getErrors(e.response.data);
      });
  };
  return (
    <>
      <h2>Edit post</h2>
      <Form className="form">
        <Form.Group className="mb-1">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            placeholder="Enter a title"
            value={formValues.title}
            onChange={handleInputChange}
            isInvalid={formErrors.title}
            isValid={!formErrors.title && formValues.title !== ''}
          />
          <Form.Text>{formErrors.title}</Form.Text>
        </Form.Group>
        <Form.Group className="mb-2" controlId="formBasicEmail">
          <Form.Label>Text</Form.Label>
          <Form.Control
            name="body"
            type="text"
            placeholder="Enter text of post"
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

export default EditPost;
