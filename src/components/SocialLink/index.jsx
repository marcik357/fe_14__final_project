import PropTypes from 'prop-types';

function SocialLink(props) {
  const { classLi, url, classUrl, icon, text } = props;

  return (
    <>
      <li className={classLi}>
        <a href={url} className={classUrl} target="_blank" rel="noreferrer">
          {icon}
          <span>{text}</span>
        </a>
      </li>
    </>
  );
}

SocialLink.propTypes = {
  classLi: PropTypes.string,
  url: PropTypes.string,
  classUrl: PropTypes.string,
  icon: PropTypes.element,
};

SocialLink.defaultProps = {
  classLi: '',
  url: '',
  classUrl: '',
  icon: null,
};

export default SocialLink;