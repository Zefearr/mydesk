import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import {addPost} from '../../actions/postActions';


 class PostForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this); 
    }
    onSubmit(e) {
        e.preventDefault();
        const {user} = this.props.auth;
        const newPost = {
            text: this.state.text,
            name: user.name,
            avatar: user.avatar
        }
        this.props.addPost(newPost);
        this.setState({text: ''});
       
    }
    onChange(e) {
       this.setState({[e.target.name]: e.target.value});
    }
  render() {
      const errors = this.state.errors;  
    return (
      <div>
        <form  onSubmit={this.onSubmit} className="post-form">
        <TextAreaFieldGroup
        placeholder="create a post"
        name="text"
        value={this.state.text}
        onChange={this.onChange} 
        error={errors.text}
        />
        <button className="btn">Submit</button>
        </form>
      </div>
    )
  }
}
PostForm.propTypes = {
    addPost: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired 
}
const mapStateToProps = state => ({
    errors: state.errors,
    auth: state.auth
})
export default connect(mapStateToProps, {addPost})(PostForm);