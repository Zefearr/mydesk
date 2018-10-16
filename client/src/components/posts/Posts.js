import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import PostForm from './PostForm';
import Spinner from '../common/Spinner';
import {getPosts} from '../../actions/postActions';
import PostFeed from './PostFeed';
import '../css/postfeed.css';

class Posts extends Component {

  componentDidMount() {
    this.props.getPosts();  
  }
 
  render() {
    const {posts, loading} = this.props.post;
    const mainFlex = {
      display: 'flex',
      justifyContent: 'space-between',
      paddingTop: '20px'
    }
    let postsContent;
   
    
    if(posts === null || loading) {
      postsContent = <Spinner />
    } else {
      postsContent = <PostFeed posts={posts} /> 
      
 
    
    
    }
    return (
      <div style={mainFlex}> 
    
      <div className="posts">
        <PostForm />
        {postsContent}

      </div>
    
      
      </div>
    )
  }
}
Posts.propTypes = { 
  getPosts: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
  post: state.post
});
export default connect(mapStateToProps, {getPosts})(Posts);
