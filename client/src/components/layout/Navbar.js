import React, { Component } from 'react';  
import '../css/navbar.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logOutUser } from '../../actions/authActions';
import { clearCurrentProfile } from  '../../actions/profileActions'; 



class Navbar extends Component {  

  onLogout(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logOutUser(); 
  }
  toggle(e) {
    e.preventDefault();
    let sm = document.querySelector('.submenu');
    if(sm !== 'undefined' || sm !== null) {
      sm.classList.toggle('active');
    } else return
  }
 
  render() {
  
    const style = {
      width: '30px',
      height: '30px',
      display: 'block',
      position: 'absolute',
      left:0,
      opacity: 0,
      borderRadius: '50%',
    
    
  }
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul className="main-navigation">
        <li><Link to="/blog">Blog</Link></li> 
        <li><Link to="/profiles">Profiles</Link></li> 
       
        <li>
          <a href='' onClick={this.toggle}> <img style={style} src={user.avatar} alt={user.name} title="you must have a gravatar connected" /> {user.name} </a>
          <ul className="submenu">
            <li><Link to="/dashboard">Desk</Link></li>
            <li><a href="" onClick={this.onLogout.bind(this)}> Logout</a></li> 
          </ul>
        </li> 
      
      </ul>
    );
    const guestLinks = (
      <ul className="main-navigation">
       <li><Link to="/profiles">Profiles</Link></li> 
       <li><Link to="/blog">Blog</Link></li> 
        <li><Link to="/dashboard">Desk</Link></li> 
        <li><Link to="/register">Register</Link></li> 
        <li><Link to="/login">Login</Link></li> 
        
      </ul>
    );

    return (
      <header className="page-header"> 
        <div className="nav-flex">
            <Link to="/" className="brand">PetFactory</Link>
            <nav className="navbar">
            
                {isAuthenticated ? authLinks : guestLinks}
            </nav>
        </div>
      </header>
    )
  }
}
Navbar.propTypes = {
  logOutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile 
});
export default connect(mapStateToProps, {logOutUser, clearCurrentProfile})(Navbar); 


