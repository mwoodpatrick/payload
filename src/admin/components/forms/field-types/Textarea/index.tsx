import React, { useCallback } from 'react';
import useField from '../../useField';
import withCondition from '../../withCondition';
import { textarea } from '../../../../../fields/validations';
import { Props } from './types';

import './index.scss';
import TextareaInput from './Input';

const Textarea: React.FC<Props> = (props) => {
  const {
    path: pathFromProps,
    name,
    required,
    validate = textarea,
    admin: {
      readOnly,
      style,
      width,
      placeholder,
      rows,
      description,
      condition,
    } = {},
    label,
    minLength,
    maxLength,
  } = props;

  const path = pathFromProps || name;

  const memoizedValidate = useCallback((value) => {
    const validationResult = validate(value, { minLength, maxLength, required });
    return validationResult;
  }, [validate, maxLength, minLength, required]);

  const {
    value,
    showError,
    setValue,
    errorMessage,
  } = useField({
    path,
    validate: memoizedValidate,
    enableDebouncedValue: true,
    condition,
  });

  return (
    <TextareaInput
      path={path}
      name={name}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      showError={showError}
      errorMessage={errorMessage}
      required={required}
      label={label}
      value={value as string}
      placeholder={placeholder}
      readOnly={readOnly}
      style={style}
      width={width}
      description={description}
      rows={rows}
    />
  );
};
export default withCondition(Textarea);
