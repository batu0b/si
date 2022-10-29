import { Button, Card } from "@mui/material";
import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = useContext(AuthContext);

  const Submit = (e) => {
    e.preventDefault();
    signIn({ email, password });
  };

  return (
    <div
      style={{ flexDirection: "column" }}
      className="bg-dark d-flex justify-content-center align-items-center allHeight "
    >
      <h1 className="text-light"> Welcome again</h1>

      <Card body>
        <Form onSubmit={Submit} className="m-5 ">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              required
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button type="submit">Sign In</Button>
          <Link to="/sign-up">I dont have</Link>
        </Form>
      </Card>
    </div>
  );
}
