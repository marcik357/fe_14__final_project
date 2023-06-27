import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

function MenuLink(props) {
  const { classItem, page, isActive, classActive, closeBurgerMenu, isDesktop, icon } = props;

  return (
    <>
      <li className={classItem}>
        <NavLink to={page} className={isActive ? classActive : ''} onClick={closeBurgerMenu}>
          <span>store</span>
          {!isDesktop ? icon : null}
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
  isDesktop: PropTypes.bool,
  icon: PropTypes.element
};

MenuLink.defaultProps = {
  classItem: '',
  page: '',
  isActive: false,
  classActive: '',
  closeBurgerMenu: null,
  isDesktop: false,
  icon: null
};

export default MenuLink;