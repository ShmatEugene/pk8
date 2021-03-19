import React from 'react';
import Modal from '../UI/Modal';

const EditLIstCard = () => {
  const [modalActive, setModalActive] = React.useState(false);
  return (
    <>
      <div className="edit-posts__edit-list-card edit-list-card">
        <div className="edit-list-card__title">
          Оснащение средствами автоматизации технологических процессов и производств (по отраслям)
        </div>
        <div className="edit-list-card__published">14.03.2021</div>
        <div className="edit-list-card__clicks">221</div>
        <div className="edit-list-card__edit">
          <i className="fi-rr-edit"></i>
        </div>
        <div className="edit-list-card__delete" onClick={() => setModalActive(true)}>
          <i className="fi-rr-trash"></i>
        </div>
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
    </>
  );
};

export default EditLIstCard;
