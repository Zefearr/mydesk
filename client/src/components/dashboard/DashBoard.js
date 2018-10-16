import React, { Component } from 'react';
import { Link }  from 'react-router-dom'; 
import PropTypes from 'prop-types'; 
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import '../css/dashbord.css';
import Spinner from '../common/Spinner';
import ProfileActions from './ProfileActions';
import Experience from './Experience'; 



 class DashBoard extends Component {
    componentDidMount() {
        this.props.getCurrentProfile(); 
    }
    onDeleteClick(e) {
      this.props.deleteAccount(); 
    }
  render() {
    // const imgstyle = {
    //   width: '30px', 
    //   height: '30px'
    // }

    const { user } = this.props.auth; 
    const { profile, loading } = this.props.profile; 

    let dashboardContent;

    if(profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
     //check if logged in user has profile data
     if(Object.keys(profile).length > 0) {
        dashboardContent = 
        <div className="dashboard-content-container"> 
        <p className="dashboard__profile-name-link"><Link to={`/profile/${profile.slug}`}> {user.name} </Link> </p> 
        <ProfileActions /> 
        <Experience experience={profile.experience}/>   
        {/* <img src={profile.ava} style={imgstyle} alt=""/> */}
       
        <button className="btn" onClick={this.onDeleteClick.bind(this)}>Delete Accaount</button>
        
        </div>
     } else {
        // user is logged in but has no profile
        dashboardContent = (
          <div>
            <p>Welcome {user.name} </p> 
            <p>set up your profile bitch</p>
            <Link to="/create-profile" className="create-prof"> Create Profile </Link>
          </div>
        );
     }
    }

    return (
      <div className="dashboard">
        <div className="container">  
          {dashboardContent} 
        </div>
      </div>
    )
  }
}
DashBoard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,

}
const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});
export default connect(mapStateToProps, {getCurrentProfile, deleteAccount})(DashBoard);