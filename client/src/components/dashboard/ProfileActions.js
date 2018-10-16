import React from 'react';
import { Link } from 'react-router-dom'; 
import '../css/dashbord.css';

const ProfileActions = () => {
  return (
    <div className="grp">
    <Link className="btn btn--profile" to="/edit-profile"> 
   Edit Profile
    </Link>
    <Link className="btn btn--exp" to="/add-experience">
     Edit Experience
    </Link>
  
       
    </div>
  )
}

export default ProfileActions;
