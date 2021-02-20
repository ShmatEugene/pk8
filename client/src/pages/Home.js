import React from 'react';
import logo from '../assets/img/logo.png';
import news from '../assets/img/news.jpg';

const Home = () => {
  return (
    <>
      {/* Home Header */}
      <header className="header">
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
        <div className="header__bg wrapper sh-bg">
          <div className="header__header-nav header-nav">
            <div className="header-nav__logo">
              <a href="/">
                <img src={logo} alt="logo" />
              </a>
            </div>
            <div className="header-nav__menu">
              <ul>
                <li>
                  <a href="#">
                    Колледж <i className="fi-rr-angle-small-down"></i>
                  </a>
                  <a href="#">
                    Образование <i className="fi-rr-angle-small-down"></i>
                  </a>
                  <a href="#">
                    Поступление <i className="fi-rr-angle-small-down"></i>
                  </a>
                  <a href="#">Новости</a>
                </li>
              </ul>
            </div>
            <div className="header-nav__dropdown-menu trans-05">
              <div className="header-nav__dropdown-column">
                <h3>Колледж</h3>
                <ul className="header-nav__dropdown-list">
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
              <div className="header-nav__dropdown-column">
                <h3>Образование</h3>
                <ul className="header-nav__dropdown-list">
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
              <div className="header-nav__dropdown-column">
                <h3>Поступление</h3>
                <ul className="header-nav__dropdown-list">
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
              <div className="header-nav__dropdown-column">
                <h3>Новости</h3>
                <ul className="header-nav__dropdown-list">
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
        </div>
      </header>
      <main>
        {/* countdown */}
        <section className="countdown wrapper-fw sh-bg">
          <div className="wrapper">
            <div className="countdown__inner">
              <h2 className="countdown__header">18 апреля пройдет день открытых дверей</h2>
              <div className="countdown__location">
                <i className="fi-rr-marker"></i>
                город Москва, 1-й Боткинский проезд, дом 7А
              </div>
              <div className="countdown__timer">
                <div className="countdown__item">
                  <div className="countdown__counter">12</div>
                  <div className="countdown__label">Дней</div>
                </div>
                <div className="countdown__item">
                  <div className="countdown__counter">14</div>
                  <div className="countdown__label">Часов</div>
                </div>
                <div className="countdown__item">
                  <div className="countdown__counter">36</div>
                  <div className="countdown__label">Минут</div>
                </div>
                <div className="countdown__item">
                  <div className="countdown__counter">54</div>
                  <div className="countdown__label">Секунд</div>
                </div>
              </div>
              <div className="countdown__date">12:00 16 апреля, 2021</div>
            </div>
          </div>
        </section>
        {/* advantages */}
        <section className="advantages wrapper overview-block-pt">
          <div className="title title_center advantages__title">
            <h2>
              Причины поступать
              <br /> в Политехнический колледж № 8
            </h2>
            <p className="title__subtitle">4 основные причины выбрать Политехнический колледж №8</p>
          </div>
          <div className="advantages__list">
            <div className="advantages__advantage advantage">
              <div className="advantage__icon">
                <i className="fi-rr-e-learning"></i>
              </div>
              <div className="advantage__content">
                <h3 className="advantage__title">Cовременные методы обучения</h3>
                <p className="advantage__text">
                  Научно-исследовательская и проектная деятельность с первого курса
                </p>
              </div>
            </div>
            <div className="advantages__advantage advantage">
              <div className="advantage__icon">
                <i className="fi-rr-graduation-cap"></i>
              </div>
              <div className="advantage__content">
                <h3 className="advantage__title">
                  Высококвалифицированный педагогический коллектив
                </h3>
                <p className="advantage__text">
                  Научно-исследовательская и проектная деятельность с первого курса
                </p>
              </div>
            </div>
            <div className="advantages__advantage advantage">
              <div className="advantage__icon">
                <i className="fi-rr-test"></i>
              </div>
              <div className="advantage__content">
                <h3 className="advantage__title">Профессиональные курсы</h3>
                <p className="advantage__text">
                  Научно-исследовательская и проектная деятельность с первого курса
                </p>
              </div>
            </div>
            <div className="advantages__advantage advantage">
              <div className="advantage__icon">
                <i className="fi-rr-users"></i>
              </div>
              <div className="advantage__content">
                <h3 className="advantage__title">Яркая и активная студенческая жизнь</h3>
                <p className="advantage__text">
                  Научно-исследовательская и проектная деятельность с первого курса
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Message */}
        <section className="message overview-block-pt wrapper-fw">
          <div className="message__bg">
            <div className="wrapper message__wrapper">
              <div className="title title_left message__title">
                <h2>Обращение руководителя</h2>
                <p className="title__subtitle">Трофимов А. Н.</p>
              </div>
              <p className="message__text">
                Мы рады приветствовать на сайте Государственного автономного профессионального
                образовательного учреждения города Москвы «Политехнический колледж № 8 имени дважды
                Героя Советского Союза И.Ф.Павлова» всех, кто интересуется качественным
                образованием, кому небезразлично, где и чему будут учиться его дети, а также тех,
                кто желает повысить уровень своей квалификации.
              </p>
              <p className="message__text">
                История развития нашего колледжа неразрывно связана с информационным и
                технологическим развитием страны. Стремительно менялась жизнь, и в соответствии с ее
                требованиями изменялся перечень профессий и специальностей – Политехнический колледж
                № 8 неизменно готовил специалистов, необходимых отечественной экономике
              </p>
              <div className="sh-button message__button sh-mt-30">
                <a href="#">
                  Читать полностью <i className="fi-rr-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </section>
        {/* Message */}
        <section className="home-specialties wrapper overview-block-pt">
          <div className="title title_center home-specialties__title">
            <h2>Направления подготовки</h2>
            <p className="title__subtitle">
              В колледже реализуются 24 программы среднего профессионального образования
            </p>
          </div>
          <div className="homes-specialties__specialties-list specialties-list">
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
          <div className="home-specialties__button-block">
            <div className="sh-button home-specialties__button sh-mt-30">
              <a href="#">
                Посмотреть все <i className="fi-rr-arrow-right"></i>
              </a>
            </div>
          </div>
        </section>
        {/* Info-block */}
        <section className="info-block wrapper-fw">
          <div className="wrapper info-block__wrapper">
            <div className="info-block__pk">
              <h3 className="info-block__title">Приемная комиссия</h3>
              <ul>
                <li>
                  <a className="info-block__link" href="#">
                    Условия приёма
                  </a>
                </li>
                <li>
                  <a className="info-block__link" href="#">
                    График работы приёмной комиссии
                  </a>
                </li>
                <li>
                  <a className="info-block__link" href="#">
                    Контрольные цифры приёма
                  </a>
                </li>
                <li>
                  <a className="info-block__link" href="#">
                    Количество поданных заявлений
                  </a>
                </li>
                <li>
                  <a className="info-block__link" href="#">
                    Результаты приёма на 2020-2021 учебный год
                  </a>
                </li>
              </ul>
            </div>
            <div className="info-block__edu">
              <h3 className="info-block__title">Образование в ГАПОУ ПК №8</h3>
              <ul>
                <li>
                  <a className="info-block__link" href="#">
                    Условия приёма
                  </a>
                </li>
                <li>
                  <a className="info-block__link" href="#">
                    График работы приёмной комиссии
                  </a>
                </li>
                <li>
                  <a className="info-block__link" href="#">
                    Контрольные цифры приёма
                  </a>
                </li>
                <li>
                  <a className="info-block__link" href="#">
                    Количество поданных заявлений
                  </a>
                </li>
                <li>
                  <a className="info-block__link" href="#">
                    Результаты приёма на 2020-2021 учебный год
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>
        {/* Home-news */}
        <section className="home-news wrapper overview-block-pt">
          <div className="title title_center home-news__title">
            <h2>Новости</h2>
          </div>
          <div className="home-news__news-list news-list">
            <div className="news-list__item">
              <div className="news-list__img">
                <img src={news} alt="news" />
              </div>
              <div className="news-list__content">
                <h3 className="news-list__title">Возобновление дистанционного режима</h3>
                <div className="news-list__date">23 ноября, 2020</div>
                <p className="news-list__text">
                  11.02.2021 года на отделении «Коптевское» прошли интерактивные беседы с
                  обучающимися первого курса на тему: «Закон в обществе».
                </p>
                <a href="#" className="news-list__link">
                  подробнее
                </a>
              </div>
            </div>
            <div className="news-list__item">
              <div className="news-list__img">
                <img src={news} alt="news" />
              </div>
              <div className="news-list__content">
                <h3 className="news-list__title">Возобновление дистанционного режима</h3>
                <div className="news-list__date">23 ноября, 2020</div>
                <p className="news-list__text">
                  11.02.2021 года на отделении «Коптевское» прошли интерактивные беседы с
                  обучающимися первого курса на тему: «Закон в обществе».
                </p>
                <a href="#" className="news-list__link">
                  подробнее
                </a>
              </div>
            </div>
            <div className="news-list__item">
              <div className="news-list__img">
                <img src={news} alt="news" />
              </div>
              <div className="news-list__content">
                <h3 className="news-list__title">Возобновление дистанционного режима</h3>
                <div className="news-list__date">23 ноября, 2020</div>
                <p className="news-list__text">
                  11.02.2021 года на отделении «Коптевское» прошли интерактивные беседы с
                  обучающимися первого курса на тему: «Закон в обществе».
                </p>
                <a href="#" className="news-list__link">
                  подробнее
                </a>
              </div>
            </div>
          </div>
        </section>
        {/* Footer */}
        <footer className="footer overview-block-pt">
          <div className="wrapper footer__wrappper">
            <div className="footer__callback callback">
              <h3 className="callback__title">
                Остались вопросы? Заполните форму и специалист из приемной комиссии свяжется в вами.
              </h3>
              <form className="callback__form" action="#">
                <input
                  className="callback__input"
                  type="text"
                  placeholder="введите номер телефона"
                />
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
                  сосредоточиться Lorem Ipsum используют потому, что тот обеспечивает более или
                  менее стандартное заполнение шаблона.
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
      </main>
    </>
  );
};

export default Home;
