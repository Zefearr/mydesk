import React, { Component } from 'react'; 
import { Provider } from 'react-redux';
import store from './store';
import PrivateRoute from './components/common/PrivateRoute';

import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import {setCurrentUser, logOutUser} from './actions/authActions';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 
import './App.css';
import Register from './components/auth/register'; 
import Login from './components/auth/login';
import DashBoard from './components/dashboard/DashBoard';
import { clearCurrentProfile } from './actions/profileActions'; 
import CreateProfile from './components/create-profile/CreateProfile'; 
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add_credentials/AddExperience';
import 'moment-timezone'; 
import Profiles from './components/profiles/Profiles'; 
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';



 
//check for token

if(localStorage.jwtToken) {
  //set auth token header auth
  setAuthToken(localStorage.jwtToken);
  //decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  //set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  //check for expired token
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    store.dispatch(logOutUser());
    //clear current profile
    store.dispatch(clearCurrentProfile());

    //redirect to login
    window.location.href = '/login';
  } 
}



class App extends Component {
  render() {
    return (
      <Provider store={store}>
     
      <Router>
      <div className="App"> 
      <div className="container">
    
        <Navbar />  

        <Route exact path="/" component={Landing} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profiles" component={Profiles} />  
        <Route exact path="/profile/:slug" component={Profile} />  
        <Route exact path="/blog" component={Posts} />
       
        <Route exact path="/post/:id" component={Post} /> 
        
        <Switch> 
        <PrivateRoute exact path="/dashboard" component={DashBoard} /> 
        </Switch>
        <Switch> 
        <PrivateRoute exact path="/create-profile" component={CreateProfile} /> 
        </Switch>
        <Switch> 
        <PrivateRoute exact path="/edit-profile" component={EditProfile} />    
        </Switch>
        <Switch> 
        <PrivateRoute exact path="/add-experience" component={AddExperience} />    
        </Switch>

        <Footer />
        </div>
      </div>
      </Router>
      </Provider>
    );
  }
}

export default App;
