import React, {useContext, useState} from 'react'
import { Jumbotron } from 'react-bootstrap';
import { FULL_URL } from '../constants/constants';
import FullDealList from './FullDealList'
import { UserContext } from './UserContext';

const Browse = () => {   
    const msg = useContext(UserContext);
    const [url, setUrl] = useState(FULL_URL);
    
    return (
        <div>            
            <Jumbotron>
                <FullDealList setUrl={setUrl} url={url+'&title='+msg}></FullDealList>
            </Jumbotron>
        </div>
    )
}

export default Browse
