import { Button, Card } from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { auth, CreateUserName } from "../config/FirebaseConfig";
import { AuthContext, AuthProvider } from "../context/AuthContext";
export default function SignUp() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const { setCp, cp } = useContext(AuthContext);

  const signUp = async ({ email, password }) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password).then(() => {
        setCp(1);
      });
    } catch (error) {
      setErr(error);
      setCp(0);
    }
  };

  const nextpage = (e) => {
    e.preventDefault();
    signUp({ email, password });
  };

  const SubmitAll = (e) => {
    e.preventDefault();
    CreateUserName({ username });
  };

  if (cp === 0) {
    return (
      <div
        style={{ flexDirection: "column" }}
        className="bg-dark d-flex justify-content-center align-items-center allHeight "
      >
        <h1 className="text-light"> Welcome</h1>
        <Card>
          <Form onSubmit={nextpage} className="m-5 ">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
                name="email"
                placeholder="Enter email"
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                type="password"
                name="password"
                placeholder="Password"
              />
            </Form.Group>

            <Button type="submit">next</Button>
            <Link to="/sign-in">I have an account</Link>
            <br />
            {err.toString() !== "" ? <p className="text-danger">{err.toString()} </p> : ""}
          </Form>
        </Card>
      </div>
    );
  }

  if (cp === 1) {
    return (
      <div className="bg-dark d-flex justify-content-center align-items-center allHeight ">
        <Card>
          <Form onSubmit={SubmitAll} className="m-5 ">
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                required
                type="hidden"
                name="username"
                placeholder="username"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                required
                type="hidden"
                name="username"
                placeholder="username"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                onChange={(e) => setUserName(e.target.value)}
                required
                type="text"
                name="username"
                placeholder="username"
              />
            </Form.Group>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Button type="submit">Submit</Button>
              <button onClick={() => setCp(0)}>Turn back</button>
            </div>
          </Form>
        </Card>
      </div>
    );
  } else {
    return false;
  }
}
