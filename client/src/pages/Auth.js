import React, { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import { Card, Container, Form, Row, Button, Col } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { login, registration } from "../http/userAPI";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { Context } from "../index";

const Auth = observer(() => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    debugger;
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const isLogin = location.pathname === LOGIN_ROUTE;

  const handleComeIn = async () => {
    try {
      let data;
      if (isLogin) {
        data = await login(email, password);
      } else {
        data = await registration(email, password);
      }
      user.setUser(user);
      user.setIsAuth(true);
      navigate(SHOP_ROUTE);
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card className="p-5" styles={{ width: 600 }}>
        <h2 className="m-auto">{isLogin ? "Authorization" : "Registration"}</h2>
        <Form
          className="d-flex flex-column"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        ></Form>
        <Form.Group
          className="was-validated"
          as={Col}
          controlId="validationCustom01"
        >
          <Form.Control
            className="mt-3"
            required
            placeholder="Enter your email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="was-validated" controlId="validationCustom01">
          <Form.Control
            className="mt-3"
            required
            placeholder="Enter your password..."
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
          {isLogin ? (
            <div>
              Still don't have an account?{" "}
              <Link to={REGISTRATION_ROUTE}>Register!</Link>
            </div>
          ) : (
            <div>
              Have an account? <Link to={LOGIN_ROUTE}>Login!</Link>
            </div>
          )}
          <Button className="mt-3" type="submit" onClick={handleComeIn}>
            {isLogin ? "Login" : "Register"}
          </Button>
        </Row>
      </Card>
    </Container>
  );
});

export default Auth;
