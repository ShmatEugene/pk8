import React from 'react';
import logo from '../assets/img/logo.png';
import Header from '../components/Header/Header';
import DocsList from '../components/UI/DocsList';
import Table from '../components/UI/Table';

const Post = () => {
  return (
    <>
      {/* Header */}
      <Header logo={logo} style={2} title="Основные сведения"></Header>

      {/* POST */}
      <main>
        <div className="wrapper wrapper_post">
          <div className="post">
            <h4>ИСТОРИЯ ОРГАНИЗАЦИИ</h4>
            <p>
              В 1920 году при Государственном авиационном заводе № 1 (ныне РСК «МиГ») была открыта
              школа заводского обучения рабочих кадров, которая впоследствии преобразовалась в наш
              колледж.
            </p>
            <h4>Академическая стипендия</h4>
            <table className="table post__table">
              <thead>
                <tr>
                  <td>№</td>
                  <td>Отделение</td>
                  <td>ФИО</td>
                  <td>Почта</td>
                  <td>Отделение</td>
                  <td>ФИО</td>
                  <td>Почта</td>
                  <td>Отделение</td>
                  <td>ФИО</td>
                  <td>Почта</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Хорошевское</td>
                  <td>Гопина Валентина Алексеевна</td>
                  <td>gopina@pk8.ru</td>
                  <td>Хорошевское</td>
                  <td>Гопина Валентина Алексеевна</td>
                  <td>gopina@pk8.ru</td>
                  <td>Хорошевское</td>
                  <td>Гопина Валентина Алексеевна</td>
                  <td>gopina@pk8.ru</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Хорошевское</td>
                  <td>Гопина Валентина Алексеевна</td>
                  <td>gopina@pk8.ru</td>
                  <td>Хорошевское</td>
                  <td>Гопина Валентина Алексеевна</td>
                  <td>gopina@pk8.ru</td>
                  <td>Хорошевское</td>
                  <td>Гопина Валентина Алексеевна</td>
                  <td>gopina@pk8.ru</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Хорошевское</td>
                  <td>Гопина Валентина Алексеевна</td>
                  <td>gopina@pk8.ru</td>
                  <td>Хорошевское</td>
                  <td>Гопина Валентина Алексеевна</td>
                  <td>gopina@pk8.ru</td>
                  <td>Хорошевское</td>
                  <td>Гопина Валентина Алексеевна</td>
                  <td>gopina@pk8.ru</td>
                </tr>
              </tbody>
            </table>

            <Table></Table>
            <h4>СВЕДЕНИЯ О НАЛИЧИИ И УСЛОВИЯХ ПРЕДОСТАВЛЕНИЯ ОБУЧАЮЩИМСЯ СТИПЕНДИЙ</h4>
            <ul className="post__documents-list documents-list">
              <li className="documents-list__item">
                <span className="documents-list__extension">pdf</span>
                <a className="documents-list__link" href="#">
                  Устав образовательной организации
                </a>
              </li>
              <li className="documents-list__item">
                <div className="documents-list__extension">pdf</div>
                <a className="documents-list__link" href="#">
                  Положение о порядке оформления, возникновения, приостановления и прекращения
                  отношений между колледжем и обучающимися и(или) их родителями
                </a>
              </li>
            </ul>
            <h4>Документы</h4>
            <DocsList></DocsList>
            <h4>Перечень необходимых документов</h4>
            <ul className="post__bullet-list bullet-list">
              <li className="bullet-list__item">стратегически важные и приоритетные технологии;</li>
              <li className="bullet-list__item">современные методы обучения;</li>
              <li className="bullet-list__item">
                современные методы обучения; высококвалифицированный педагогический коллектив;
                высококвалифицированный педагогический коллектив;
              </li>
            </ul>
          </div>
          <div className="sidebar"></div>
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

export default Post;
