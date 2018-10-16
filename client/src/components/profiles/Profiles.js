import React, { Component } from 'react';
import { connect } from 'react-redux';
import  PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import { getProfiles } from '../../actions/profileActions'; 
import ProfileItem from './ProfileItem'; 
import './profile.css'; 

class Profiles extends Component {
    componentDidMount() {
        this.props.getProfiles();
    }
  render() {
    //   const { profiles, loading } = this.props.profile;
      const profiles = this.props.profile.profiles;
      const loading = this.props.profile.loading;
    
      let profileItems;

      if(profiles === null || loading) {
          profileItems = <Spinner />;

      } else {
      
       if(profiles.length > 0) {
        
            profileItems = profiles.map(profile => (

                <ProfileItem key={profile._id} profile={profile} /> 
            ))
           
       } else {
           profileItems = <h6>no profiles found</h6>
       }
      }
    return (
      <div className="profile-item-wrapper" >
        { profileItems } 
        
      </div>
    )
  }
}
Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    profile: state.profile
})
export default connect(mapStateToProps, {getProfiles})(Profiles);
