import React from 'react';

const Header = (props) => {
  const navLinks = [
    {
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
      to: '/',
      label: 'Образование',
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
    {
      to: '/',
      label: 'Новости',
      exact: true,
      submenu: null,
    },
  ];

  function renderNavLinks(links) {
    return links.map((link, index) => (
      <li key={index + link.to}>
        <div className="header-nav__menu-item">
          <a className="header-nav__menu-link" href="#">
            {link.label}
            {link.submenu && <i className="fi-rr-angle-small-down"></i>}
          </a>
          <div className="header-nav__dropdown-munu-arrow"></div>
          {link.submenu && (
            <div className="header-nav__dropdown-menu">
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
            <a href="#">Войти</a>
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
          <div className="header-nav__menu">
            <ul className="header-nav__menu-list">
              {renderNavLinks(navLinks)}
              {/* <li>
                <div className="header-nav__menu-item">
                  <a className="header-nav__menu-link" href="#">
                    Колледж <i className="fi-rr-angle-small-down"></i>
                  </a>
                  <div className="header-nav__dropdown-munu-arrow"></div>
                  <div className="header-nav__dropdown-menu">
                    <ul className="header-nav__dropdown-list">
                      <li>
                        <a className="header-nav__dropdown-link" href="#">
                          Структура и органы управления образовательной организацией
                        </a>
                      </li>
                      <li>
                        <a className="header-nav__dropdown-link" href="#">
                          Заказать справку об обучении
                        </a>
                      </li>
                      <li>
                        <a className="header-nav__dropdown-link" href="#">
                          Документы
                        </a>
                      </li>
                      <li>
                        <a className="header-nav__dropdown-link" href="#">
                          Стипендии
                        </a>
                      </li>
                      <li>
                        <a className="header-nav__dropdown-link" href="#">
                          Галерея
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li>
                <div className="header-nav__menu-item">
                  <a className="header-nav__menu-link" href="#">
                    Образование <i className="fi-rr-angle-small-down"></i>
                  </a>
                  <div className="header-nav__dropdown-munu-arrow"></div>
                  <div className="header-nav__dropdown-menu">
                    <ul className="header-nav__dropdown-list">
                      <li>
                        <a className="header-nav__dropdown-link" href="#">
                          Структура и органы управления образовательной организацией
                        </a>
                      </li>
                      <li>
                        <a className="header-nav__dropdown-link" href="#">
                          Заказать справку об обучении
                        </a>
                      </li>
                      <li>
                        <a className="header-nav__dropdown-link" href="#">
                          Документы
                        </a>
                      </li>
                      <li>
                        <a className="header-nav__dropdown-link" href="#">
                          Стипендии
                        </a>
                      </li>
                      <li>
                        <a className="header-nav__dropdown-link" href="#">
                          Галерея
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li>
                <div className="header-nav__menu-item">
                  <a className="header-nav__menu-link" href="#">
                    Поступление <i className="fi-rr-angle-small-down"></i>
                  </a>
                  <div className="header-nav__dropdown-munu-arrow"></div>
                  <div className="header-nav__dropdown-menu">
                    <ul className="header-nav__dropdown-list">
                      <li>
                        <a className="header-nav__dropdown-link" href="#">
                          Структура и органы управления образовательной организацией
                        </a>
                      </li>
                      <li>
                        <a className="header-nav__dropdown-link" href="#">
                          Заказать справку об обучении
                        </a>
                      </li>
                      <li>
                        <a className="header-nav__dropdown-link" href="#">
                          Документы
                        </a>
                      </li>
                      <li>
                        <a className="header-nav__dropdown-link" href="#">
                          Стипендии
                        </a>
                      </li>
                      <li>
                        <a className="header-nav__dropdown-link" href="#">
                          Галерея
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li>
                <div className="header-nav__menu-item">
                  <a className="header-nav__menu-link" href="#">
                    Новости
                  </a>
                </div>
              </li> */}
            </ul>
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
            <h1 className="header__title header__title_center">{props.title}</h1>
          </div>
        ) : null}
        {props.style === 3 ? (
          <div className="header__content header__content_left">
            <div className="header__subtitle">15.03.06</div>
            <h1 className="header__title header__title_left header__title_small">
              Оснащение средствами автоматизации технологических процессов и производств (по
              отраслям)
            </h1>
          </div>
        ) : null}
      </div>
    </header>
  );
};

export default Header;