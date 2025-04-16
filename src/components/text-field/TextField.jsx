import PropTypes from 'prop-types';
import './TextField.scss';


const TextField = ({
  className, label, onChange, type = 'text',
}) => (
  <div className={`${className ? className : ''} text-field-component`}>
    <p>{label}</p>
    <input type={type} onChange={onChange} className="text-field-input" />
  </div>
);

TextField.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  type: PropTypes.oneOf(['text, password']),
};

export {
  TextField,
};
