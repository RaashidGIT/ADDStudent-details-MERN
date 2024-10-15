import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';

const StudentForm = () => {
  const [student, setStudent] = useState({
    name: '',
    age: '',
    gender: '',
    district: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(student),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        setStudent({ name: '', age: '', gender: '', district: '' }); // Reset form
      } else {
        setMessage('Error adding student.');
      }
    } catch (error) {
      setMessage('Error adding student.');
    }
  };

  return (
    <Container className="mt-5">
      <h2>Add Student Details</h2>
      {message && <Alert variant="info">{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={student.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="age">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            name="age"
            value={student.age}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Gender</Form.Label>
          <div>
            <Form.Check
              type="radio"
              label="Male"
              name="gender"
              value="Male"
              onChange={handleChange}
              required
              inline
            />
            <Form.Check
              type="radio"
              label="Female"
              name="gender"
              value="Female"
              onChange={handleChange}
              inline
            />
            <Form.Check
              type="radio"
              label="Other"
              name="gender"
              value="Other"
              onChange={handleChange}
              inline
            />
          </div>
        </Form.Group>
        <Form.Group className="mb-3" controlId="district">
          <Form.Label>District</Form.Label>
          <Form.Select
            name="district"
            value={student.district}
            onChange={handleChange}
            required
          >
            <option value="">Select District</option>
            <option value="District A">District A</option>
            <option value="District B">District B</option>
            <option value="District C">District C</option>
            <option value="District D">District D</option>
            <option value="District E">District E</option>
          </Form.Select>
        </Form.Group>
        <Button type="submit" variant="primary">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default StudentForm;