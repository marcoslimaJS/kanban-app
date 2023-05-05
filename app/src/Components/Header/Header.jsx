import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
// import { ReactComponent as LogoLight } from '../../assets/logo-light.svg';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as LogoDark } from '../../assets/logo-dark.svg';
import { ReactComponent as LogoMobile } from '../../assets/logo-mobile.svg';
import { ReactComponent as ConfigSVG } from '../../assets/icon-vertical-ellipsis.svg';
import { ReactComponent as ArrowIcon } from '../../assets/icon-chevron-down.svg';
import Button from '../Interactive/Button';
import CreateTask from '../Modals/CreateTask';
import DeleteModal from '../Modals/DeleteModal';
import CreateBoard from '../Modals/CreateBoard';
import useMedia from '../../Hooks/useMedia';
import { hideSidebar, showSidebar } from '../../store/sidebar';
import AsideDesktop from '../Aside/AsideDesktop';

function Header() {
  const {
    boards: { board },
    sidebar,
  } = useSelector((state) => state);
  const [ModalCreateTask, setModalCreateTask] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [showModalEditBoard, setShowModalEditBoard] = useState(false);
  const [showModalDeleteBoard, setShowModalDeleteBoard] = useState(false);
  const configRef = useRef(null);
  const mobile = useMedia('(max-width: 640px)');
  const dispatch = useDispatch();
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

  const handleSidebar = () => {
    dispatch(showSidebar());
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
      <Logo sidebar={sidebar} mobile={mobile}>
        {!mobile ? <LogoDark /> : <LogoMobile />}
      </Logo>
      <HeaderContent>
        <TitleBoard onClick={mobile && handleSidebar}>
          {board?.name}
          {mobile && <ArrowIcon />}
        </TitleBoard>
        <ButtonsContainer>
          <Button fnClick={openModalCreateTask} mobile={mobile}>
            + Add New Task
          </Button>
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
      </HeaderContent>
    </HeaderElement>
  );
}

export default Header;

const HeaderElement = styled.header`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  background: ${({ theme }) => theme.bgPrimary};
  position: relative;
  z-index: 500;
`;

const Logo = styled.div`
  border-right: 1px solid ${({ theme }) => theme.lines};
  display: flex;
  align-items: center;
  width: 300px;
  padding: 24px;
  height: 100%;
  transition: all 700ms ease 0s;
  box-shadow: ${({ sidebar }) => (
    sidebar ? 'none' : '-3px 4px 6px rgba(54, 78, 126, 0.101545)')};
  @media (max-width: 768px) {
    width: 260px;
  }
  @media (max-width: 640px) {
    border-right: none;
    width: 100%;
    padding: 20px 16px;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 24px;
  box-shadow: 3px 4px 6px rgba(54, 78, 126, 0.101545);
  @media (max-width: 640px) {
    padding: 20px 16px 20px 0px;
  }
`;

const TitleBoard = styled.h1`
  font-size: 24px;
  display: flex;
  align-items: center;
  gap: 8px;
  & svg {
    position: relative;
    top: 3px;
  }
  @media (max-width: 768px) {
    font-size: 20px;
  }
  @media (max-width: 640px) {
    cursor: pointer;
  }
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

const SidebarMobile = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  padding: 48px 0px;
`;
