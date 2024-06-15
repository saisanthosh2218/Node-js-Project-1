import React, { useState } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function App() {
  let navigate = useNavigate();
  let [formData, getFormData] = useState({
    Email: "",
    Password: "",
  });
  let [hello, sethello] = useState("");

  function submit(e) {
    e.preventDefault();

    if (!formData.Email) {
      sethello("Please Enter Email");
      return;
    } else if (!formData.Password) {
      sethello("Please Enter Password");
      return;
    } else {
      sethello("Logging in........");
    }

    axios
      .post("http://localhost:3030/sqlstore", formData)
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          navigate("/users");
        }
      })
      .catch((err) => {
        console.log(err);
      });

    getFormData({
      Email: "",
      Password: "",
    });
  }

  return (
    <div className="form-container text-center mt-5">
      <h2>Registration form</h2>

      <Form
        className="w-25 text-center mx-auto bg-secondary p-4 rounded"
        onSubmit={submit}
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={formData.Email}
            placeholder="Enter email"
            onChange={(e) =>
              getFormData({ ...formData, Email: e.target.value })
            }
          />
          <Form.Text className="text-muted mb-2 ">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={formData.Password}
            placeholder="Password"
            onChange={(e) =>
              getFormData({ ...formData, Password: e.target.value })
            }
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <small style={{ color: "red", fontWeight: "bold" }}>{hello}</small>
    </div>
  );
}

export default App;
