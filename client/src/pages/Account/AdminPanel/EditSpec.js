import React from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { AuthContext } from '../../../context/authContext';
import Modal from '../../../components/UI/Modal';
import Input from '../../../components/UI/Input';
import Textarea from '../../../components/UI/Textarea';
import DocumentCard from '../../../components/AdminPanel/DocumentCard';
import axios from 'axios';
import { API_URL } from '../../../config';
import { useHttp } from '../../../hooks/http.hook';
import AdminMenu from '../../../components/AdminPanel/AdminMenu';
import AdminHeader from '../../../components/AdminPanel/AdminHeader';

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

const EditSpec = () => {
  const auth = React.useContext(AuthContext);
  const history = useHistory();
  const { request } = useHttp();
  const [modalActive, setModalActive] = React.useState(false);
  const [formControls, setFormControls] = React.useState(createFormControls());
  const [isFormValid, setIsFormValid] = React.useState(false);
  const [currentSpec, setCurrentSpec] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const specId = useParams().id;
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

  //handlers
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

  const onDocumentTitleChangeHandler = (event, documentIndex) => {
    const newDocuments = [...documents];
    newDocuments[documentIndex].title = event.target.value;
    setDocuments(newDocuments);
  };

  const onDucumentAddHandler = () => {
    setDocuments((documents) => [...documents, { title: '', link: '/' }]);
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
    newDocuments[documentIndex].link = '';
    newDocuments[documentIndex].extension = file.name.match(/\.[^/.]+$/, '')[0];
    setDocuments(newDocuments);
  };

  //get old Speciality to Edit
  const getCurrentSpec = React.useCallback(async () => {
    try {
      const fetched = await request(`/api/spec/${specId}`, 'GET', null, {
        Authorization: `Bearer ${auth.token}`,
      });
      setCurrentSpec(fetched);

      //set form state
      const form = { ...formControls };
      Object.keys(form).forEach((name) => {
        form[name].value = fetched[name];
        form[name].valid = true;
        form[name].touched = true;
      });

      setFormControls(form);
      setIsFormValid(true);

      //set documents and remove extension from title
      fetched.documents.forEach((document) => {
        document.title = document.title.replace(/\.[^/.]+$/, '');
      });
      setDocuments(fetched.documents);
    } catch (e) {}
  }, [auth.token, specId, request]);

  React.useEffect(() => {
    if (specId) {
      getCurrentSpec();
    }
  }, [getCurrentSpec]);

  //post new Speciality
  const onSendClickHandler = async () => {
    try {
      setLoading(true);
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
      setLoading(false);
      history.push(`/admin-panel/edit/spec/${data.data.spec._id}`);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  //update Speciality
  const onUpdateClickHandler = async () => {
    try {
      setLoading(true);
      const formData = new FormData();

      for (let key in formControls) {
        let value = formControls[key].value;
        if (formControls[key].value !== currentSpec[key]) {
          formData.append(`${key}`, value);
        }
      }

      currentSpec.documents.forEach((document, index) => {});
      let linkId = 0;
      let fileId = 0;
      documents.forEach((document) => {
        if (document.link) {
          formData.append(`file-link_${linkId}`, document.link);
          formData.append(
            `file-title_${linkId}`,
            document.title + document.link.match(/\.[^/.]+$/, '')[0],
          );
          linkId++;
        } else if (document.file) {
          if (document.title === '') {
            document.title = document.file.name.replace(/\.[^/.]+$/, '');
          }
          formData.append(`file_${fileId}`, document.file, document.title + document.extension);
          fileId++;
        }
      });

      const data = await axios.put(`${API_URL}api/spec/edit/${specId}`, formData, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });

      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  //delete spec
  const onDeletePostHandler = async (postId) => {
    try {
      const fetched = await request(`/api/spec/delete/${postId}`, 'DELETE', null, {
        Authorization: `Bearer ${auth.token}`,
      });
      history.push('/admin-panel/manage-specs');
      console.log(fetched);
    } catch (e) {
      console.log(e);
    }
  };

  //render functions
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
            value={control.value || ''}
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

  function renderDocuments() {
    return documents.map((document, index) => (
      <DocumentCard
        onTitleChangeHandler={onDocumentTitleChangeHandler}
        index={index}
        title={document.title}
        link={document.link}
        id={document._id || ''}
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
      <AdminHeader />

      {/* Account */}
      <div className="account-layout">
        <AdminMenu />
        <div className="account-layout__account-content account-content">
          <div className="account-content__title account-content__title_column">
            <h2>{specId && currentSpec ? currentSpec.title : 'Добавить запись'}</h2>
            <p className="account-content__subtitle">Направление подготовки</p>
          </div>
          <div className="account-content__actions">
            <div className="account-content__publish-post">
              {specId ? (
                <button
                  onClick={onUpdateClickHandler}
                  disabled={!isFormValid || loading}
                  type="button"
                  className="add-button">
                  {loading ? '...' : 'Обновить'}
                </button>
              ) : (
                <button
                  onClick={onSendClickHandler}
                  disabled={!isFormValid || loading}
                  type="button"
                  className="add-button">
                  {loading ? '...' : 'Опубликовать'}
                </button>
              )}
            </div>
            {specId && (
              <div className="account-content__delete-post">
                <button
                  onClick={() => setModalActive(true)}
                  type="button"
                  className="delete-button">
                  Удалить
                </button>
              </div>
            )}
            {specId && (
              <div className="account-content__post-link">
                <NavLink to={`/specialities/${specId}`}>Ссылка на страницу</NavLink>
              </div>
            )}
            <Modal active={modalActive} setActive={setModalActive}>
              <div className="delete-modal">
                <h4>Удалить запись</h4>
                <p>После завершения это действие невозможно отменить.</p>
                <button
                  onClick={() => onDeletePostHandler(specId)}
                  type="button"
                  className="delete-modal__delete-button delete-button">
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

export default EditSpec;
