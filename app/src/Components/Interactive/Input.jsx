import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function Input({ label, placeHolder, type, id, error }) {
  return (
    <div>
      <Label htmlFor={id} error={error}>
        {label}
      </Label>
      <InputStyle type={type} id={id} error={error} placeholder={placeHolder} />
    </div>
  );
}

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  error: PropTypes.string,
  placeHolder: PropTypes.string,
};

Input.defaultProps = {
  label: '',
  type: 'text',
  id: '',
  error: '',
  placeHolder: '',
};

export default Input;

const InputStyle = styled.input`
  width: 100%;
  border-radius: 4px;
  outline: none;
  font-weight: 700;
  padding: 12px 16px;
  border: 1px solid ${({ theme }) => theme.stroke};
  font-family: 'Plus Jakarta Sans';
  &:focus {
    border-color: ${({ theme }) => theme.colorPrimary};
  }
  &::placeholder {
    color: ${({ theme }) => theme.textPrimary};
    opacity: 0.25;
  }
`;

const Label = styled.label`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.textSecundary};
  span {
    font-size: 14px;
  }
`;
