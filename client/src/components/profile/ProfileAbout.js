import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import isEmpty from '../../validation/is-empty';

 class ProfileAbout extends Component {
  
  render() {
    const  profile  = this.props.profile;
    const firstName = profile.user.name.trim().split(' ')[0];
    const skills = profile.skills.map((skill, index) => (
        <div key={index}>
        {skill}
        </div> 
    ));
    return (
      <div>
        <p> {firstName} bio</p>
        <p> {isEmpty(profile.bio) ? null : (<span>{profile.bio}</span>)} </p>
        {skills}
      </div> 
    )
  }
}
export default ProfileAbout;
