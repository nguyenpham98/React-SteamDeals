import React, { Fragment } from 'react'
import { Navbar, Nav, Form, Button, FormControl } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../firebase/firebase';
import firebase from 'firebase';

const NavBar = ({parentCallback, user}) => {
    

    let history = useHistory();
    
    const onSubmitHandler = (event) => {
        event.preventDefault();  
        parentCallback(event.target[0].value);
        history.push("/browse");        
    }

    const signInWithGoogle = () => auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());

    const signOut = () => auth.signOut();


    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand as={Link} to='/'>SteamDeals</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link as={Link} to="/home">Home</Nav.Link>
                                <Nav.Link as={Link} to="/browse">Browse</Nav.Link>
                                <Nav.Link as={Link} to="/about">About</Nav.Link>      
                                <Form inline onSubmit={onSubmitHandler}>
                                    <FormControl type="text" placeholder="Enter a game" className="mr-sm-2" />
                                    <Button type="submit" variant="outline-success"  >Search</Button>
                                </Form>
                                     
                            </Nav>                    
                            <Nav>
                            {user ?
                            <Fragment>
                                <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                                <Button variant="outline-danger" onClick={signOut}>Log Out</Button>
                            </Fragment> :
                            <Button variant="outline-info" onClick={signInWithGoogle}>Sign In With Google</Button>}
                            </Nav>
                            
                        </Navbar.Collapse>
                        
            </Navbar>
        </div>
    )
}

export default NavBar
