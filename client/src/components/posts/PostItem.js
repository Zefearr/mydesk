import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import classnames from 'classnames';
import {Link} from 'react-router-dom';
import '../css/btn.css';
import '../css/post-item.css';
import {deletePost, addLike, removeLike } from '../../actions/postActions';
import Moment from 'react-moment';
import CommentFeed from '../post/CommentFeed';
import CommentForm from '../post/CommentForm';
import {getPost} from '../../actions/postActions'; 



class PostItem extends Component {
 
    componentDidMount() {
        this.forceUpdate();
    }

    onDelete(id) {
        this.props.deletePost(id); 
    }
    onAddLike(id) {
        this.props.addLike(id);
    }

    onDeleteLike(id) {
        this.props.removeLike(id);
    }
    findUserLike(likes) {
        const { auth } = this.props;
        if(likes.filter(like => like.user === auth.user.id).length > 0) {
            return true;
        } else {
            return false
        }
    }
  
  
  render() {
      const {post, auth, showActions} = this.props;
     
      const html = () => {
        let maxLength = 600;
          return {
              __html: post.text.substr(0, maxLength)
          }
      }
 
    
  
 
     
    return (
   
        <div className="post-item">
                <div> 
                {post.user === auth.user.id ? (
                    <span onClick={this.onDelete.bind(this, post._id)} className="icon icon--close_icon delete-post-icon"></span>
                ) : null} </div>

                <div className="post-item__author">
                    <img className="post-item__avatar" src={post.avatar} alt=""/>
                    <div className="post-item__creds">

                    <h4 className="post-item__author-name">{post.name}</h4> 
             

                    <p className="post-item__time">posted <Moment toNow>{post.date}</Moment></p>
                    </div>
              
                </div>

                <div className="post-item__main-content"> 


                <div dangerouslySetInnerHTML={html()} />  
                
                {showActions ?  <Link to={`/post/${post._id}`} className="btn btn--link">
                   ReadMore
               </Link> : null }
                </div>
               
                <div className="likes-container"> 
                
                <div className="likes-arrows">


                <span className={classnames('icon icon--arrow', { 

                    'liked' : this.findUserLike(post.likes)

                })} onClick={this.onAddLike.bind(this, post._id)}></span>

                <span className="icon icon--arrow2" onClick={this.onDeleteLike.bind(this, post._id)}></span>
                <span className="likes-count"> {post.likes.length} </span> 
                </div>

               
                <span className="icon icon--commentsIcon"></span> <span>{post.comments.length}</span>

                
                </div>
            

                <CommentForm postId={post._id} /> 
                <CommentFeed postId={post._id} comments={post.comments} />  
              

            
             
        </div>
      
    )
  }
}
PostItem.defaultProps = { 
    showActions: true
}
PostItem.propTypes = {
    deletePost: PropTypes.func.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired, 
    auth: PropTypes.object.isRequired,
    getPost: PropTypes.func.isRequired,
 
  
}
const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps, {deletePost,  addLike, removeLike, getPost})(PostItem)
