import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/img/logo.png';
import { useHttp } from '../../hooks/http.hook';

const Footer = (props) => {
  const { request, loading } = useHttp();
  const [collegeLinks, setCollegeLinks] = React.useState(null);
  const [eduLinks, setEduLinks] = React.useState(null);
  const [abitLinks, setAbitLinks] = React.useState(null);
  const [newsLinks, setNewsLinks] = React.useState(null);

  const getLinks = React.useCallback(async () => {
    try {
      const fetchedCollegeLinks = await request('/api/college/', 'GET');
      const fetchedEduLinks = await request('/api/edu/', 'GET');
      const fetchedAbitLinks = await request('/api/abit/', 'GET');
      const fetchedNewsLinks = await request('/api/news/', 'GET');

      let links = [];
      fetchedCollegeLinks.forEach((post) => {
        if (post._id && post.title) {
          links.push({
            to: `/college/${post._id}`,
            label: post.title,
          });
        }
      });
      links.push({
        to: `/documents`,
        label: 'Документы',
      });
      setCollegeLinks(links);

      links = [];
      fetchedEduLinks.forEach((post) => {
        if (post._id && post.title) {
          links.push({
            to: `/edu/${post._id}`,
            label: post.title,
          });
        }
      });
      setEduLinks(links);

      links = [];
      fetchedAbitLinks.forEach((post) => {
        if (post._id && post.title) {
          links.push({
            to: `/abit/${post._id}`,
            label: post.title,
          });
        }
      });
      setAbitLinks(links);

      links = [];
      fetchedNewsLinks.forEach((post, index) => {
        if (post._id && post.title && index < 4) {
          links.push({
            to: `/news/${post._id}`,
            label: post.title,
          });
        }
      });
      setNewsLinks(links);
    } catch (e) {
      console.log(e);
    }
  }, [request]);

  React.useEffect(() => {
    getLinks();
  }, [getLinks]);

  function renderLinks(links) {
    return links.map((link, index) => (
      <li key={index}>
        <NavLink to={link.to}>{link.label}</NavLink>
      </li>
    ));
  }

  return (
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
              <img src={props.logo || logo} alt="logo" />
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
            <ul className="footer__nav-list">{collegeLinks ? renderLinks(collegeLinks) : null}</ul>
          </div>
          <div className="footer__nav-column">
            <h3>Образование</h3>
            <ul className="footer__nav-list">{eduLinks && renderLinks(eduLinks)}</ul>
          </div>
          <div className="footer__nav-column">
            <h3>Поступление</h3>
            <ul className="footer__nav-list">{abitLinks && renderLinks(abitLinks)}</ul>
          </div>
          <div className="footer__nav-column">
            <h3>Новости</h3>
            <ul className="footer__nav-list">{newsLinks && renderLinks(newsLinks)}</ul>
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
  );
};

export default Footer;
