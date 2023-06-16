import PropTypes from 'prop-types';

export function Button(props) {
  const { type = 'button', onClick, className, text } = props;
  return (
    <button type={type} onClick={onClick} className={className}>
      {text}
    </button>
  )
}

Button.propTypes = {
    type: PropTypes.string,
    onClick: PropTypes.func,
    className: PropTypes.string,
    text: PropTypes.string
};