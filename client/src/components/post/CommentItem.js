import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {deleteComment} from '../../actions/postActions';
import '../css/btn.css';
import '../css/commentfeed.css';

 class CommentItem extends Component {
    deleteCommentHandler(postId, commentId) {
        this.props.deleteComment(postId, commentId);
    }
  render() {
      const {comment, postId, auth} = this.props;
    return (
      <div className="commentfeed">
        <div className="commentfeed__wrapper">
           
            <p className="comment-author"> {comment.name} </p> 
            <p className="comment-author__text"> {comment.text} </p> 
            {comment.user === auth.user.id ? (
                <button className="btn btn--danger" onClick={this.deleteCommentHandler.bind(this, postId, comment._id)}>Delete Comment</button>
            ) : null} 
        </div>  
      </div>
    )
  }
}
CommentItem.propTypes = {
    deleteComment: PropTypes.func.isRequired,
    comment: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps, {deleteComment})(CommentItem);
