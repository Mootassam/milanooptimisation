import React from 'react';
import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
import FormErrors from './FormErrors';
import Message from 'src/view/shared/message';

export function InputFormItem(props) {
  const {
    label,
    description,
    name,
    hint,
    type,
    placeholder,
    autoFocus,
    autoComplete,
    required,
    externalErrorMessage,
    disabled,
    endAdornment,
    className,
    iname,
  } = props;

  const {
    register,
    errors,
    formState: { touched, isSubmitted },
  } = useFormContext();


  if(  externalErrorMessage) {
    Message.error(  externalErrorMessage,)
  }
  const errorMessage = FormErrors.errorMessage(
    name,
    errors,
    touched,
    isSubmitted,
  
  );



  return (
    <div className="input-group">
      <div className={endAdornment ? 'input-group' : ''}>
        {Boolean(label) && (
          <label
            className={`${
              required ? 'required' : null
            }`}
            htmlFor={name}
          >
            {label}
          </label>
        )}
        
        <div>
        <div style={{display:'flex', alignItems:'center'}}>

        <i className={iname} />

        
        <input
         className={`${props.className} ${
          errorMessage ? '__danger' : ''
        }`}
          id={name}
          name={name}
          type={type}
          ref={register}
          onChange={(event) => {
            props.onChange &&
              props.onChange(event.target.value);
          }}
          onBlur={(event) => {
            props.onBlur && props.onBlur(event);
          }}
          placeholder={placeholder || undefined}
          autoFocus={autoFocus || undefined}
          autoComplete={autoComplete || undefined}
          disabled={disabled}
        
        />
        </div>
        {endAdornment && (
          <div className="input-group-append">
            <span className="input-group-text">
              {endAdornment}
            </span>
          </div>
        )}
      </div>
      <div className="invalid-feedback">{errorMessage}</div>
      {Boolean(hint) && (
        <small className="form-text text-muted">
          {hint}
        </small>
      )}
    </div>
    </div>
  );
}

InputFormItem.defaultProps = {
  type: 'text',
  required: false,
};

InputFormItem.propTypes = {
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  type: PropTypes.string,
  label: PropTypes.string,
  description: PropTypes.string,
  hint: PropTypes.string,
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  prefix: PropTypes.string,
  placeholder: PropTypes.string,
  autoComplete: PropTypes.string,
  externalErrorMessage: PropTypes.string,
  endAdornment: PropTypes.any,
  onChange: PropTypes.any,
  className : PropTypes.string,
  iname:PropTypes.string,
};

export default InputFormItem;