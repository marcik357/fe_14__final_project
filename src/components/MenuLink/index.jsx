import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { ArrowRight } from '../Icons';

function MenuLink(props) {
  const { classItem, page, isActive, classActive, closeBurgerMenu, text, isDesktop } = props;

  return (
    <>
      <li className={classItem}>
        <NavLink to={page} className={isActive ? classActive : ''} onClick={closeBurgerMenu}>
          <span>{text}</span>
          {!isDesktop ? <ArrowRight /> : null}
        </NavLink>
      </li>
    </>
  );
}

MenuLink.propTypes = {
  classItem: PropTypes.string,
  page: PropTypes.string,
  isActive: PropTypes.bool,
  classActive: PropTypes.string,
  closeBurgerMenu: PropTypes.func,
  text: PropTypes.string,
  isDesktop: PropTypes.bool
};

MenuLink.defaultProps = {
  classItem: '',
  page: '',
  isActive: false,
  classActive: '',
  closeBurgerMenu: null,
  text: '',
  isDesktop: false
};

export default MenuLink;