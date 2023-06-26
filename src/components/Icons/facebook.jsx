import PropTypes from 'prop-types';

export function Facebook({ width = 24, height = 24, color = '#686A6C' }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 12.5295C21 18.5001 19 21.0001 12 21.0001C5 21.0001 3 19.0001 3 12.0001C3 5.50006 5 3.00006 12 3.00006C19.5 3.00006 21 5.50006 21 12.5295Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 11.5001H14"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 16.5001C12 16.5001 12 12.7392 12 10.3696C12 8.00006 12.5 7.50006 14.5 7.50006"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

Facebook.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
};
 
Facebook.defaultProps = {
  width: 24,
  height: 24,
  color: '#686A6C',
};
