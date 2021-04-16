import React from 'react'
import useFetch from '../hooks/useFetch'
import {  ListGroup } from 'react-bootstrap'
import { REDIRECT_URL } from '../constants/constants';


const DealList = ({url, title}) => {
    
    const { data: deals , isLoading, error} = useFetch(url);
    return (
        <div>
            {error && <div>{error}</div>}
            {isLoading && <div>Loading...</div>}
            <h3>{title}</h3>
            <ListGroup>
            {deals && deals.map(deal => (
               
                <ListGroup.Item key={deal.gameID} className="d-flex justify-content-between" action>
                              
                        <div>
                            <a target="_blank" rel="noreferrer" href={REDIRECT_URL+deal.dealID}>
                                <img src={deal.thumb} alt={deal.internalName}></img> {deal.title} 
                            </a>                        
                        </div>
                        <div>
                            <del>${deal.normalPrice}</del> <strong>${deal.salePrice}</strong>
                        </div>
                     
                </ListGroup.Item>  
                         
            ))}
            </ListGroup>
        </div>
    )
}

export default DealList
