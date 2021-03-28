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
  const [sortedSpecialities, setSortedSpecialities] = React.useState(null);
  const [sortFields, setSortFields] = React.useState([]);
  const [searchField, setSearchField] = React.useState('');
  const [sortBy, setSortBy] = React.useState({
    yearsToStudy: false,
    price: false,
  });
  const { request, loading } = useHttp();

  const getSpecialities = React.useCallback(async () => {
    try {
      const fetched = await request('/api/spec/', 'GET', null, {
        Authorization: `Bearer ${token}`,
      });

      setSpecialities(fetched);

      //set sortting
      const newSortFields = {};
      newSortFields.price = ['Бюджет/Внебюджет', 'Бюджет', 'Внебюджет'];
      newSortFields.yearsToStudy = [];
      newSortFields.yearsToStudy.push('Любая длительность');
      fetched.forEach((spec) => {
        newSortFields.yearsToStudy.push(spec.yearsToStudy);
      });
      newSortFields.yearsToStudy = newSortFields.yearsToStudy.filter(
        (item, index) => newSortFields.yearsToStudy.indexOf(item) === index,
      );
      setSortFields(newSortFields);
    } catch (e) {
      console.log(e);
    }
  }, [token, request]);

  React.useEffect(() => {
    getSpecialities();
  }, [getSpecialities]);

  //sorting
  const sortSpecialities = React.useMemo(() => {
    if (specialities) {
      const sortedArray = specialities.filter((item) => {
        let flag = true;
        if (sortBy.price === 'Бюджет' && +item.stateFundedPlacecesCounter === 0) {
          console.log(item);
          flag = false;
        }
        if (sortBy.price === 'Внебюджет' && +item.stateFundedPlacecesCounter !== 0) {
          flag = false;
        }
        if (sortBy.yearsToStudy && item.yearsToStudy !== sortBy.yearsToStudy) {
          flag = false;
        }
        const searchRegExp = new RegExp(preg_quote(searchField), 'i');
        if (searchField && !item.title.match(searchRegExp) && !item.code.match(searchRegExp)) {
          flag = false;
        }
        return flag;
      });
      console.log('Sorted array: ', sortedArray);
      setSortedSpecialities(sortedArray);
    }
    //return sortedArray;
  }, [specialities, sortBy, searchField]);

  function preg_quote(str, delimiter) {
    return (str + '').replace(
      new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\' + (delimiter || '') + '-]', 'g'),
      '\\$&',
    );
  }

  //handlers
  const onSortSelectHandler = (sortingField, option) => {
    const newSortBy = { ...sortBy };
    newSortBy[sortingField] = option;
    console.log(newSortBy);
    setSortBy(newSortBy);
  };

  return (
    <>
      {/* Header */}
      <Header logo={logo} title="Образовательные программы" style={2} />

      {/* SPECIALITIES LIST */}
      <main>
        <div className="wrapper">
          <div className="wrapper__specialities-page specialities-page">
            {loading && specialities ? (
              <Loader />
            ) : (
              <>
                <Search
                  onOptionClick={onSortSelectHandler}
                  fields={sortFields}
                  onSearchFieldChange={(value) => setSearchField(value)}
                  searchFieldValue={searchField}
                />
                <SpecList specialities={sortedSpecialities}></SpecList>
              </>
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
