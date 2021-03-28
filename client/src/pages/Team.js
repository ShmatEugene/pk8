import React from 'react';
import logo from '../assets/img/logo.png';
import team1 from '../assets/img/team1.jpg';
import team2 from '../assets/img/team2.png';
import team3 from '../assets/img/team3.png';
import team4 from '../assets/img/team4.png';
import humanPlaceholder from '../assets/img/human-placeholder.png';
import { useHttp } from '../hooks/http.hook';
import Header from '../components/Header/Header';
import { API_URL } from '../config';

const Team = () => {
  const [workers, setWorkers] = React.useState(null);
  const { request, loading } = useHttp();

  const getWorkers = React.useCallback(async () => {
    try {
      const fetched = await request('/api/worker/', 'GET');
      setWorkers(fetched);
    } catch (e) {}
  }, [request]);

  React.useEffect(() => {
    getWorkers();
  }, [getWorkers]);

  function renderTeam(team) {
    return team.map((person) => (
      <div key={person._id} className="team__person person">
        <div className="person__img">
          <img
            src={person.imgLink ? `${API_URL}uploads/${person.imgLink}` : humanPlaceholder}
            alt="humanPlaceholder"
          />
        </div>
        <h3 className="person__name">{person.title}</h3>
        <p className="person__position">{person.department}</p>
        <p className="person__desc">{person.desc}</p>
      </div>
    ));
  }

  return (
    <>
      {/* Header */}
      <Header
        logo={logo}
        style={2}
        title="Руководство. Педагогический (научно-педагогический) состав"></Header>

      {/* TEAM */}
      <main>
        <div className="wrapper">
          <div className="wrapper__team team">
            <div className="team__list team__list_management">
              <div className="team__person person">
                <div className="person__img">
                  <img src={team1} alt="humanPlaceholder" />
                </div>
                <h3 className="person__name">Трофимов Андрей Николаевич</h3>
                <p className="person__position">директор</p>
                <div className="person__contacts">
                  <ul>
                    <li> +7 (495) 640-60-58</li>
                    <li>TrofimovAN@edu.mos.ru</li>
                  </ul>
                </div>
              </div>
              <div className="team__person person">
                <div className="person__img">
                  <img src={team2} alt="humanPlaceholder" />
                </div>
                <h3 className="person__name">Галиченко Ирина Анатольевна</h3>
                <p className="person__position">
                  Заместитель директора по учебно-производственной работе
                </p>
                <div className="person__contacts">
                  <ul>
                    <li> +7 (495) 640-60-58 (доб. 208)</li>
                    <li>TrofimovAN@edu.mos.ru</li>
                  </ul>
                </div>
              </div>
              <div className="team__person person">
                <div className="person__img">
                  <img src={team3} alt="humanPlaceholder" />
                </div>
                <h3 className="person__name">Муковозова Наталья Ивановна</h3>
                <p className="person__position">
                  Заместитель директора по управлению качеством образования
                </p>
                <div className="person__contacts">
                  <ul>
                    <li> +7 (495) 640-60-58 (доб. 209)</li>
                    <li>TrofimovAN@edu.mos.ru</li>
                  </ul>
                </div>
              </div>
              <div className="team__person person">
                <div className="person__img">
                  <img src={team4} alt="humanPlaceholder" />
                </div>
                <h3 className="person__name">Алешина Анастасия Витальевна</h3>
                <p className="person__position">Заместитель директора по управлению ресурсами</p>
                <div className="person__contacts">
                  <ul>
                    <li> +7 (495) 640-60-58 (доб. 207)</li>
                    <li>TrofimovAN@edu.mos.ru</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="search-block team__search-block">
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
            <div className="team__list team__list_staff">{workers && renderTeam(workers)}</div>
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

export default Team;
