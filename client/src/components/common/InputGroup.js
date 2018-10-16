import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';  
import '../profiles/profile.css';

const InputGroup = ({
    name,
    placeholder,
    value,
    error,
    icon,
    type,
    onChange,

}) => {
  return (
       <div className="input-group">
        <div className="prepend">
            <span className="group-text">
                <i className={icon}></i>
            </span>
        </div>
            <input
             className={classnames('profile-social-input', {
                'is-invalid': error
            })}
            placeholder={placeholder}  
            name={name} 
            value={value}
            onChange={onChange}
             />
           
            {error && (<span className="err-shown">{error}</span>)}  
        </div>
  )
}
InputGroup.propTypes = { 
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    icon: PropTypes.string,
    type: PropTypes.string.isRequired,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired
};
InputGroup.defaultProps = {
    type: 'text'
}


export default InputGroup;