import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useLocation, useNavigate } from 'react-router-dom';

//Todo refacotr formularzy
const requestConfig = {
  headers: {
    Authorization: `Bearer 61d3471458ff3bb51d99625b4657a015c1a6f4a98a2f581f622adbf6bf39c559`,
  },
};

const EditUserForm = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    gender: '',
    status: '',
  });
  const { state } = useLocation();
  const { id } = state;
  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState([]);

  useEffect(() => {
    axios
      .get(`https://gorest.co.in/public/v2/users/${id}`, requestConfig)
      .then((res) => {
        setFormValues(res.data);
      })
      .catch((e) => {
        console.log(e);
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
      .put(`https://gorest.co.in/public/v2/users/${id}`, fData, requestConfig)
      .then((res) => {
        console.log(res);
        navigate('/');
      })
      .catch((e) => {
        getErrors(e.response.data);
      });
  };
  return (
    <>
      <h2>Edit user</h2>
      <Form className="form">
        <Form.Group className="mb-4">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter name"
            value={formValues.name}
            onChange={handleInputChange}
            isInvalid={formErrors.name}
            isValid={!formErrors.name && formValues.name !== ''}
          />
          <Form.Text>{formErrors.name}</Form.Text>
        </Form.Group>
        <Form.Group className="mb-4" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder="Enter email"
            value={formValues.email}
            onChange={handleInputChange}
            isInvalid={formErrors.email}
            isValid={!formErrors.email && formValues.email !== ''}
          />
          <Form.Text>{formErrors.email}</Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label>Gender:</Form.Label>
          <Form.Check
            name="gender"
            value="female"
            type="radio"
            aria-label="radio 1"
            label="Female"
            onChange={handleInputChange}
            checked={formValues.gender === 'female'}
          />
          <Form.Check
            name="gender"
            value="male"
            type="radio"
            aria-label="radio 2"
            label="Male"
            onChange={handleInputChange}
            checked={formValues.gender === 'male'}
          />
          <Form.Text>{formErrors.gender}</Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Label>Account status:</Form.Label>
          <Form.Check
            name="status"
            value="active"
            type="radio"
            aria-label="radio 1"
            label="Active"
            checked={formValues.status === 'active'}
            onChange={handleInputChange}
          />
          <Form.Check
            name="status"
            value="inactive"
            type="radio"
            aria-label="radio 2"
            label="Inactive"
            onChange={handleInputChange}
            checked={formValues.status === 'inactive'}
          />
          <Form.Text>{formErrors.status}</Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit" onClick={submitData}>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default EditUserForm;
