import React, { Component } from 'react';
import PropTypes from 'prop-types'; 
import { withRouter } from 'react-router-dom'; 

import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';

import '../css/auth.css'; 
import TextFieldGroup from '../common/TextFieldGroup';  

import Particles from '../layout/Particles';

 class Register extends Component {
     constructor() { 
         super(); 
         this.state = {
             name: '',
             email: '',
             password: '',
             password2: '',
             errors: {}
         };
         this.onChange = this.onChange.bind(this);
         this.onSubmit = this.onSubmit.bind(this);
     }
     componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

     componentWillReciveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }
   
    
     onChange(e) {
        this.setState({[e.target.name]: e.target.value});
     }
     onSubmit(e) {
        e.preventDefault();
    
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };
        this.props.registerUser(newUser, this.props.history) 
     
     }

  render() {
    //   const { errors } = this.state;

     const errors = this.props.errors;
    
    return (
       
      <div className="container">
           <Particles /> 
           <div className="login">
          
            <form noValidate onSubmit={this.onSubmit} className="login-form">
            <h5>Create your account</h5>
            <TextFieldGroup
             placeholder="name" 
             name="name"
             type="text"
             value={this.state.name}
             onChange={this.onChange}
             error={errors.name} 
              /> 

           

               <TextFieldGroup
             placeholder="email adress"
             name="email"
             type="email"
             value={this.state.email}
             onChange={this.onChange}
             error={errors.email} 
             
              />   
              <TextFieldGroup
             placeholder="password"
             name="password"
             type="password"
             value={this.state.password}
             onChange={this.onChange}
             error={errors.password} 
              />  
                 <TextFieldGroup
             placeholder="repeat password"
             name="password2" 
             type="password"
             value={this.state.password2}
             onChange={this.onChange}
             error={errors.password2}  
              />
           

                <button className="submit-button" type="submit">Register</button>
           
            </form>
        </div>
      </div>
    )
  } 

}

Register.propTypes = {  
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}


const mapStateToProps = state => ({ 
    auth: state.auth,
    errors: state.errors
});




export default connect(mapStateToProps, {registerUser})(withRouter(Register));