import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'; 
import {addComment} from '../../actions/postActions';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'; 
import '../css/btn.css';
import '../css/post-item.css';
import '../css/commentfeed.css';

 class CommentForm extends Component {   
    constructor(props) { 
        super(props)
        this.state = { 
            text: '',
            errors: {}, 
           
        }
     
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }


    componentWillReceiveProps(newProps) { 
        if(newProps.errors) {
            this.setState({errors: newProps.errors});
        }
    }

    onSubmit(e) {
        e.preventDefault();
        const user = this.props.auth.user;
        const {postId} = this.props;

        const newComment = {
            text: this.state.text,
            name: user.name,
            avatar: user.ava      
        }
       
        this.props.addComment(postId, newComment);  
        this.setState({text: ''}) 
      
    }
  

    onChange(e) {
       this.setState({[e.target.name]: e.target.value});
    }
  
  render() {
      const errors = this.state.errors;
    return (
      <div className="comment-form">  
        <form onSubmit={this.onSubmit} className="post-form">
               <TextAreaFieldGroup
                className="post-item-comment__text-field"
                placeholder="add comment"
                name="text"
                value={this.state.text} 
                onChange={this.onChange} 
                error={errors.text}  
              /> 
              {/* <textarea name="text" value={this.state.text} onChange={this.onChange} errors={errors.text} >
              type comment
              </textarea> */}
        <button className="btn">Add Comment</button>  
        </form>
      </div>
    ) 
  }
}

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    errors: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    errors: state.errors,
    auth: state.auth
})
export default connect(mapStateToProps,{addComment})(CommentForm);