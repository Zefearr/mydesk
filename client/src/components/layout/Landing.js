import React, { Component } from 'react';  
import { PropTypes } from 'prop-types'; 
import { connect } from 'react-redux';
import '../css/front-page.css';

 class Landing extends Component {
  // componentDidMount() {
  //   if(this.props.auth.isAuthenticated) {
  //       this.props.history.push('/dashboard');
  //   } 
  // }
  render() {
    return (
     
      <section className="main">
        <div className="container">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut pariatur animi repellat impedit atque ipsam labore magnam veritatis ratione facere quae dignissimos adipisci aperiam alias cumque illo corrupti, eveniet error doloremque? Ipsum ratione assumenda neque temporibus impedit voluptatum sed quis animi facilis ullam! Facere enim ipsum nemo dolor voluptatibus animi laboriosam neque quo corporis dolores veritatis, consequuntur blanditiis ad eos mollitia natus, dolore unde culpa beatae, dicta perferendis consectetur nostrum quibusdam quisquam? Deleniti distinctio excepturi libero asperiores, similique dolore a, necessitatibus quibusdam nam, atque iste facere voluptates officia cumque beatae. Expedita amet beatae eveniet iusto iure natus quidem libero veniam.</p>
        
        </div>
      </section>
     
    )
  }
}
Landing.propTypes = {
  auth: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({ 
  auth: state.auth
})
export default connect(mapStateToProps)(Landing)