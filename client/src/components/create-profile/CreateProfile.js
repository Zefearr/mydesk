import React, { Component } from 'react'; 
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux'; 
import PropTypes from 'prop-types'; 
import '../profiles/profile.css'; 
//form inputs
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'; 
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
//form inputs ends
import {createProf} from '../../actions/profileActions';    


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
  

     componentWillReceiveProps(nextProps) {
       if(nextProps.errors) {
         this.setState({errors: nextProps.errors});
       }
     } 

     onChange(e) {
      this.setState({[e.target.name]: e.target.value}); 
     }

     onSubmit(e) {
      e.preventDefault();
      const profileData = {
        ava: this.state.ava, 
        slug: this.state.slug,
        status: this.state.status,
        skills: this.state.skills,
        bio: this.state.bio,
        facebook: this.state.facebook,
        youtube: this.state.youtube, 
      }
      this.props.createProf(profileData, this.props.history);
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
            <h1>Create your Profile</h1>
            <p>Let`s get some information to make your profile</p>
            <small>* = required fields</small>
           
            <form onSubmit={this.onSubmit}>
              <TextFieldGroup
                name="slug"
                placeholder="* Profile slug"
                value={this.state.slug}
                onChange={this.onChange}
                error={errors.slug}
                info="Uniqe slug for your profile. Your full name, nickname etc"
              />
               <TextFieldGroup
              placeholder="ava"
              name="ava" 
              value={this.state.ava}
              onChange={this.onChange}
              error={errors.ava} 
              />
               <SelectListGroup
                name="status"
                placeholder="* Profile Handle"
                options={options}
                value={this.state.status}
                onChange={this.onChange}
                error={errors.status}
                info="Who are you mthka" 
              />

                 <TextFieldGroup
                name="skills"
                placeholder="skills"
                value={this.state.skills}
                onChange={this.onChange}
                error={errors.skills}
                info="skills"
              />
          

               <TextAreaFieldGroup
                name="bio"
                placeholder="bio"
                value={this.state.bio}
                onChange={this.onChange} 
                error={errors.bio}
                info="BIO"
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
            
              {/* <input type="submit" value="submit" /> */}
              <button className="profiles-submit">Update</button> 
            </form>
        </div> 
      </div>
    )
  }
}
CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});
export default connect(mapStateToProps, { createProf })(withRouter(CreateProfile));  
