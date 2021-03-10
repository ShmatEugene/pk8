import React from 'react';

const DocsList = () => {
  const documents = [
    {
      type: 'pdf',
      title:
        'Положение о порядке оформления, возникновения, приостановления и прекращения отношений между колледжем и обучающимися и(или) их родителями',
      link: '/',
    },
    {
      type: 'pdf',
      title:
        'Положение о порядке оформления, возникновения, приостановления и прекращения отношений между колледжем и обучающимися и(или) их родителями',
      link: '/',
    },
  ];

  function renderDocumentsList(documents) {
    return documents.map((document, index) => (
      <li className="documents-list__item">
        <span className="documents-list__extension">{document.type}</span>
        <a className="documents-list__link" href="#">
          {document.title}
        </a>
      </li>
    ));
  }
  return <ul className="post__documents-list documents-list">{renderDocumentsList(documents)}</ul>;
};

export default DocsList;
