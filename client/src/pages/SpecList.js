import React from 'react';
import logo from '../assets/img/logo.png';

const SpecList = () => {
  return (
    <>
      {/* Header */}
      <header className="header header_solid-fill">
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
        <div className="wrapper">
          <div className="header__header-nav header-nav">
            <div className="header-nav__logo">
              <a href="/">
                <img src={logo} alt="logo" />
              </a>
            </div>
            <div className="header-nav__menu">
              <ul className="header-nav__menu-list">
                <li>
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
                </li>
              </ul>
            </div>
          </div>
          <div className="header__content header__content_center">
            <h1 className="header__title header__title_center">Контакты приемной комиссии</h1>
          </div>
        </div>
      </header>

      {/* SPECIALITIES LIST */}
      <main>
        <div className="wrapper">
          <div className="wrapper__specialities-page specialities-page">
            <div className="search-block specialities-page__search-block">
              <div className="search-block__sort">
                Укрупненная группа <i className="fi-rr-angle-small-down"></i>
              </div>
              <div className="search-block__sort sort">
                После 11 классов <i className="fi-rr-angle-small-down"></i>
                <div className="sort__popup">
                  <ul className="sort__list">
                    <li>После 9 классов</li>
                    <li>После 9 классов</li>
                    <li>После 11 классов</li>
                  </ul>
                </div>
              </div>
              <input
                placeholder="Искать по названию"
                className="search-block__search-field"
                type="text"
              />
              <i className="search-block__search-icon fi-rr-search"></i>
            </div>
            <div className="specialities-page__specialties-list specialties-list">
              <div className="specialties-list__item">
                <div className="specialties-list__code">15.01.03</div>
                <h3 className="specialties-list__title">
                  Оснащение средствами автоматизации технологических процессов и производств (по
                  отраслям)
                </h3>
                <a className="specialties-list__link" href="#">
                  подробнее
                </a>
              </div>
              <div className="specialties-list__item">
                <div className="specialties-list__code">09.03.02</div>
                <h3 className="specialties-list__title">Прикладная информатика</h3>
                <a className="specialties-list__link" href="#">
                  подробнее
                </a>
              </div>
              <div className="specialties-list__item">
                <div className="specialties-list__code">15.01.03</div>
                <h3 className="specialties-list__title">
                  Оснащение средствами автоматизации информатика
                </h3>
                <a className="specialties-list__link" href="#">
                  подробнее
                </a>
              </div>
              <div className="specialties-list__item">
                <div className="specialties-list__code">09.03.02</div>
                <h3 className="specialties-list__title">Прикладная информатика</h3>
                <a className="specialties-list__link" href="#">
                  подробнее
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer overview-block-pt">
        <div className="wrapper footer__wrappper">
          <div className="footer__callback callback">
            <h3 className="callback__title">
              Остались вопросы? Заполните форму и специалист из приемной комиссии свяжется в вами.
            </h3>
            <form className="callback__form" action="#">
              <input className="callback__input" type="text" placeholder="введите номер телефона" />
              <button className="callback__button" type="submit">
                Отправить
              </button>
            </form>
          </div>
          <div className="footer__content">
            <div className="footer__info">
              <div className="footer__logo">
                <img src={logo} alt="logo" />
              </div>
              <p className="footer__text">
                Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает
                сосредоточиться Lorem Ipsum используют потому, что тот обеспечивает более или менее
                стандартное заполнение шаблона.
              </p>
              <div className="footer__social"></div>
            </div>
            <div className="footer__contacts">
              <h3>Контакты</h3>
              <div className="footer__personal-contacts-list">
                <div className="footer__personal-contacts">
                  <h4>Директор</h4>
                  <ul>
                    <li>Трофимов Андрей Николаевич </li>
                    <li>TrofimovAN@edu.mos.ru</li>
                    <li>+7 (495) 640-60-58</li>
                    <li>Добавочный: 201</li>
                  </ul>
                </div>
                <div className="footer__personal-contacts">
                  <h4>Директор</h4>
                  <ul>
                    <li>Кирюшина Татьяна Викторовна</li>
                    <li>+7 (495) 640-60-58</li>
                    <li>Добавочный: 201</li>
                  </ul>
                </div>
              </div>
              <div className="footer__general-contacts">
                <ul>
                  <li>
                    <i className="fi-rr-marker"></i>
                    <span>125284, город Москва, 1-й Боткинский проезд, дом 7А</span>
                  </li>
                  <li>
                    <i className="fi-rr-envelope"></i>
                    <span>spo-8@edu.mos.ru</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer__nav">
            <div className="footer__nav-column">
              <h3>Колледж</h3>
              <ul className="footer__nav-list">
                <li>
                  <a href="#">Структура и органы управления образовательной организацией</a>
                </li>
                <li>
                  <a href="#">Заказать справку об обучении</a>
                </li>
                <li>
                  <a href="#">Документы</a>
                </li>
                <li>
                  <a href="#">Стипендии</a>
                </li>
                <li>
                  <a href="#">Галерея</a>
                </li>
              </ul>
            </div>
            <div className="footer__nav-column">
              <h3>Образование</h3>
              <ul className="footer__nav-list">
                <li>
                  <a href="#">Структура и органы управления образовательной организацией</a>
                </li>
                <li>
                  <a href="#">Заказать справку об обучении</a>
                </li>
                <li>
                  <a href="#">Документы</a>
                </li>
                <li>
                  <a href="#">Стипендии</a>
                </li>
                <li>
                  <a href="#">Галерея</a>
                </li>
              </ul>
            </div>
            <div className="footer__nav-column">
              <h3>Поступление</h3>
              <ul className="footer__nav-list">
                <li>
                  <a href="#">Структура и органы управления образовательной организацией</a>
                </li>
                <li>
                  <a href="#">Заказать справку об обучении</a>
                </li>
                <li>
                  <a href="#">Документы</a>
                </li>
                <li>
                  <a href="#">Стипендии</a>
                </li>
                <li>
                  <a href="#">Галерея</a>
                </li>
              </ul>
            </div>
            <div className="footer__nav-column">
              <h3>Новости</h3>
              <ul className="footer__nav-list">
                <li>
                  <a href="#">Структура и органы управления образовательной организацией</a>
                </li>
                <li>
                  <a href="#">Заказать справку об обучении</a>
                </li>
                <li>
                  <a href="#">Документы</a>
                </li>
                <li>
                  <a href="#">Стипендии</a>
                </li>
                <li>
                  <a href="#">Галерея</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer__bottom-footer bottom-footer wrapper-fw">
          <div className="wrapper bottom-footer__wrapper">
            <div className="bottom-footer__contacts">
              <span>© Все права защищены</span>
            </div>
            <div className="bottom-footer__contacts">
              <a className="bottom-footer__phone" href="tel:74955556677">
                <i className="fi-rr-smartphone"></i>
                <span>8 495 555 66 77</span>
              </a>
              <a className="bottom-footer__mail" href="mailto:info@pk8.ru">
                <i className="fi-rr-envelope"></i>
                <span>info@pk8.ru</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default SpecList;
