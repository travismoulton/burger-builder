import React from 'react';

import classes from './Input.module.css';

const input = (props) => {
  let inputElement = null;
  const inputClasses = [classes.inputElement];

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
  }

  switch (props.elementType) {
    case 'input':
      inputElement = (
        <input
          {...props.elementConfig}
          className={inputClasses.join(' ')}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea
          {...props.elementConfig}
          className={inputClasses.join(' ')}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case 'select':
      inputElement = (
        <select
          {...props.elementConfig}
          className={inputClasses.join(' ')}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map((option) => (
            <option value={option.value} key={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;

    default:
      inputElement = (
        <input className={inputClasses.join(' ')} value={props.value} />
      );
  }

  return (
    <div className={classes.Input}>
      <label className={classes.label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;
