import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import logo from '../../assets/img/logo.png';

const AdminHeader = () => {
  const auth = React.useContext(AuthContext);
  const history = useHistory();

  const logoutHandler = (event) => {
    event.preventDefault();
    auth.logout();
    history.push('/');
  };

  return (
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
          <div className="account-header__email">{auth.email && auth.email}</div>
          <div className="account-header__logout">
            <a onClick={logoutHandler} href="/">
              Выйти
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
