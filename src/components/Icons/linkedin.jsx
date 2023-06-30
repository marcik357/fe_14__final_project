import PropTypes from 'prop-types';

export function Linkedin({ width = 24, height = 24, color = '#686A6C' }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 3.00006C7.02939 3.00006 2.99995 7.0295 2.99996 12.0001C2.99996 16.9706 7.02939 21.0001 12 21.0001C16.9705 21.0001 21 16.9706 21 12.0001C21 7.0295 16.9705 3.00006 12 3.00006Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.47054 11.6045V15.5001M11.4823 10.0463V15.5001M15.9999 15.5001C15.9999 15.5001 15.9999 13.0069 15.9999 11.6045C15.9999 9.26717 12.8376 9.50091 11.4823 11.2929"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.49995 9.50006C8.7761 9.50006 8.99995 9.2762 8.99995 9.00006C8.99995 8.72392 8.7761 8.50006 8.49995 8.50006C8.22381 8.50006 7.99995 8.72392 7.99995 9.00006C7.99995 9.2762 8.22381 9.50006 8.49995 9.50006Z"
        fill={color}
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

Linkedin.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
};
 
Linkedin.defaultProps = {
  width: 24,
  height: 24,
  color: '#686A6C',
};
