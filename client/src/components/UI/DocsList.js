import React from 'react';
import { API_URL } from '../../config';

const DocsList = (props) => {
  // const documents = [
  //   {
  //     type: 'pdf',
  //     title:
  //       'Положение о порядке оформления, возникновения, приостановления и прекращения отношений между колледжем и обучающимися и(или) их родителями',
  //     link: '/',
  //   },
  //   {
  //     type: 'pdf',
  //     title:
  //       'Положение о порядке оформления, возникновения, приостановления и прекращения отношений между колледжем и обучающимися и(или) их родителями',
  //     link: '/',
  //   },
  // ];

  function renderDocumentsList(documents) {
    return documents.map((document, index) => (
      <li key={document.link + index} className="documents-list__item">
        <span className="documents-list__extension">{document.link.match(/\.[^/.]+$/, '')[0]}</span>
        <a
          className="documents-list__link"
          href={`${API_URL}uploads/${document.link}`}
          target="_blank">
          {document.title}
        </a>
      </li>
    ));
  }
  return (
    <ul className="post__documents-list documents-list">
      {props.documents && renderDocumentsList(props.documents)}
    </ul>
  );
};

export default DocsList;
