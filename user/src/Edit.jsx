import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Edit = () => {
  let locate = useLocation();
  let navigate = useNavigate();
  let { id } = useParams();

  let [data, formData] = useState({
    Email: locate?.state?.Email,
    Password: locate?.state?.Password,
    ID: locate?.state?.ID,
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3030/users/${id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((er) => {
        console.log(er);
      });
  }, [id]);

  let handlesubmit = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:3030/edit/${data.ID}`, data)
      .then((res) => navigate("/users"))
      .catch((er) => console.log(er));
  };

  // let { id } = useParams();
  return (
    <div>
      <Form
        onSubmit={handlesubmit}
        className="w-25 text-center mt-5 mx-auto bg-secondary p-4 rounded"
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Change Name</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={data.Email}
            onChange={(e) => formData({ ...data, Email: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Change Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={data.Password}
            onChange={(e) => formData({ ...data, Password: e.target.value })}
          />
        </Form.Group>

        <Button variant="success" type="submit">
          Submit
        </Button>
      </Form>{" "}
    </div>
  );
};

export default Edit;
