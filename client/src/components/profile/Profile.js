import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import Spinner from '../common/Spinner'; 
import { getProfileByHandle } from '../../actions/profileActions';
import UserPosts from '../posts/UserPost';



 class Profile extends Component { 

    componentDidMount() {
        if(this.props.match.params.slug) { 
            this.props.getProfileByHandle(this.props.match.params.slug);
        }
    }
  render() {
      const {profile, loading} = this.props.profile;
      let profileContent;

      if(profile === null || loading) {
          profileContent = <Spinner />
      } else {
          profileContent = (
              <div>
                <Link to="/profiles">Back</Link>
                <ProfileHeader profile={profile} /> 
                <ProfileAbout profile={profile} />
                <ProfileCreds experience={profile.experience} /> 
                <UserPosts />  
              </div> 
          )
      }
    return (
      <div className="single-profile">
        {profileContent} 
      </div>
    )
  }
}
Profile.propTypes = {
    getProfileByHandle: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired 
}
const mapStateToProps = state => ({ 
    profile: state.profile
})
export default connect(mapStateToProps, {getProfileByHandle})(Profile); 
