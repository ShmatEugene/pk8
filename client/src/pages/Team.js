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
import Search from '../components/UI/Search';
import Footer from '../components/Footer/Footer';

const Team = () => {
  const [workers, setWorkers] = React.useState(null);
  const [sortedTeam, setSortedTeam] = React.useState(null);
  const [sortFields, setSortFields] = React.useState([]);
  const [searchField, setSearchField] = React.useState('');
  const [sortBy, setSortBy] = React.useState({
    department: false,
  });
  const { request, loading } = useHttp();

  const getWorkers = React.useCallback(async () => {
    try {
      const fetched = await request('/api/worker/', 'GET');
      setWorkers(fetched);

      //set sortting
      const newSortFields = {};
      newSortFields.department = [];
      newSortFields.department.push('Отделение');
      fetched.forEach((person) => {
        newSortFields.department.push(person.department);
      });
      newSortFields.department = newSortFields.department.filter(
        (item, index) => newSortFields.department.indexOf(item) === index,
      );
      console.log(newSortFields);
      setSortFields(newSortFields);
    } catch (e) {}
  }, [request]);

  React.useEffect(() => {
    getWorkers();
  }, [getWorkers]);

  //handlers
  const onSortSelectHandler = (sortingField, option) => {
    const newSortBy = { ...sortBy };
    newSortBy[sortingField] = option;
    console.log(newSortBy);
    setSortBy(newSortBy);
  };

  //sorting
  const sortWorkers = React.useMemo(() => {
    if (workers) {
      const sortedArray = workers.filter((item) => {
        let flag = true;
        if (sortBy.department && item.department !== sortBy.department) {
          flag = false;
        }
        const searchRegExp = new RegExp(preg_quote(searchField), 'i');
        if (searchField && !item.title.match(searchRegExp) && !item.desc.match(searchRegExp)) {
          flag = false;
        }
        return flag;
      });
      console.log('Sorted array: ', sortedArray);
      setSortedTeam(sortedArray);
    }
  }, [workers, sortBy, searchField]);

  function preg_quote(str, delimiter) {
    return (str + '').replace(
      new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\' + (delimiter || '') + '-]', 'g'),
      '\\$&',
    );
  }

  //render
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
            <Search
              onOptionClick={onSortSelectHandler}
              fields={sortFields}
              onSearchFieldChange={(value) => setSearchField(value)}
              searchFieldValue={searchField}
            />
            <div className="team__list team__list_staff">
              {sortedTeam && renderTeam(sortedTeam)}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Team;
