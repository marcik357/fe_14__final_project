import PropTypes from 'prop-types';

function Button({
  onClick, className, type, text, children,
}) {
  return (
    <button
      onClick={onClick}
      className={className}
      // eslint-disable-next-line react/button-has-type
      type={type}
    >
      {text}
      {children}
    </button>
  );
}

Button.defaultProps = {
  type: 'button',
  className: '',
  text: '',
  children: null,
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  text: PropTypes.string,
  children: PropTypes.node,
};

export default Button;