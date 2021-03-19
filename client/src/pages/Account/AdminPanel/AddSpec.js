import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../../../context/authContext';
import logo from '../../../assets/img/logo.png';
import Modal from '../../../components/UI/Modal';
import Input from '../../../components/UI/Input';
import Textarea from '../../../components/UI/Textarea';
import DocumentCard from '../../../components/AdminPanel/DocumentCard';
import axios from 'axios';
import { API_URL } from '../../../config';

//Form controls setup
function createFormControls() {
  return {
    code: {
      value: '',
      errorMessage: [],
      touched: false,
      valid: false,
      placeholder: '',
      shouldValidate: true,
      type: 'text',
      label: 'Код специальности',
      validation: {
        required: { active: true, errorMessage: 'Обязатльное поле' },
      },
    },
    title: {
      value: '',
      errorMessage: [],
      touched: false,
      valid: false,
      placeholder: '',
      shouldValidate: true,
      type: 'text',
      label: 'Назавание',
      validation: {
        required: { active: true, errorMessage: 'Обязатльное поле' },
      },
    },
    yearsToStudy: {
      value: '',
      errorMessage: [],
      touched: false,
      valid: true,
      placeholder: '',
      shouldValidate: false,
      type: 'text',
      label: 'Длительность обучения',
    },
    stateFundedPlacecesCounter: {
      value: '',
      errorMessage: [],
      touched: false,
      valid: true,
      placeholder: '',
      shouldValidate: false,
      type: 'text',
      label: 'Количество бюджетных мест',
    },
    desc: {
      value: '',
      errorMessage: [],
      touched: false,
      valid: true,
      placeholder: '',
      shouldValidate: false,
      type: 'textarea',
      label: 'Описание',
    },
    prospects: {
      value: '',
      errorMessage: [],
      touched: false,
      valid: true,
      placeholder: '',
      shouldValidate: false,
      type: 'textarea',
      label: 'Перспективы',
    },
  };
}

const AddSpec = () => {
  const auth = React.useContext(AuthContext);
  const history = useHistory();
  const [modalActive, setModalActive] = React.useState(false);
  const [formControls, setFormControls] = React.useState(createFormControls());
  const [isFormValid, setIsFormValid] = React.useState(false);
  const [documents, setDocuments] = React.useState([
    {
      title: '',
      link: '/',
    },
  ]);

  const logoutHandler = (event) => {
    event.preventDefault();
    auth.logout();
    history.push('/');
  };

  //form validation
  function validateControl(value, validation, shouldValidate) {
    let isValid = true;
    let error = [];

    if (!validation || !shouldValidate) {
      return { isValid, error };
    }

    if (validation.required) {
      isValid = value.trim() !== '' && isValid;
      if (!(value.trim() !== '')) error.push(validation.required.errorMessage);
    }

    return { isValid, error };
  }

  const onInputChangeHandler = (event, controlName) => {
    const form = { ...formControls };
    const control = { ...form[controlName] };
    control.value = event.target.value;
    control.touched = true;
    const validation = validateControl(control.value, control.validation, control.shouldValidate);
    control.valid = validation.isValid;
    control.errorMessage = validation.error;
    form[controlName] = control;
    let isFormValid = true;
    Object.keys(form).forEach((name) => {
      isFormValid = form[name].valid && isFormValid;
    });

    setIsFormValid(isFormValid);
    setFormControls(form);
  };

  function renderInputs() {
    return Object.keys(formControls).map((controlName, index) => {
      const control = formControls[controlName];
      return control.type === 'textarea' ? (
        <div key={controlName + index}>
          <Textarea
            label={control.label}
            placeholder={control.placeholder}
            value={control.value}
            classes={['post-fields__textarea']}
            errorMessage={control.errorMessage}
            valid={control.valid}
            touched={control.touched}
            validation={control.validation}
            shouldValidate={control.shouldValidate}
            onChange={(event) => onInputChangeHandler(event, controlName)}
          />
        </div>
      ) : (
        <div key={controlName + index}>
          <Input
            label={control.label}
            placeholder={control.placeholder}
            value={control.value}
            type={control.type}
            classes={['post-fields__input']}
            errorMessage={control.errorMessage}
            valid={control.valid}
            touched={control.touched}
            validation={control.validation}
            shouldValidate={control.shouldValidate}
            onChange={(event) => onInputChangeHandler(event, controlName)}
          />
        </div>
      );
    });
  }

  const onDocumentTitleChangeHandler = (event, documentIndex) => {
    const newDocuments = [...documents];
    newDocuments[documentIndex].title = event.target.value;
    setDocuments(newDocuments);
  };

  const onDucumentAddHandler = () => {
    setDocuments((documents) => [...documents, { title: '', uid: '', link: '/' }]);
  };
  const onDucumentDeleteHandler = (documentIndex) => {
    const newDocuments = [...documents];
    newDocuments.splice(documentIndex, 1);
    setDocuments(newDocuments);
  };

  const onDocumentSelect = (file, documentIndex) => {
    const newDocuments = [...documents];
    newDocuments[documentIndex].file = file;
    newDocuments[documentIndex].title = file.name.replace(/\.[^/.]+$/, '');
    newDocuments[documentIndex].extension = file.name.match(/\.[^/.]+$/, '')[0];
    setDocuments(newDocuments);
  };

  const onSendClickHandler = async () => {
    try {
      const formData = new FormData();
      let specialityFields = {};
      for (let key in formControls) {
        let value = formControls[key].value;
        specialityFields[key] = value;

        formData.append(`${key}`, value);
      }

      documents.forEach((document, index) => {
        if (document.file) {
          if (document.title === '') {
            document.title = document.file.name.replace(/\.[^/.]+$/, '');
          }
          formData.append(`file_${index}`, document.file, document.title + document.extension);
        }
      });

      const data = await axios.post(`${API_URL}api/spec/add`, formData, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  function renderDocuments() {
    return documents.map((document, index) => (
      <DocumentCard
        onTitleChangeHandler={onDocumentTitleChangeHandler}
        index={index}
        title={document.title}
        key={index}
        onDucumentDeleteHandler={onDucumentDeleteHandler}
        onDocumentSelect={onDocumentSelect}
        classes={['account-content__document-card']}
      />
    ));
  }

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
          <div className="account-content__title account-content__title_column">
            <h2>Добавить запись</h2>
            <p className="account-content__subtitle">Направление подготовки</p>
          </div>
          <div className="account-content__actions">
            <div className="account-content__publish-post">
              <button
                onClick={onSendClickHandler}
                disabled={!isFormValid}
                type="button"
                className="add-button">
                Опубликовать
              </button>
            </div>
            <div className="account-content__delete-post">
              <button onClick={() => setModalActive(true)} type="button" className="delete-button">
                Удалить
              </button>
            </div>
            <Modal active={modalActive} setActive={setModalActive}>
              <div className="delete-modal">
                <h4>Удалить запись</h4>
                <p>После завершения это действие невозможно отменить.</p>
                <button type="button" className="delete-modal__delete-button delete-button">
                  Удалить
                </button>
                <button
                  type="button"
                  className="delete-modal__add-button add-button"
                  onClick={() => setModalActive(false)}>
                  Отмена
                </button>
              </div>
            </Modal>
          </div>
          <div className="account-content__post-fields post-fields">{renderInputs()}</div>
          <div className="account-content__section-title">
            <h4>Документы</h4>
            <button
              onClick={onDucumentAddHandler}
              type="button"
              className="add-button add-button_small">
              +
            </button>
          </div>
          <div className="account-content__documents-list">{renderDocuments()}</div>
        </div>
      </div>
    </>
  );
};

export default AddSpec;
