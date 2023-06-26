import PropTypes from 'prop-types';

export function Verified({ width, height }) {
  return (
    <svg version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 24 24" style={{ enableBackground: 'new 0 0 24 24' }}
      width={width}
      height={height}>
      <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="-248.6683" y1="459.195" x2="-248.6683" y2="461.4416" gradientTransform="matrix(6.893169e-16 11.2574 10.3923 -6.363448e-16 -4771.7222 2811.3589)">
        <stop offset="6.173630e-02" style={{ stopColor: '#FFE249' }} />
        <stop offset="0.217" style={{ stopColor: '#F35950' }} />
        <stop offset="0.4417" style={{ stopColor: '#7C5BFF' }} />
        <stop offset="0.562" style={{ stopColor: '#1CE4FF' }} />
        <stop offset="0.9482" style={{ stopColor: '#5FFF5C' }} />
      </linearGradient>
      <path className="st0"
        fillRule="evenodd"
        clipRule="evenodd"
        fill="url(#SVGID_1_)"
        d="M14.4,1.4c-1.5-0.9-3.3-0.9-4.8,0L4,4.6C2.5,5.5,1.6,7.1,1.6,8.8v6.5c0,1.7,0.9,3.3,2.4,4.2l5.6,3.2
     c1.5,0.9,3.3,0.9,4.8,0l5.6-3.2c1.5-0.9,2.4-2.4,2.4-4.2V8.8c0-1.7-0.9-3.3-2.4-4.2L14.4,1.4z M12,18c3.3,0,6-2.7,6-6s-2.7-6-6-6
     c-3.3,0-6,2.7-6,6S8.7,18,12,18z"/>
      <circle className="st1" cx="12" cy="12" r="3.6" />
    </svg>
  );
}

Verified.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};

Verified.defaultProps = {
  width: 24,
  height: 24,
};