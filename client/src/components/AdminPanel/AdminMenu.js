import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminMenu = () => {
  const navLinks = [
    {
      to: '/admin-panel/manage-users',
      label: 'Пользователи',
      exact: true,
    },
    {
      to: '/admin-panel/manage-specs',
      label: 'Нарпавления подготовки',
      exact: true,
    },
    {
      to: '/admin-panel/manage-college',
      label: 'Колледж',
      exact: true,
    },
    {
      to: '/admin-panel/manage-edu',
      label: 'Образование',
      exact: true,
    },
  ];

  function renderMenu(navLinks) {
    return navLinks.map((link, index) => (
      <li key={index}>
        <NavLink to={link.to} exact={link.exact} className={`account-menu__link`}>
          {link.label}
        </NavLink>
      </li>
    ));
  }

  return <ul>{renderMenu(navLinks)}</ul>;
};

export default AdminMenu;
