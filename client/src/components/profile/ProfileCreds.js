import React, { Component } from 'react';
import Moment from 'react-moment';   

export default class ProfileCreds extends Component {
  render() {
      const { experience } = this.props;
      const expItems = experience.map(exp => (
          <li key={exp._id} className="exp-item">
            <a href=""> {exp.company} </a>
            <div>
                <Moment format="YYYY/MM/DD">
                     {exp.from}
                </Moment> - 
                {exp.to === null? (' Now') : (
                <Moment format="YYYY/MM/DD">
                 {exp.to}
                  </Moment>)} 
            
            </div>
            <p><strong>Position:</strong> {exp.title} </p>
            <p> {exp.location === '' ? null : (<span> {exp.location} </span>)} </p>
            <p> {exp.desc === '' ? null : (<span> {exp.desc} </span>)}</p> 
          </li>

      ))
    return (
      <div> 
        {expItems}
      </div>
    )
  }
}
