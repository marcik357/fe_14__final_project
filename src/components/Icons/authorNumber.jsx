function AuthorNumber({ className }) {
  return (
    <>
      <svg
        className={className}
        width='52'
        height='54'
        viewBox='0 0 52 54'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g id='Polygon 1' filter='url(#filter0_d_873_26755)'>
          <path
            d='M22 1.3094C24.4752 -0.119662 27.5248 -0.119662 30 1.3094L39.3205 6.6906C41.7957 8.11966 43.3205 10.7607 43.3205 13.6188V24.3812C43.3205 27.2393 41.7957 29.8803 39.3205 31.3094L30 36.6906C27.5248 38.1197 24.4752 38.1197 22 36.6906L12.6795 31.3094C10.2043 29.8803 8.67949 27.2393 8.67949 24.3812V13.6188C8.67949 10.7607 10.2043 8.11966 12.6795 6.6906L22 1.3094Z'
            fill='#F7FBFA'
          />
        </g>
        <defs>
          <filter
            id='filter0_d_873_26755'
            x='0.679688'
            y='0.237305'
            width='50.6406'
            height='53.5254'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
              result='hardAlpha'
            />
            <feOffset dy='8' />
            <feGaussianBlur stdDeviation='4' />
            <feComposite in2='hardAlpha' operator='out' />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0'
            />
            <feBlend
              mode='multiply'
              in2='BackgroundImageFix'
              result='effect1_dropShadow_873_26755'
            />
            <feBlend
              mode='normal'
              in='SourceGraphic'
              in2='effect1_dropShadow_873_26755'
              result='shape'
            />
          </filter>
        </defs>
      </svg>
    </>
  );
}
export default AuthorNumber;
