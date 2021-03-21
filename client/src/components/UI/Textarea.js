import React from 'react';

function isInvalid({ valid, touched, shouldValidate }) {
  return !valid && shouldValidate && touched;
}

const Textarea = (props) => {
  const htmlFor = 'textarea-' + Math.random();
  return (
    <div
      className={`textarea ${props.classes ? props.classes.join(' ') : ''}${
        isInvalid(props) ? ' textarea_invalid' : ''
      }`}>
      <label className="textarea__label" htmlFor={htmlFor}>
        {props.label}
      </label>
      <textarea
        className={`textarea__field ${isInvalid(props) ? 'textarea__field_invalid' : ''}`}
        name={htmlFor}
        cols={props.cols}
        rows={props.rows}
        value={props.value}
        onChange={props.onChange}></textarea>
    </div>
  );
};

export default Textarea;
