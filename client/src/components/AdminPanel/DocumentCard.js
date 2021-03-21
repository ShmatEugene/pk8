import React from 'react';
import { API_URL } from '../../config';
import Input from '../UI/Input';

const DocumentCard = (props) => {
  const [drag, setDrag] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const fileInputRef = React.useRef();

  const dragStartHandler = (e) => {
    e.preventDefault();
    setDrag(true);
  };
  const dragLeaveHandler = (e) => {
    e.preventDefault();
    setDrag(false);
  };

  const onDropHandler = (e) => {
    e.preventDefault();
    const files = [...e.dataTransfer.files];
    setSelectedFile(files[0]);
    setDrag(false);
    props.onDocumentSelect(files[0], props.index);
  };

  const fileInputClickHandler = () => {
    fileInputRef.current.click();
  };

  const onSelectFiles = () => {
    if (fileInputRef.current.files.length) {
      setSelectedFile(fileInputRef.current.files[0]);
      props.onDocumentSelect(fileInputRef.current.files[0], props.index);
    }
  };

  return (
    <div className={`document-card ${props.classes ? props.classes.join(' ') : ''}`}>
      <Input
        label="Название"
        value={props.title}
        valid={true}
        shouldValidate={false}
        onChange={(e) => props.onTitleChangeHandler(e, props.index)}
      />
      <div className="document-card__delete">
        <button
          onClick={() => props.onDucumentDeleteHandler(props.index)}
          type="button"
          className="delete-button delete-button_small">
          -
        </button>
      </div>
      <div onClick={fileInputClickHandler} className="document-card__file-upload">
        {drag ? (
          <div
            className="document-card__drop-area"
            onDragStart={(e) => dragStartHandler(e)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragOver={(e) => dragStartHandler(e)}
            onDrop={(e) => onDropHandler(e)}>
            Отпустите файлы, чтобы загрузить их
          </div>
        ) : (
          <div
            className="document-card__drag-area"
            onDragStart={(e) => dragStartHandler(e)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragOver={(e) => dragStartHandler(e)}>
            Перетащите файл или кликните здесь для выбора файла
          </div>
        )}
      </div>
      <input
        ref={fileInputRef}
        className="document-card__file-input"
        type="file"
        multiple
        onChange={onSelectFiles}
      />
      <div className="document-card__file-source-name">
        {selectedFile ? `Выбран файл: ${selectedFile.name}` : null}
      </div>
      {!selectedFile && props.link && props.title && props.id ? (
        <a className="document-card__file-link" href={`${API_URL}uploads/${props.link}`}>
          Загружен файл: {props.title}
        </a>
      ) : null}
    </div>
  );
};

export default DocumentCard;
