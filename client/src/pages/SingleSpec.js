import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import logo from '../assets/img/logo.png';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Loader from '../components/UI/Loader';
import { AuthContext } from '../context/authContext';
import { useHttp } from '../hooks/http.hook';

const SingleSpec = () => {
  const { token } = useContext(AuthContext);
  const { request, loading } = useHttp();
  const [spec, setSpec] = React.useState(null);
  const specId = useParams().id;

  const getSpec = React.useCallback(async () => {
    try {
      const fetched = await request(`/api/spec/${specId}`, 'GET', null, {
        Authorization: `Bearer ${token}`,
      });
      setSpec(fetched);
    } catch (e) {}
  }, [token, specId, request]);

  React.useEffect(() => {
    getSpec();
  }, [getSpec]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {!loading && spec && (
        <>
          {/* Header */}
          <Header logo={logo} style={3} title={spec.title} subtitle={spec.code}></Header>

          {/* SINGLE SPEC PAGE */}
          <main>
            <div className="wrapper wrapper_post">
              <div className="post">
                <div className="post__key-facts key-facts">
                  <div className="key-facts__fact">
                    <span className="key-facts__value">{spec.yearsToStudy}</span>
                    <i className="key-facts__icon fi-rr-time-forward"></i>
                    <div className="key-facts__desc">очная форма</div>
                  </div>
                  <div className="key-facts__fact">
                    <span className="key-facts__value">{spec.stateFundedPlacecesCounter}</span>
                    <i className="key-facts__icon fi-rr-users"></i>
                    <div className="key-facts__desc">бюджетных мест</div>
                  </div>
                  {spec.stateAccreditation && (
                    <div className="key-facts__fact">
                      <span className="key-facts__value"></span>
                      <i className="key-facts__icon fi-rr-diploma"></i>
                      <div className="key-facts__desc">Гос. аккредитация</div>
                    </div>
                  )}
                </div>
                {spec.desc && (
                  <>
                    <h4>описание программы</h4>
                    <p>{spec.desc}</p>
                  </>
                )}

                {spec.prospects && (
                  <>
                    <h4>Перспективы после обучения</h4>
                    <p>{spec.prospects}</p>
                  </>
                )}
                <h4>Документы</h4>
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
              </div>
              <div className="sidebar"></div>
            </div>
          </main>
        </>
      )}

      {/* Footer */}
      <Footer logo={logo} />
    </>
  );
};

export default SingleSpec;
