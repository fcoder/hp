import './form-input.styles.scss';

// Caller sign-up-form.jsx passes label, type, required, onChange, name and value to this component
const FormInput = ({ label, ...otherProps }) => { // otherProps: type, required, conChange, name, value
  return (
    <div className='group'>
      <input className='form-input' {...otherProps} />
      {label && (
        <label            // non null length means user has typed something
          className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default FormInput;
