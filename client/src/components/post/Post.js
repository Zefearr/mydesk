import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import {getPost} from '../../actions/postActions';
import PostItem from '../posts/PostItem';
import '../css/sprite.css'; 


 class Post extends Component {
   componentWillMount() {
     this.props.getPost(this.props.match.params.id);
   }
  render() {
    const {post, loading} = this.props.post;
    let postContent;
    if(post === null || loading || Object.keys(post).length === 0) { 
      postContent = <Spinner />
    } else {
      postContent = (
        <div>
          <PostItem post={post} showActions={false} />  
          {/* <CommentForm postId={post._id} /> 
         <CommentFeed postId={post._id} comments={post.comments} />  */}
        </div>
      );
    }
    return (
      <div className="post">
          <h2> <span className="icon icon--facebook_icon"></span> Post</h2> 
          {postContent}
      </div>
    )
  }
}
Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  post: state.post
})
export default connect(mapStateToProps, {getPost})(Post);
