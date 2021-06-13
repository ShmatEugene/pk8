import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminMenu = () => {
  const [isMobileMenuOpen, setMobileMenu] = React.useState(false);

  const navLinks = [
    {
      to: '/admin-panel/manage-news',
      label: 'Новости',
      exact: true,
    },
    // {
    //   to: '/admin-panel/manage-users',
    //   label: 'Пользователи',
    //   exact: true,
    // },
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
    {
      to: '/admin-panel/manage-abit',
      label: 'Поступающим',
      exact: true,
    },
    {
      to: '/admin-panel/manage-documents',
      label: 'Документы',
      exact: true,
    },
    {
      to: '/admin-panel/manage-workers',
      label: 'Сотрудники',
      exact: true,
    },
  ];

  const hamburgerClickHanlder = () => {
    setMobileMenu(!isMobileMenuOpen);
  };

  function renderMenu(navLinks) {
    return navLinks.map((link, index) => (
      <li key={index}>
        <NavLink to={link.to} exact={link.exact} className={`account-menu__link`}>
          {link.label}
        </NavLink>
      </li>
    ));
  }

  return (
    <div
      className={`account-layout__account-menu account-menu ${
        isMobileMenuOpen && 'account-menu_active'
      }`}>
      <div
        onClick={hamburgerClickHanlder}
        className="hamburger account-menu__hamburger hamburger_white">
        <span className="hamburger__outer">
          <span
            className={`hamburger__inner hamburger__inner_${isMobileMenuOpen && 'active'}`}></span>
        </span>
      </div>
      <nav className="account-menu__nav">
        <ul>{renderMenu(navLinks)}</ul>
      </nav>
    </div>
  );
};

export default AdminMenu;
