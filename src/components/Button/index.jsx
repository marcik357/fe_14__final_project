// import PropTypes from 'prop-types';
/* eslint-disable react/prop-types */

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

// Button.propTypes = {
//   onClick: PropTypes.func.isRequired,
//   className: PropTypes.string.isRequired,
//   text: PropTypes.string.isRequired,
// };