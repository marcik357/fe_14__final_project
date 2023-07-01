import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { ArrowRight, Basket } from '../Icons';

function MenuLink(props) {
	const { classItem, page, isActive, classActive, closeBurgerMenu, text, isDesktop, icon } = props;

	return (
		<>
			<li className={classItem}>
				<NavLink to={page} className={isActive ? classActive : ''} onClick={!isDesktop ? closeBurgerMenu : null}>
					{icon && isDesktop ? (
						icon.type === Basket ? (
							React.cloneElement(icon, {fill: isActive ? '#686A6C' : 'none'})
						) : (
							icon
						)
					) : (
						<>
							<span>{text}</span>
							{!isDesktop ? <ArrowRight /> : null}
						</>
					)}
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
	isDesktop: PropTypes.bool,
	icon: PropTypes.element,
};

MenuLink.defaultProps = {
	classItem: '',
	page: '',
	isActive: false,
	classActive: '',
	closeBurgerMenu: null,
	text: '',
	isDesktop: false,
	icon: null
};

export default MenuLink;