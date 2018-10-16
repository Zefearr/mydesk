import React, { Component } from 'react';
import  PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import isEmpty from '../../validation/is-empty';
import './profile.css';

 class ProfileItem extends Component {
  render() {
    const profile = this.props.profile
    const style = {
      width: '100px',
      height: 'auto'
    }
    return (
      
        <div className="profile-item">
            <img  style={style} src={profile.ava} alt=""/> 
            <h3 className="profile-item__user-name"> {profile.user.name} </h3>
            {/* <p>
              {profile.status} {isEmpty(profile.bio) ? null : (<span>at {profile.bio} </span>)} 
            </p> */}
            <h5>Skills set</h5>
            {profile.skills.slice(0, 4).map((skill, index) => (
              <li key={index} className="profile-skills-item">
                {skill}
              </li>
            ))}

            <span className="badge"></span>
            <Link className="btn profile-item__link" to={`/profile/${profile.slug}`}> View Profile </Link> 
        </div>
     
    )
  }
}
ProfileItem.propTypes = { 
  profile: PropTypes.object.isRequired 
}
export default ProfileItem;
