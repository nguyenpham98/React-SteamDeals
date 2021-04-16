import React from 'react'
import {Card, Button} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const About = () => {
    const history = useHistory();

    return (
        <div>
            <Card className="text-center">
                <Card.Header><h1>SteamDeals - Explore Games On Sale</h1></Card.Header>
                <Card.Body>                    
                    <Card.Title>Want to get a new game on Steam but don't where to start for cheap?</Card.Title>
                    <Card.Text>SteamDeals can help you with just that.</Card.Text>
                    <Card.Text>You can search for current available games on Steam that is on sale.</Card.Text>
                    <Card.Title>Found a good game but not sure to buy?</Card.Title>
                    <Card.Text>Sign in and save the deal for later.</Card.Text>            
                    <Button variant="outline-info" onClick={() => history.push('/browse')}>Explore</Button>
                </Card.Body>
            </Card>
        </div>
    )
}

export default About
