import React from 'react'
import { auth, firestore } from '../firebase/firebase';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import firebase from 'firebase';
import {Table, Button} from 'react-bootstrap';
import {REDIRECT_URL} from '../constants/constants'

const Profile = () => {
    var user = firebase.auth().currentUser;
    var name;
    let temp;
    if (user) {
        // User is signed in.
        temp = firestore.collection(`users/${auth.currentUser.uid}/wishlist`);
        name = user.displayName;
    }

    const wishListRef = temp;
    const [items] = useCollectionData(wishListRef, {idField:'id'});

    const unixToDate = (unixTime) => {
        const dateObject = new Date(unixTime * 1000);
        const humanDateObject = dateObject.toLocaleString("en-US", { dateStyle: "medium" });
        return humanDateObject;
    }

    const deleteItem = (id) => {
        wishListRef.doc(id).delete();        
    }

    return (
        <div>
            <div className="text-center">
                <h3>{name}'s Wish List</h3>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Savings</th>
                        <th>Price</th>
                        <th>Title</th>
                        <th>Metacritic Score</th>
                        <th>Release Date</th>
                        <th>Recent</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {items && items.map(item => (
                        <tr key={item.id}>
                            <td>{Math.round(item.savings)}%</td>
                            <td>${item.salePrice}</td>
                            <td className="d-flex justify-content-between">
                                <a target="_blank" rel="noreferrer" href={REDIRECT_URL + item.dealID}>
                                    <img src={item.thumb} alt={item.title}></img> {item.title}
                                </a>
                                <Button variant="outline-danger" onClick={() => deleteItem(item.id)}>Delete</Button>
                            </td>
                            <td>{item.metacritic}</td>
                            <td>{item.releaseDate !== 0 ? unixToDate(item.releaseDate) : 'N/A'}</td>
                            <td>{unixToDate(item.recent)}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            
        </div>
    )
}

export default Profile
