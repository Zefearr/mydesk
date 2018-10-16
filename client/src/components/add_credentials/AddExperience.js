import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup  from '../common/TextFieldGroup';
import  TextAreaFieldGroup  from '../common/TextAreaFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExperience } from '../../actions/profileActions';


 class AddExperience extends Component {
     constructor(props) {
        super(props);
        this.state = {
            company: '',
            title: '',
            location: '',
            from: '',
            to: '',
            current: false,
            description: '',
            errors: {},
            disabled: false
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCheck = this.onCheck.bind(this);
       
     }
     onChange(e) {
       this.setState({[e.target.name]: e.target.value})
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }
    onSubmit(e) {
            e.preventDefault();
          const expData = {
              company: this.state.company,
              title: this.state.title,
              location: this.state.location,
              from: this.state.from,
              to: this.state.to,
              current: this.state.current,
              description: this.state.description
          }
          this.props.addExperience(expData, this.props.history)
    }
    onCheck(e) {
        this.setState({
            disabled: !this.state.disabled,
            current: !this.state.current
        })
    }
  render() {
      const errors = this.state.errors;
    return (
      <div className="add-exp">
        <Link to="/dashboard"> Back </Link>
        <h1>Add experience</h1> 
        <form onSubmit={this.onSubmit}>
        <TextFieldGroup
          placeholder="* Company"
          name="company"
          value={this.state.company}
          onChange={this.onChange}
          error={errors.company}
        />
          <TextFieldGroup
          placeholder="* title"
          name="title"
          value={this.state.title} 
          onChange={this.onChange}
          error={errors.title}
        />
            <TextFieldGroup
          placeholder="location"
          name="location"
          value={this.state.location}
          onChange={this.onChange}
          error={errors.location}
        />
        <TextFieldGroup
          placeholder="from date"
          name="from"
          type="date"
          value={this.state.from}
          onChange={this.onChange}
          error={errors.from}
        />
         <TextFieldGroup
          placeholder="to date"
          name="to"
          type="date"
          value={this.state.to}
          onChange={this.onChange}
          error={errors.to}
          disabled={this.state.disabled ? 'disabled' : ''}
        />
        <div className="form-check">
            <input name="current" className="check-input" type="checkbox" value={this.state.current} checked={this.state.current} onChange={this.onCheck} id="current"/>
            <label htmlFor="current">Current job</label>
        </div>
        <TextAreaFieldGroup
          placeholder="description"
          name="description"
          type="text"
          value={this.state.description}
          onChange={this.onChange}
          error={errors.description}
        />
        <input type="submit" value="submit" placeholder="submit"/>
        </form>
      </div>
    )
  }
}

AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});
export default connect(mapStateToProps, {addExperience})(withRouter(AddExperience)); 
