import React from 'react';
import SortPopup from './SortPopup';
import { DebounceInput } from 'react-debounce-input';

const Search = ({ fields, onOptionClick, searchFieldValue, onSearchFieldChange }) => {
  function renderPopups(popups) {
    return Object.keys(popups).map((popup, index) => (
      <SortPopup onOptionClick={onOptionClick} key={index} options={popups[popup]} label={popup} />
    ));
  }

  return (
    <div className="search-block specialities-page__search-block">
      {fields && renderPopups(fields)}
      <DebounceInput
        minLength={0}
        debounceTimeout={300}
        onChange={(e) => onSearchFieldChange(e.target.value)}
        value={searchFieldValue}
        className="search-block__search-field"
        placeholder="Искать по названию"
      />
      <i className="search-block__search-icon fi-rr-search"></i>
    </div>
  );
};

export default Search;
