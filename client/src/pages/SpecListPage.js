import React from 'react';
import logo from '../assets/img/logo.png';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import SpecList from '../components/Specialities/SpecList';
import Loader from '../components/UI/Loader';
import Search from '../components/UI/Search';
import { AuthContext } from '../context/authContext';
import { useHttp } from '../hooks/http.hook';

const SpecListPage = () => {
  const { token } = React.useContext(AuthContext);
  const [specialities, setSpecialities] = React.useState(null);
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

  return (
    <>
      {/* Header */}
      <Header logo={logo} title="Образовательные программы" style={2} />

      {/* SPECIALITIES LIST */}
      <main>
        <div className="wrapper">
          <div className="wrapper__specialities-page specialities-page">
            <Search></Search>
            {loading && specialities ? (
              <Loader />
            ) : (
              <SpecList specialities={specialities}></SpecList>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer logo={logo} />
    </>
  );
};

export default SpecListPage;
