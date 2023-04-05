import React from 'react';
import styled from 'styled-components';
// import { ReactComponent as LogoLight } from '../../assets/logo-light.svg';
import { useSelector } from 'react-redux';
import { ReactComponent as LogoDark } from '../../assets/logo-dark.svg';
import { ReactComponent as EditSVG } from '../../assets/icon-vertical-ellipsis.svg';
import Button from '../Interactive/Button';

function Header() {
  const { board } = useSelector((state) => state.boards);

  return (
    <HeaderHtml>
      <Logo>
        <LogoDark />
      </Logo>
      <TitleBoard>{board?.name}</TitleBoard>
      <ButtonsContainer>
        <Button>+ Add New Task</Button>
        <EditButton>
          <EditSVG />
        </EditButton>
      </ButtonsContainer>
    </HeaderHtml>
  );
}

export default Header;

const HeaderHtml = styled.header`
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 12px 24px 12px 24px;
  box-shadow: 0px 4px 6px rgba(54, 78, 126, 0.101545);
  background: ${({ theme }) => theme.bgPrimary};
`;

const Logo = styled.div`
  //border-right: 1px solid ${({ theme }) => theme.lines};
  padding-right: 32px;
  position: relative;
  width: 257px;
  &::after {
    content: '';
    display: inline-block;
    width: 1px;
    height: 96px;
    background: ${({ theme }) => theme.lines};
    position: absolute;
    top: -30px;
    right: -4px;
  }
`;

const TitleBoard = styled.h1`
  font-size: 20px;
`;

const ButtonsContainer = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 24px;
`;

const EditButton = styled.button``;
