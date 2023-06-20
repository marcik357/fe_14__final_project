import PropTypes from 'prop-types';

export function Instagram({ width = 24, height = 24, color = '#686A6C' }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 15.5001C13.933 15.5001 15.5 13.9331 15.5 12.0001C15.5 10.0671 13.933 8.50006 12 8.50006C10.067 8.50006 8.5 10.0671 8.5 12.0001C8.5 13.9331 10.067 15.5001 12 15.5001Z"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 12.5295C21 18.5001 19 21.0001 12 21.0001C5 21.0001 3 19.0001 3 12.0001C3 5.50006 5 3.00006 12 3.00006C19.5 3.00006 21 5.50006 21 12.5295Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.5 7.50006C16.7761 7.50006 17 7.2762 17 7.00006C17 6.72392 16.7761 6.50006 16.5 6.50006C16.2239 6.50006 16 6.72392 16 7.00006C16 7.2762 16.2239 7.50006 16.5 7.50006Z"
        fill={color}
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

Instagram.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
};
 
Instagram.defaultProps = {
  width: 24,
  height: 24,
  color: '#686A6C',
};