import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../../../context/authContext';
import '../../../scss/account.scss';
import logo from '../../../assets/img/logo.png';
import EditLIstCard from '../../../components/AdminPanel/EditLIstCard';

const ManageSpecs = () => {
  const auth = React.useContext(AuthContext);
  const history = useHistory();

  const logoutHandler = (event) => {
    event.preventDefault();
    auth.logout();
    history.push('/');
  };

  return (
    <>
      {/* Header */}
      <header className="account-header">
        <NavLink to="/" className="account-header__logo">
          <img src={logo} alt="logo" />
        </NavLink>
        <div className="account-header__wrapper">
          <nav className="account-header__nav">
            <ul>
              <li>
                <NavLink
                  to="/admin-panel"
                  className="account-header__nav-link account-header__nav-link_active">
                  Панель администратора
                </NavLink>
              </li>
              <li>
                <NavLink to="/" className="account-header__nav-link">
                  Личный кабинет
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className="account-header__user">
            <div className="account-header__email">shmat.evg@yandex.ru</div>
            <div className="account-header__logout">
              <a onClick={logoutHandler} href="/">
                Выйти
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Account */}
      <div className="account-layout">
        <div className="account-layout__account-menu account-menu">
          <nav className="account-menu__nav">
            <ul>
              <li>
                <NavLink to="/" className="account-menu__link account-menu__link_active">
                  Пользователи
                </NavLink>
              </li>
              <li>
                <NavLink to="/" className="account-menu__link ">
                  Нарпавления подготовки
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <div className="account-layout__account-content account-content">
          <div className="account-content__title">
            <h2>Нарпавления подготовки</h2>
            <NavLink to="/admin-panel/add/spec" className="account-content__add-button add-button">
              Добавить новое
            </NavLink>
          </div>
          <div className="account-content__edit-posts edit-posts">
            <div className="edit-posts__header">
              <h4 className="edit-posts__heading-title">назавание</h4>
              <h4 className="edit-posts__heading-published">опубликовано</h4>
              <h4 className="edit-posts__heading-clicks">клики</h4>
            </div>
            <EditLIstCard />
            <EditLIstCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageSpecs;
