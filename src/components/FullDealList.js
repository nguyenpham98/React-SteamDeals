import React, { useState } from 'react'
import { Button, Table } from 'react-bootstrap';
import { BEST_EXT, FULL_URL, RECENT_EXT, REDIRECT_URL, RELEASE_EXT, TITLE_EXT, PRICE_EXT, SAVINGS_EXT } from '../constants/constants';
import { auth, firestore } from '../firebase/firebase';
import useFetch from '../hooks/useFetch'
import firebase from 'firebase';
import {useCollectionData} from 'react-firebase-hooks/firestore';

const FullDealList = ({url, setUrl}) => {
    var user = firebase.auth().currentUser;
    let temp;
    if (user) {
        // User is signed in.        
        temp = firestore.collection(`users/${auth.currentUser.uid}/wishlist`);
    } 
    
    const wishListRef = temp;
    const [items] = useCollectionData(wishListRef, { idField: 'id' });

    const { data: deals, isLoading, error } = useFetch(url);    
    const [desc, setDesc] = useState(0);
    const [pageNum, setPageNum] = useState(0);  

    const clickSort = (url) => {
        let newDesc = desc === 1 ? 0 : 1;
        setDesc(newDesc);
        setUrl(url + "&desc=" + newDesc);        
    }

    const unixToDate = (unixTime) => {
        const dateObject = new Date(unixTime * 1000);
        const humanDateObject = dateObject.toLocaleString("en-US", { dateStyle: "medium" });
        return humanDateObject;
    }

    const goNext = (page) => {
        page = pageNum+1;
        setUrl(url + "&pageNumber=" + page);
        setPageNum(page);        
        window.scrollTo(0, 0)
    }

    const goBack = (page) => {
        page = pageNum-1;
        setPageNum(page);
        setUrl(url + "&pageNumber=" + page)
        window.scrollTo(0, 0)
    }

    const addWishList = (deal) => {        
        // validate duplicates
        let exists = items.some(item => item.title ===deal.title);       
        if(!exists){
            wishListRef.add({
                title: deal.title,
                thumb: deal.thumb,
                dealID: deal.dealID,
                savings: deal.savings,
                salePrice: deal.salePrice,
                metacritic: deal.metacriticScore,
                releaseDate: deal.releaseDate,
                recent: deal.lastChange,
            })
            alert("Added to wishlist");
        }
        else alert("Already In Wishlist");
        
    };

    return (
        <div>
            { error && <div>{error}</div>}
            { isLoading && <div>Loading...</div>}      

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th onClick={() => clickSort(FULL_URL + SAVINGS_EXT)}>Savings</th>
                        <th onClick={() => clickSort(FULL_URL + PRICE_EXT)}>Price</th>
                        <th onClick={() => clickSort(FULL_URL + TITLE_EXT)}>Title</th>
                        <th onClick={() => clickSort(FULL_URL + BEST_EXT)}>Metacritic Score</th>
                        <th onClick={() => clickSort(FULL_URL + RELEASE_EXT)}>Release Date</th>
                        <th onClick={() => clickSort(FULL_URL + RECENT_EXT)}>Recent</th>
                    </tr>
                </thead>
                <tbody>
                    {deals && deals.map(deal => (
                        <tr key={deal.title}>
                            <td>{Math.round(deal.savings)}%</td>
                            <td><strong>${deal.salePrice}</strong> <del>${deal.normalPrice}</del></td>
                            <td className="d-flex justify-content-between">
                                <a target="_blank" rel="noreferrer" href={REDIRECT_URL + deal.dealID}>
                                    <img src={deal.thumb} alt={deal.internalName}></img> {deal.title}
                                </a>
                                <Button variant="outline-warning" onClick={() => addWishList(deal)}>Wishlist</Button>
                            </td>
                            <td>{deal.metacriticScore}</td>
                            <td>{deal.releaseDate !==0 ? unixToDate(deal.releaseDate) : 'N/A'}</td>
                            <td>{unixToDate(deal.lastChange)}</td>
                        </tr>
                    ))}                    
                </tbody>
            </Table>
            <div className="d-flex justify-content-between">
                <Button onClick={() => goBack(pageNum)} disabled={pageNum===0}>Previous</Button>
                <Button onClick={()=>goNext(pageNum)}>Next</Button>
            </div>
        </div>
    )
}

export default FullDealList
