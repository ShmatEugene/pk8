import React from 'react';

const SortPopup = ({ options, onOptionClick, label }) => {
  const [active, setActive] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState(options[0]);
  const sortRef = React.useRef();

  const optionClickHandler = (option) => {
    const isDefaultOption = option === options[0];

    isDefaultOption ? onOptionClick(label, false) : onOptionClick(label, option);

    setSelectedOption(option);
    setActive(false);
  };

  const handleOutsideClick = (event) => {
    const path = event.path || (event.composedPath && event.composedPath());
    if (!path.includes(sortRef.current)) {
      setActive(false);
    }
  };

  React.useEffect(() => {
    document.body.addEventListener('click', handleOutsideClick);
  }, []);

  function renderOptions(items) {
    return items.map((item, index) => (
      <li onClick={() => optionClickHandler(item)} key={index}>
        {item}
      </li>
    ));
  }
  return (
    <div ref={sortRef} onClick={() => setActive(!active)} className="search-block__sort sort">
      {selectedOption} <i className="fi-rr-angle-small-down"></i>
      <div className={`sort__popup ${active ? 'sort__popup_active' : ''}`}>
        <ul className="sort__list">{options && renderOptions(options)}</ul>
      </div>
    </div>
  );
};

export default SortPopup;
