import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import '../css/postform.css';  

const TextAreaFieldGroup = ({
    name,
    placeholder,
    value,
    error,
    info,
    onChange,
    

}) => {
  return (
     
       <div className="form-group">
            <textarea
             className={classnames('form-control post-form-area', {
                'is-invalid': error, 
            })}
            placeholder={placeholder}  
            name={name}
            value={value}
            onChange={onChange}
             />
            {info && <small> {info} </small> }
            {error && (<span className="err-shown">{error}</span>)}  
        </div>
  )
} 


TextAreaFieldGroup.propTypes = { 
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    info: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired
}


export default TextAreaFieldGroup;