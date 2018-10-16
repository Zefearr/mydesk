import React, { Component } from 'react'; 
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux'; 
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'; 
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProf, getCurrentProfile } from '../../actions/profileActions';   
import isEmpty from '../../validation/is-empty'; 
import { Link } from 'react-router-dom';
import '../profiles/profile.css';



 class CreateProfile extends Component { 
     constructor(props) {
        super(props);
        this.state = { 
          displaySocialInputs: false,
            slug: '',
            status: '',
            skills: '',
            bio: '',
            experience: '',
            facebook: '',
            youtube: '',
            ava: '',
            errors: {} 
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
     }
     componentDidMount() { 
         this.props.getCurrentProfile();
     }
     componentWillReceiveProps(nextProps) {
       if(nextProps.errors) {
         this.setState({errors: nextProps.errors});
       }
       if(nextProps.profile.profile) {
           const profile = nextProps.profile.profile;
           //skills array back t o CSV 
           const skillsCSV = profile.skills.join(','); 
           //if profile field doesnt exist, make it empty string
           profile.ava = !isEmpty(profile.ava) ? profile.ava : '';
           profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
           profile.social = !isEmpty(profile.social) ? profile.social : {};
           profile.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube : '';
           profile.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : '';

           //set component fields state
           this.setState({
            ava: profile.ava, 
            slug: profile.slug, 
            status: profile.status,
            skills: skillsCSV, 
            bio: profile.bio,
            facebook: profile.facebook,
            youtube: profile.youtube, 
           });
    
       }
     } 
    
     onSubmit(e) {
      e.preventDefault();
      const profileData = {
        slug: this.state.slug,
        status: this.state.status,
        skills: this.state.skills,
        bio: this.state.bio,
        facebook: this.state.facebook,
        youtube: this.state.youtube,
        ava: this.state.ava
      }
      this.props.createProf(profileData, this.props.history);
     }
     onChange(e) {
      this.setState({[e.target.name]: e.target.value}); 
     }
  render() {
    //select options for status
    const options = [
      { label: '* Select Professional Status',value: 0},
      { label: 'Developer', value: 'Developer'},
      { label: 'Actor', value: 'Actor'},
      { label: 'Pjos', value: 'Pjos'}
   
    ];
    const errors = this.state.errors;
    const displaySocialInputs = this.state.displaySocialInputs;
    let socialInputs;

    if(displaySocialInputs) {
      socialInputs = (
        <div className="form-group">
         <InputGroup
          placeholder="facebook"
          name="facebook"
          icon="fa fa-facebook"
          value={this.state.facebook}
          onChange={this.onChange}
          error={errors.facebook}
        />
       

        
         <InputGroup
          placeholder="youtube"
          name="youtube"
          icon="fa fa-youtube"
          value={this.state.youtube}
          onChange={this.onChange}
          error={errors.youtube}
        />
         </div>
       
      ) 
    } 
    return (
      <div className="create-profile">
        <div className="container">
        <Link className="btn profile-back-link" to="/dashboard"> Back </Link>
            <h1 className="profile-title">Create your Profile</h1>
            <p>Let`s get some information to make your profile</p>
            <small>* = required fields</small>
            <form className="profile-form" onSubmit={this.onSubmit}>

              <TextFieldGroup 
              placeholder="ava"
              name="ava" 
              value={this.state.ava}
              onChange={this.onChange}
              error={errors.ava} 
              />
           
              <TextFieldGroup
                name="slug"
                placeholder="* Profile slug"
                value={this.state.slug}
                onChange={this.onChange}
                error={errors.slug}
                
              /> 
               <SelectListGroup
                name="status"
                placeholder="* Profile Handle"
                options={options}
                value={this.state.status}
                onChange={this.onChange}
                error={errors.status}
              />
           
          
              <p>Yout set of 'skills' separated by kama</p>
                 <TextFieldGroup
                name="skills"
                placeholder="skills"
                value={this.state.skills}
                onChange={this.onChange}
                error={errors.skills}
              />
            

               <TextAreaFieldGroup
                name="bio"
                placeholder="bio"
                value={this.state.bio}
                onChange={this.onChange} 
                error={errors.bio}
              />
              
              <button
              type="button"
              className="btn btn--social-links"
               onClick={() => {
                this.setState(prevState => ({
                  displaySocialInputs: !prevState.displaySocialInputs
                }))
              }} > Add Social Network Links </button>
              { socialInputs } 
             
              
              
              <button className="btn profiles-submit">Update</button> 
            </form>
        </div> 
      </div>
    )
  }
}
CreateProfile.propTypes = { 
  createProf: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,  
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});
export default connect(mapStateToProps, { createProf, getCurrentProfile })(withRouter(CreateProfile));  