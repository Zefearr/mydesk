import React, { Component } from 'react';
import isEmpty from '../../validation/is-empty';
// import {Link} from 'react-router-dom';


export default class ProfileHeader extends Component {
   
 
    
   
    
  
    
    clicked(e){ 
        e.preventDefault();
        console.log('123');
    }
     
  render() {
      const profile = this.props.profile;
        const singleProfileAva = {
            maxWidth: '250px',
            height: 'auto',
            display:'block',
            margin: 'auto'
        }

       
      
        
    return (
        
      <div className="single-profile__header">  

        <img style={singleProfileAva} src={profile.ava} alt="avatar"/> 
        <p> {profile.user.name} </p>
        <p> {profile.status} </p>
      
        {isEmpty(profile.social && profile.social.facebook) ? null : (  

        <a id="href" rel="noopener noreferrer" href={`https://${profile.social.facebook}`} target="_blank" className="btn profile-item__link" > Facebook </a>  
        

        )} 

        {isEmpty(profile.social && profile.social.youtube) ? null : (  

        <a id="href" rel="noopener noreferrer" href={`https://${profile.social.youtube}`} target="_blank" className="btn profile-item__link" > Youtube </a>  


        )}
       
      </div>
    )
   
  }
}
