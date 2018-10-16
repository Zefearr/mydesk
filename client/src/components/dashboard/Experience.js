import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
// import 'moment-timezone'; 
import Moment from 'react-moment';  
import { deleteExperience } from '../../actions/profileActions';
import '../css/table.css';

 class Experience extends Component { 
   onDelete(id) {
     this.props.deleteExperience(id);  
   }
  render() {
    
    // const dateToFormat = '2015-03-04T00:00:00.000Z'
      const experience = this.props.experience.map(exp => (
         
          <tr key={exp._id}>
            <td>{exp.company}</td>
            <td>{exp.title}</td>
    
            <td><Moment format="YYYY/MM/DD">{exp.from}</Moment> - 
            {exp.to === null ? ('now working in') : (<Moment format="YYYY/MM/DD">{exp.to}</Moment>)}
            </td>

            <td><button className="btn btn--danger" onClick={this.onDelete.bind(this, exp._id)} >Delete</button></td>
          </tr>
      ))
    return (

      

      <div>
          <h4>Experience creds</h4>
          <table className="exp-table"> 
              <thead>
                  <tr>
                  <th>company</th>
                  <th>title</th>
                  <th>years</th>
                  <th></th>
                  </tr>
                 
              </thead>

                <tbody>
                      {experience} 
                </tbody>
          </table>
      </div>
    )
  }
}
Experience.propTypes = { 
  deleteExperience: PropTypes.func.isRequired
}
export default connect(null, {deleteExperience})(withRouter(Experience));
