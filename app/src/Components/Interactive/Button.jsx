import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function Button({ children, bg, hover, color, fnClick }) {
  return (
    <ButtonStyled bg={bg} hover={hover} color={color} onClick={fnClick}>
      {children}
    </ButtonStyled>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  bg: PropTypes.string,
  hover: PropTypes.string,
  color: PropTypes.string,
  fnClick: PropTypes.func,
};

Button.defaultProps = {
  bg: 'colorPrimary',
  hover: 'colorSecundary',
  color: 'white',
  fnClick: () => {},
};

export default Button;

const ButtonStyled = styled.button`
  background: ${({ theme, bg }) => theme[bg]};
  color: ${({ theme, color }) => theme[color]};
  padding: 16px 24px;
  border-radius: 24px;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  &:hover {
    background: ${({ theme, hover }) => theme[hover]};
  }
`;
