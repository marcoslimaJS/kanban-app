import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
// import { ReactComponent as LogoLight } from '../../assets/logo-light.svg';
import { useSelector } from 'react-redux';
import { ReactComponent as LogoDark } from '../../assets/logo-dark.svg';
import { ReactComponent as ConfigSVG } from '../../assets/icon-vertical-ellipsis.svg';
import Button from '../Interactive/Button';
import CreateTask from '../Modals/CreateTask';
import DeleteModal from '../Modals/DeleteModal';
import CreateBoard from '../Modals/CreateBoard';

function Header() {
  const { board } = useSelector((state) => state.boards);
  const [ModalCreateTask, setModalCreateTask] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [showModalEditBoard, setShowModalEditBoard] = useState(false);
  const [showModalDeleteBoard, setShowModalDeleteBoard] = useState(false);
  const configRef = useRef(null);
  console.log(board);
  const dataBoard = {
    name: board?.name,
    userId: localStorage.getItem('userId'),
    type: 'board',
  };

  const openModalCreateTask = () => {
    setModalCreateTask(true);
  };

  const openConfigModal = () => {
    setShowConfigModal(!showConfigModal);
  };

  const openModalEditBoard = () => {
    setShowModalEditBoard(true);
  };

  const openModalDeleteBoard = () => {
    setShowModalDeleteBoard(true);
  };

  useEffect(() => {
    const handleOutsideClick = ({ target }) => {
      if (!configRef?.current.contains(target)) {
        setShowConfigModal(false);
      }
    };
    if (showConfigModal) {
      document.body.addEventListener('click', handleOutsideClick);
    }
    return () => {
      document.body.removeEventListener('click', handleOutsideClick);
    };
  }, [showConfigModal]);

  return (
    <HeaderElement>
      <Logo>
        <LogoDark />
      </Logo>
      <TitleBoard>{board?.name}</TitleBoard>
      <ButtonsContainer>
        <Button fnClick={openModalCreateTask}>+ Add New Task</Button>
        {ModalCreateTask && <CreateTask closeModal={setModalCreateTask} />}
        <ConfigContainer ref={configRef}>
          <ConfigButton onClick={openConfigModal}>
            <ConfigSVG />
          </ConfigButton>
          {showConfigModal && (
            <ConfigModal>
              <EditButton onClick={openModalEditBoard}>Edit Board</EditButton>
              <DeleteButton onClick={openModalDeleteBoard}>
                Delete Board
              </DeleteButton>
            </ConfigModal>
          )}
        </ConfigContainer>
      </ButtonsContainer>
      {showModalEditBoard && (
        <CreateBoard boardId={board?.id} closeModal={setShowModalEditBoard} />
      )}
      {showModalDeleteBoard && (
        <DeleteModal
          id={board?.id}
          closeModal={setShowModalDeleteBoard}
          data={dataBoard}
        />
      )}
    </HeaderElement>
  );
}

export default Header;

const HeaderElement = styled.header`
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 12px 24px 12px 24px;
  box-shadow: 0px 4px 6px rgba(54, 78, 126, 0.101545);
  background: ${({ theme }) => theme.bgPrimary};
  position: relative;
  z-index: 500;
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
  gap: 14px;
`;

const ConfigContainer = styled.div``;

const ConfigButton = styled.button`
  cursor: pointer;
  padding: 5px 10px;
`;

const ConfigModal = styled.div`
  position: absolute;
  right: 20px;
  top: 60px;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-shadow: 0px 10px 20px rgba(54, 78, 126, 0.25);
  background: ${({ theme }) => theme.bgPrimary};
  width: 192px;
`;

const EditButton = styled.button`
  color: ${({ theme }) => theme.textSecundary};
  text-align: start;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  color: ${({ theme }) => theme.delete};
  text-align: start;
  cursor: pointer;
`;
