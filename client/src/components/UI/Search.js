import React from 'react';

const Search = () => {
  return (
    <div className="search-block specialities-page__search-block">
      <div className="search-block__sort">
        Укрупненная группа <i className="fi-rr-angle-small-down"></i>
      </div>
      <div className="search-block__sort sort">
        После 11 классов <i className="fi-rr-angle-small-down"></i>
        <div className="sort__popup">
          <ul className="sort__list">
            <li>После 9 классов</li>
            <li>После 9 классов</li>
            <li>После 11 классов</li>
          </ul>
        </div>
      </div>
      <input placeholder="Искать по названию" className="search-block__search-field" type="text" />
      <i className="search-block__search-icon fi-rr-search"></i>
    </div>
  );
};

export default Search;
