import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/img/logo.png';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Countdown from '../components/Home/Countdown';
import NewsList from '../components/Home/NewsList';
import SpecList from '../components/Specialities/SpecList';
import { AuthContext } from '../context/authContext';
import { useHttp } from '../hooks/http.hook';

const Home = () => {
  const { token } = React.useContext(AuthContext);
  const [specialities, setSpecialities] = React.useState(null);
  const [news, setNews] = React.useState(null);
  const { request, loading } = useHttp();

  const getSpecialities = React.useCallback(async () => {
    try {
      const fetched = await request('/api/spec/', 'GET', null, {
        Authorization: `Bearer ${token}`,
      });
      setSpecialities(fetched);
    } catch (e) {}
  }, [token, request]);

  React.useEffect(() => {
    getSpecialities();
  }, [getSpecialities]);

  const getNews = React.useCallback(async () => {
    try {
      const fetched = await request('/api/news/', 'GET');
      setNews(fetched.reverse());
    } catch (e) {}
  }, [request]);

  React.useEffect(() => {
    getNews();
  }, [getNews]);
  return (
    <>
      {/* Home Header */}
      <Header logo={logo} style={1}></Header>
      <main>
        {/* countdown */}
        <Countdown countdownDate={new Date('Jule 18, 2021 19:00:00')}></Countdown>
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
                <h3 className="advantage__title">Квалифицированный педагогический коллектив</h3>
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
                <NavLink to="/college/60c0ea1798316b5c24bfb8ec">
                  Читать полностью <i className="fi-rr-arrow-right"></i>
                </NavLink>
              </div>
            </div>
          </div>
        </section>
        {/* SPECIALITIES */}
        <section className="home-specialties wrapper overview-block-pt">
          <div className="title title_center home-specialties__title">
            <h2>Направления подготовки</h2>
            <p className="title__subtitle">
              В колледже реализуются 24 программы среднего профессионального образования
            </p>
          </div>
          <SpecList specialities={specialities} quantity={2}></SpecList>
          <div className="home-specialties__button-block">
            <div className="sh-button home-specialties__button sh-mt-30">
              <NavLink to={'/specialities'}>
                Посмотреть все <i className="fi-rr-arrow-right"></i>
              </NavLink>
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
                  <NavLink className="info-block__link" to="/abit/60c0f3ee10dd6c3fb8c4a5d9">
                    Условия приёма
                  </NavLink>
                </li>
                <li>
                  <NavLink className="info-block__link" to="/abit/admission-committee">
                    График работы приёмной комиссии
                  </NavLink>
                </li>
                <li>
                  <NavLink className="info-block__link" to="/abit/60c0f4bf10dd6c3fb8c4a5dd">
                    Контрольные цифры приёма
                  </NavLink>
                </li>
                <li>
                  <NavLink className="info-block__link" to="/abit/60c0f94d10dd6c3fb8c4a5df">
                    Количество поданных заявлений
                  </NavLink>
                </li>
                <li>
                  <NavLink className="info-block__link" to="/abit/60c0f6d810dd6c3fb8c4a5de">
                    Результаты приёма на 2020-2021 учебный год
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="info-block__edu">
              <h3 className="info-block__title">Образование в ГАПОУ ПК №8</h3>
              <ul>
                <li>
                  <NavLink className="info-block__link" to="/edu/60c0ed0b98316b5c24bfb8ee">
                    Образовательные стандарты
                  </NavLink>
                </li>
                <li>
                  <NavLink className="info-block__link" to="/edu/60c0ee3198316b5c24bfb8fe">
                    Платные образовательные услуги
                  </NavLink>
                </li>
                <li>
                  <NavLink className="info-block__link" to="/edu/60c0ef0a98316b5c24bfb903">
                    Вакантные места для приема (перевода) обучающихся
                  </NavLink>
                </li>
                <li>
                  <NavLink className="info-block__link" to="/edu/60c0f1bd98316b5c24bfb904">
                    Дополнительное образование
                  </NavLink>
                </li>
                <li>
                  <NavLink className="info-block__link" to="/team">
                    Педагогический состав
                  </NavLink>
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
          <NewsList length={3} news={news} />
        </section>
        {/* Footer */}
        <Footer logo={logo}></Footer>
      </main>
    </>
  );
};

export default Home;
