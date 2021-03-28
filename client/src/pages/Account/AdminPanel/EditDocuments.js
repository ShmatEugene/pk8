import React from 'react';
import EditorJs from 'react-editor-js';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { AuthContext } from '../../../context/authContext';
import Modal from '../../../components/UI/Modal';
import Input from '../../../components/UI/Input';
import DocumentCard from '../../../components/AdminPanel/DocumentCard';
import axios from 'axios';
import { API_URL } from '../../../config';
import { useHttp } from '../../../hooks/http.hook';
import AdminMenu from '../../../components/AdminPanel/AdminMenu';
import AdminHeader from '../../../components/AdminPanel/AdminHeader';
import { EDITOR_JS_TOOLS, EIDTOR_JS_I18N } from '../../../constants';

//Form controls setup
function createFormControls() {
  return {
    title: {
      value: '',
      errorMessage: [],
      touched: false,
      valid: false,
      placeholder: '',
      shouldValidate: true,
      type: 'text',
      label: 'Заголовок',
      validation: {
        required: { active: true, errorMessage: 'Обязатльное поле' },
      },
    },
  };
}
const EditDocuments = () => {
  const auth = React.useContext(AuthContext);
  const history = useHistory();
  const { request } = useHttp();
  const [modalActive, setModalActive] = React.useState(false);
  const [formControls, setFormControls] = React.useState(createFormControls());
  const [isFormValid, setIsFormValid] = React.useState(false);
  const [currentPost, setCurrentPost] = React.useState({});
  const [editorData, setEditorData] = React.useState(null);
  const [editorInitialData, setEditorInitialData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const postId = useParams().id;
  const [documents, setDocuments] = React.useState([
    {
      title: '',
      link: '/',
    },
  ]);

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

  //get old Post to Edit
  const getCurrentPost = React.useCallback(async () => {
    try {
      const fetched = await request(`/api/documents/${postId}`, 'GET', null, {
        Authorization: `Bearer ${auth.token}`,
      });
      setCurrentPost(fetched);

      //set form state
      const form = { ...formControls };
      form.title.value = fetched.title;
      form.title.valid = true;
      form.title.touched = true;

      //set Editor data
      setEditorInitialData(JSON.parse(fetched.editorData));
      console.log(JSON.parse(fetched.editorData));

      setFormControls(form);
      setIsFormValid(true);

      //set documents and remove extension from title
      fetched.documents.forEach((document) => {
        document.title = document.title.replace(/\.[^/.]+$/, '');
      });
      setDocuments(fetched.documents);
    } catch (e) {}
  }, [auth.token, postId, request]);

  React.useEffect(() => {
    if (postId) {
      getCurrentPost();
    }
  }, [getCurrentPost]);

  //post new Post
  const onSendClickHandler = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('editorData', JSON.stringify(editorData));
      for (let key in formControls) {
        let value = formControls[key].value;
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

      const data = await axios.post(`${API_URL}api/documents/add`, formData, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      console.log(data);
      setLoading(false);
      history.push(`/admin-panel/edit/documents/${data.data.documentPost._id}`);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  //update Post
  const onUpdateClickHandler = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      console.log(editorData);
      if (editorData) {
        formData.append('editorData', JSON.stringify(editorData));
      }

      for (let key in formControls) {
        let value = formControls[key].value;
        if (formControls[key].value !== currentPost[key]) {
          formData.append(`${key}`, value);
        }
      }

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

      const data = await axios.put(`${API_URL}api/documents/edit/${postId}`, formData, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });

      console.log(data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  //delete post
  const onDeletePostHandler = async (postId) => {
    try {
      const fetched = await request(`/api/documents/delete/${postId}`, 'DELETE', null, {
        Authorization: `Bearer ${auth.token}`,
      });
      console.log(fetched);
      history.push('/admin-panel/manage-documents');
    } catch (e) {
      console.log(e);
    }
  };

  //render functions
  function renderInputs() {
    return Object.keys(formControls).map((controlName, index) => {
      const control = formControls[controlName];
      return (
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
            <h2>{postId && currentPost ? currentPost.title : 'Добавить запись'}</h2>
            <p className="account-content__subtitle">Раздел Образование</p>
          </div>
          <div className="account-content__actions">
            <div className="account-content__publish-post">
              {postId ? (
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
            {postId && (
              <div className="account-content__delete-post">
                <button
                  onClick={() => setModalActive(true)}
                  type="button"
                  className="delete-button">
                  Удалить
                </button>
              </div>
            )}
            {postId && (
              <div className="account-content__post-link">
                <NavLink to={`/documents/${postId}`}>Ссылка на страницу</NavLink>
              </div>
            )}
            <Modal active={modalActive} setActive={setModalActive}>
              <div className="delete-modal">
                <h4>Удалить запись</h4>
                <p>После завершения это действие невозможно отменить.</p>
                <button
                  onClick={() => onDeletePostHandler(postId)}
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
          <div className="account-content__post-fields post-fields">
            {renderInputs()}
            <div className="account-content__editor">
              <h4>Текстовый редактор</h4>
              {editorInitialData || !postId ? (
                <EditorJs
                  tools={EDITOR_JS_TOOLS}
                  i18n={EIDTOR_JS_I18N}
                  data={editorInitialData}
                  onChange={(api, data) => setEditorData(data)}
                />
              ) : null}
            </div>
          </div>
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

export default EditDocuments;
