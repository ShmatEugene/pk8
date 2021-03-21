import React from 'react';

const BulletList = ({ items }) => {
  function renderItems(items) {
    return items.map((item, index) => {
      <li className="bullet-list__item">{item}</li>;
    });
  }
  return <ul className="post__bullet-list bullet-list">{items && renderItems(items)}</ul>;
};

export default BulletList;
