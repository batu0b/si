import React, { useContext } from "react";
import {
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { OtherUsersContext } from "../context/OtherUsersContext";
import { RandomContext } from "../context/RandomFriend";

export default function NavBar() {
  const { setSearchText, navigateSearch } = useContext(OtherUsersContext);
  const { searchRandom  } = useContext(RandomContext);
  return (
    <Navbar fixed="top" bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/Home">LOGO</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/Profile">Profile</Nav.Link>
            <NavDropdown title="Share Post" id="navbarScrollingDropdown">
              <NavDropdown.Item href="/share-post">
                Share Article
              </NavDropdown.Item>
              <NavDropdown.Item href="#action4">Share Image</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/Chat-List" >
              Chat List
            </Nav.Link>
          </Nav>
          <Button
            onClick={() => searchRandom()}
            className="me-3"
            variant="success"
          >
            Find Random Friends
          </Button>
          <Form onSubmit={() => navigateSearch()} className="d-flex">
            <Form.Control
              required
              type="search"
              placeholder="Find Some Friends"
              className="me-2"
              aria-label="Search"
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Button type="submit" variant="outline-success">
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
