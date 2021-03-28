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
import Textarea from '../../../components/UI/Textarea';

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
      label: 'ФИО',
      validation: {
        required: { active: true, errorMessage: 'Обязатльное поле' },
      },
    },
    department: {
      value: '',
      errorMessage: [],
      touched: false,
      valid: false,
      placeholder: '',
      shouldValidate: true,
      type: 'text',
      label: 'Отделение',
    },
    desc: {
      value: '',
      errorMessage: [],
      touched: false,
      valid: false,
      placeholder: '',
      shouldValidate: true,
      type: 'textarea',
      label: 'Описание',
    },
  };
}
const EditWorkers = () => {
  const auth = React.useContext(AuthContext);
  const history = useHistory();
  const { request } = useHttp();
  const [modalActive, setModalActive] = React.useState(false);
  const [formControls, setFormControls] = React.useState(createFormControls());
  const [isFormValid, setIsFormValid] = React.useState(false);
  const [currentPost, setCurrentPost] = React.useState({});
  const [editorData, setEditorData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const postId = useParams().id;
  const [thumbnailImg, setThumbnailImg] = React.useState({
    title: '',
    file: null,
    link: '',
  });

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
  const onThumbnailTitleChangeHandler = (event) => {
    const newThumbnailImg = { ...thumbnailImg };
    newThumbnailImg.title = event.target.value;
    setThumbnailImg(newThumbnailImg);
  };

  const onThumbnailSelect = async (file) => {
    const newThumbnailImg = { ...thumbnailImg };
    newThumbnailImg.file = file;

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    const data = await axios.post(`${API_URL}api/file/add`, formData, {
      headers: { Authorization: `Bearer ${auth.token}` },
    });
    console.log(data);

    newThumbnailImg.link = data.data.file.name;

    setThumbnailImg(newThumbnailImg);
    setLoading(false);
  };

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

  //get old Post to Edit
  const getCurrentPost = React.useCallback(async () => {
    try {
      const fetched = await request(`/api/worker/${postId}`, 'GET', null, {
        Authorization: `Bearer ${auth.token}`,
      });
      setCurrentPost(fetched);

      //set thumbnail
      console.log(fetched);
      if (fetched.imgLink) {
        const thumbnailImg = {
          title: '',
          file: null,
          link: fetched.imgLink,
        };
        setThumbnailImg(thumbnailImg);
      }

      //set form state
      const form = { ...formControls };
      Object.keys(form).forEach((name) => {
        form[name].value = fetched[name];
        form[name].valid = true;
        form[name].touched = true;
      });

      setFormControls(form);
      setIsFormValid(true);
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
      for (let key in formControls) {
        let value = formControls[key].value;
        formData.append(`${key}`, value);
      }

      formData.append('imgLink', thumbnailImg.link);

      const data = await axios.post(`${API_URL}api/worker/add`, formData, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      console.log(data);
      setLoading(false);
      history.push(`/admin-panel/edit/worker/${data.data.worker._id}`);
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

      for (let key in formControls) {
        let value = formControls[key].value;
        if (formControls[key].value !== currentPost[key]) {
          formData.append(`${key}`, value);
        }
      }

      formData.append('imgLink', thumbnailImg.link);

      const data = await axios.put(`${API_URL}api/worker/edit/${postId}`, formData, {
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
      const fetched = await request(`/api/worker/delete/${postId}`, 'DELETE', null, {
        Authorization: `Bearer ${auth.token}`,
      });
      console.log(fetched);
      history.push('/admin-panel/manage-workers');
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

  return (
    <>
      {/* Header */}
      <AdminHeader />

      {/* Account */}
      <div className="account-layout">
        <div className="account-layout__account-menu account-menu">
          <nav className="account-menu__nav">
            <AdminMenu />
          </nav>
        </div>
        <div className="account-layout__account-content account-content">
          <div className="account-content__title account-content__title_column">
            <h2>{postId && currentPost ? currentPost.title : 'Добавить сотрудника'}</h2>
            <p className="account-content__subtitle">Раздел Сотрудники</p>
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
          <div className="account-content__post-fields post-fields">{renderInputs()}</div>
          <div className="account-content__thumbnail">
            <h4>Фото</h4>
            <DocumentCard
              onTitleChangeHandler={onThumbnailTitleChangeHandler}
              index={0}
              title={thumbnailImg.title}
              link={thumbnailImg.link}
              id={thumbnailImg._id || ''}
              accept={'image/*'}
              onDucumentDeleteHandler={() =>
                setThumbnailImg({
                  title: '',
                  file: null,
                  link: '',
                })
              }
              onDocumentSelect={onThumbnailSelect}
              classes={['account-content__document-card']}
            />
            {thumbnailImg.link && (
              <img
                className="account-content__thumbnail-img"
                src={`${API_URL}uploads/${thumbnailImg.link}`}></img>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EditWorkers;
