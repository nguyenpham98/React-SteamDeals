import React, {useState} from 'react';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import Browse from './components/Browse';
import NavBar from './components/NavBar';
import {UserContext} from './components/UserContext'
import Profile from './components/Profile';
import { useAuthState } from 'react-firebase-hooks/auth';
import {auth} from './firebase/firebase';

function App() {
  const [msg, setMsg] = useState("");
  const [user] = useAuthState(auth);

  const callbackFunction = (childData) => {    
    setMsg(childData);    
  }


  return (
    <div className="App">
      <Router>
        <NavBar parentCallback={callbackFunction} user={user}></NavBar>
        <Switch>
          <UserContext.Provider value={msg}>
            <Route exact path='/' component={Home}></Route>
            <Route path='/home' component={Home}></Route>
            <Route path='/browse' component={Browse}></Route>
            <Route path='/about' component={About}></Route>
            <Route path='/profile' component={Profile}></Route>
            
          </UserContext.Provider>
        </Switch>
      </Router>
       
      
    </div>
  );
}


export default App;
