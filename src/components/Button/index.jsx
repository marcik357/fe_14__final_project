import PropTypes from 'prop-types';

export function Button(props) {
  const {
    onClick, className, text,
  } = props;
  return (
    <button type="button" onClick={onClick} className={className}>
      {text}
    </button>
  );
}

Button.defaultProps = {
  onClick: () => {},
  className: '',
  text: '',
};

Button.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  text: PropTypes.string,
};