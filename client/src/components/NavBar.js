import React, { useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from "../utils/consts";

const NavBar = observer(() => {
  const { user } = useContext(Context);

  const navigate = useNavigate();

  const handleNavigate = (route) => {
    navigate(route);
  };

  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
  };
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <NavLink style={{ color: "white" }} to={SHOP_ROUTE}>
            OnlineStore
          </NavLink>
          {user.isAuth ? (
            <Nav className="ml-auto" style={{ color: "white" }}>
              <Button
                variant="outline-light"
                onClick={() => handleNavigate(ADMIN_ROUTE)}
              >
                Admin Panel
              </Button>
              <Button
                variant="outline-info"
                style={{ marginLeft: "10px" }}
                onClick={logOut}
              >
                Logout
              </Button>
            </Nav>
          ) : (
            <Nav className="ml-auto" style={{ color: "white" }}>
              <Button
                variant="outline-info"
                onClick={() => navigate(LOGIN_ROUTE)}
              >
                Authorization
              </Button>
            </Nav>
          )}
        </Container>
      </Navbar>
    </div>
  );
});

export default NavBar;
