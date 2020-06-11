import React from "react";
import {Button, Form, FormControl, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
function BCHeader() {
    return(
        <Navbar bg="light" expand="lg">
            <Navbar.Brand as={ Link } to="/">Article</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={ Link } to="/home">Home</Nav.Link>
                </Nav>
                <Form inline>
                    <FormControl
                        type="text"
                        placeholder="Search"
                        className="mr-sm-2"
                         />
                    <Button variant="outline-success">Search</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    )
}
export default BCHeader