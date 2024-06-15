import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

const Users = () => {
  let [userData, setUserData] = useState([]);
  let navigate = useNavigate();

  let fetchData = () => {
    axios
      .get("http://localhost:3030/mysqlusers")
      .then((res) => {
        // console.log(res);
        setUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  let handleDelete = (ID) => {
    alert("Are you sure to delete this user?");
    axios
      .delete(`http://localhost:3030/deleteUser/${ID}`)
      .then((res) => {
        console.log(res.data);
        // setUserData(res.data);
        fetchData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Table striped bordered hover className="w-75 mx-auto mt-5">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Password</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {userData.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.Email}</td>
              <td>{user.Password}</td>
              <td>
                <Button
                  variant="warning"
                  onClick={() =>
                    navigate(`Edit/${user.id}`, {
                      state: {
                        ID: user.id,
                        Email: user.Email,
                        Password: user.Password,
                      },
                    })
                  }
                >
                  Edit
                </Button>
              </td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(user.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className=" d-flex justify-content-center align-items-center">
        <Link className="btn btn-primary ms-2" to="/">
          Back To Register
        </Link>
      </div>
    </div>
  );
};

export default Users;
