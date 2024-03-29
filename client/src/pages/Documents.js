import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/img/logo.png';
import Header from '../components/Header/Header';
import { useHttp } from '../hooks/http.hook';

const Documents = () => {
  const [posts, setPosts] = React.useState(null);
  const { request, loading } = useHttp();

  const getPosts = React.useCallback(async () => {
    try {
      const fetched = await request('/api/documents/', 'GET');
      setPosts(fetched);
    } catch (e) {}
  }, [request]);

  React.useEffect(() => {
    getPosts();
  }, [getPosts]);

  function renderDocuments1(documents) {
    return documents.map((document, index) => {
      if (index % 3 === 0) {
        return (
          <li key={document._id}>
            <NavLink className="documents-nav__link" to={`/documents/${document._id}`}>
              {document.title && document.title}
            </NavLink>
          </li>
        );
      }
    });
  }
  function renderDocuments2(documents) {
    return documents.map((document, index) => {
      if (index % 3 === 1) {
        return (
          <li key={document._id}>
            <NavLink className="documents-nav__link" to={`/documents/${document._id}`}>
              {document.title && document.title}
            </NavLink>
          </li>
        );
      }
    });
  }
  function renderDocuments3(documents) {
    return documents.map((document, index) => {
      if (index % 3 === 2) {
        return (
          <li key={document._id}>
            <NavLink className="documents-nav__link" to={`/documents/${document._id}`}>
              {document.title && document.title}
            </NavLink>
          </li>
        );
      }
    });
  }

  return (
    <>
      {/* Header */}
      <Header logo={logo} style={2} title="Документы"></Header>

      {/* DOCUMENTS */}
      <main>
        <div className="wrapper">
          <div className="wrapper__documents-nav documents-nav">
            <div className="documents-nav__column">
              <ul className="documents-nav__list">{posts && renderDocuments1(posts)}</ul>
            </div>
            <div className="documents-nav__column">
              <ul className="documents-nav__list">{posts && renderDocuments2(posts)}</ul>
            </div>
            <div className="documents-nav__column">
              <ul className="documents-nav__list">{posts && renderDocuments3(posts)}</ul>
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

export default Documents;
