import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';

const Header = (props) => {
  const [isMobileMenuOpen, setMobileMenu] = React.useState(false);
  const [selectedDropdownMenu, setSelectedDropdownMenu] = React.useState(-1);
  const auth = React.useContext(AuthContext);
  const history = useHistory();
  const navLinks = [
    {
      id: 1,
      selected: false,
      to: '/',
      label: 'Колледж',
      exact: true,
      submenu: [
        {
          to: '/',
          label: 'Структура и органы управления образовательной организацией',
          exact: true,
        },
        { to: '/', label: 'Заказать справку об обучении', exact: true },
        { to: '/', label: 'Документы', exact: true },
        { to: '/', label: 'Стипендии', exact: true },
        { to: '/', label: 'Галерея', exact: true },
      ],
    },
    {
      id: 2,
      selected: false,
      to: '/',
      label: 'Образование',
      exact: true,
      submenu: [
        {
          to: '/',
          label: 'Структура и органы управления образовательной организацией',
          exact: true,
        },
        { to: '/', label: 'Образовательные программы', exact: true },
        { to: '/', label: 'Педагогический состав', exact: true },
        { to: '/', label: 'Платные образовательные услуги', exact: true },
        { to: '/', label: 'Вакантные места для перевода', exact: true },
        { to: '/', label: 'Дополнительное образование', exact: true },
        { to: '/', label: 'Дистанционное образование', exact: true },
        { to: '/', label: 'Расписание занятий', exact: true },
        { to: '/', label: 'Образовательные стандарты', exact: true },
      ],
    },
    {
      id: 3,
      selected: false,
      to: '/',
      label: 'Поступление',
      exact: true,
      submenu: [
        {
          to: '/',
          label: 'Структура и органы управления образовательной организацией',
          exact: true,
        },
        { to: '/', label: 'Заказать справку об обучении', exact: true },
        { to: '/', label: 'Документы', exact: true },
        { to: '/', label: 'Стипендии', exact: true },
        { to: '/', label: 'Галерея', exact: true },
      ],
    },
    { id: 4, selected: false, to: '/', label: 'Новости', exact: true, submenu: null },
  ];

  const hamburgerClickHanlder = () => {
    setMobileMenu(!isMobileMenuOpen);
  };

  const dropdownMenuClickHandler = (navLinkIndex) => {
    if (navLinks[navLinkIndex].submenu && selectedDropdownMenu !== navLinkIndex) {
      setSelectedDropdownMenu(navLinkIndex);
    } else if (selectedDropdownMenu === navLinkIndex) {
      setSelectedDropdownMenu(-1);
    }
  };

  const logoutHandler = (event) => {
    event.preventDefault();
    auth.logout();
    history.push('/');
  };

  function renderNavLinks(links) {
    return links.map((link, index) => (
      <li key={index + link.to}>
        <div
          className={`header-nav__menu-item  ${
            selectedDropdownMenu === index ? 'header-nav__menu-item_active' : ''
          }`}>
          <a
            onClick={() => dropdownMenuClickHandler(index)}
            className="header-nav__menu-link"
            href="#">
            {link.label}
            {link.submenu && <i className="fi-rr-angle-small-down"></i>}
          </a>
          <div className="header-nav__dropdown-munu-arrow"></div>
          {link.submenu && (
            <div
              className={`header-nav__dropdown-menu ${
                selectedDropdownMenu === index ? 'header-nav__dropdown-menu_active' : ''
              }`}>
              <ul className="header-nav__dropdown-list">
                {link.submenu.map((submenuLink, subIndex) => (
                  <li key={index + ' ' + subIndex + link.to}>
                    <a className="header-nav__dropdown-link" href="#">
                      {submenuLink.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </li>
    ));
  }

  return (
    <header className={`header ${(props.style === 2 || props.style === 3) && 'header_solid-fill'}`}>
      <div className="header__header-top header-top">
        <div className="wrapper header-top__wrapper">
          <div className="header-top__contacts">
            <a className="header-top__phone" href="tel:74955556677">
              <i className="fi-rr-smartphone"></i>
              <span>8 495 555 66 77</span>
            </a>
            <a className="header-top__mail" href="mailto:info@pk8.ru">
              <i className="fi-rr-envelope"></i>
              <span>info@pk8.ru</span>
            </a>
          </div>
          <div className="header-top__login">
            {auth.isAuthenticated ? (
              <>
                <a onClick={logoutHandler} href="/">
                  Выйти
                </a>
                <NavLink to="/account">Личный кабинет</NavLink>
                <NavLink to="/manage-posts">админка</NavLink>
              </>
            ) : (
              <NavLink to="/auth">Войти</NavLink>
            )}
          </div>
        </div>
      </div>
      <div className={`wrapper ${props.style === 1 && 'header__bg sh-bg'}`}>
        <div className="header__header-nav header-nav">
          <div className="header-nav__logo">
            <a href="/">
              <img src={props.logo} alt="logo" />
            </a>
          </div>
          <div className={`header-nav__menu ${isMobileMenuOpen && 'header-nav__menu_active'}`}>
            <ul className="header-nav__menu-list">{renderNavLinks(navLinks)}</ul>
          </div>
          <div onClick={hamburgerClickHanlder} className="hamburger header-nav__hamburger">
            <span className="hamburger__outer">
              <span
                className={`hamburger__inner hamburger__inner_${
                  isMobileMenuOpen && 'active'
                }`}></span>
            </span>
          </div>
        </div>
        {props.style === 1 ? (
          <div className="header__content">
            <h1 className="header__title">
              Откройте свои карьерные <span className="sh-accent-font">возможности</span> с нами
            </h1>
            <p className="header__text sh-mt-30">
              Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает
              сосредоточиться Lorem Ipsum используют потому, что тот обеспечивает более или менее
              стандартное заполнение шаблона.
            </p>
            <div className="sh-button header__button sh-mt-30">
              <a href="#">
                Узнать больше <i className="fi-rr-arrow-right"></i>
              </a>
            </div>
          </div>
        ) : null}
        {props.style === 2 ? (
          <div className="header__content header__content_center">
            <h1 className="header__title header__title_center">{props.title && props.title}</h1>
          </div>
        ) : null}
        {props.style === 3 ? (
          <div className="header__content header__content_left">
            <div className="header__subtitle">{props.subtitle && props.subtitle}</div>
            <h1 className="header__title header__title_left header__title_small">
              {props.title && props.title}
            </h1>
          </div>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
