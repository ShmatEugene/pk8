import React from 'react';
import { NavLink } from 'react-router-dom';
import Modal from '../UI/Modal';

const EditLIstCard = ({ post, onDeletePostHandler, postType }) => {
  const [modalActive, setModalActive] = React.useState(false);
  const [deleted, setDeleted] = React.useState(false);

  const onDeleteClickHandler = () => {
    setModalActive(false);
    setDeleted(true);
    onDeletePostHandler(post._id);
  };
  return (
    <>
      <div
        className={`edit-posts__edit-list-card edit-list-card ${
          deleted ? 'edit-list-card_deleted' : ''
        }`}>
        <div className="edit-list-card__title">{post.title}</div>
        <div className="edit-list-card__published">
          {post.published ? post.published : '14.03.2021'}
        </div>
        <div className="edit-list-card__clicks">{post.clicks ? post.clicks : 'нет данных'}</div>
        <div className="edit-list-card__edit">
          <NavLink to={`/admin-panel/edit/${postType}/${post._id}`}>
            <i className="fi-rr-edit"></i>
          </NavLink>
        </div>
        <div className="edit-list-card__delete" onClick={() => setModalActive(true)}>
          <i className="fi-rr-trash"></i>
        </div>
      </div>
      <Modal active={modalActive} setActive={setModalActive}>
        <div className="delete-modal">
          <h4>Удалить запись</h4>
          <p>После завершения это действие невозможно отменить.</p>
          <button
            onClick={onDeleteClickHandler}
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
    </>
  );
};

export default EditLIstCard;
