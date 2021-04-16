
import { Container, Jumbotron } from 'react-bootstrap';
import DealList from './DealList';
import { BEST_EXT, LOWEST_EXT, RECENT_EXT, SHORT_URL } from '../constants/constants'

const Home = () => {        
    const featuredTitle = "Featured Deals";
    const recentTitle = "Newest Games";    
    const bestTitle = "Best Games";    
    const lowestTitle = "Lowest Price Deals";
    
    

    return (
        <Jumbotron fluid>
            <Container className="text-center">   
                <DealList url={SHORT_URL} title={featuredTitle}></DealList>
                <DealList url={SHORT_URL+RECENT_EXT} title={recentTitle}></DealList>
                <DealList url={SHORT_URL+BEST_EXT} title={bestTitle}></DealList>
                <DealList url={SHORT_URL+LOWEST_EXT} title={lowestTitle}></DealList>
            </Container>   


        </Jumbotron>
    )
}

export default Home
