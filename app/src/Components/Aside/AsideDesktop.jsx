/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { ReactComponent as BoardSVG } from '../../assets/icon-board.svg';
import { ReactComponent as LightSVG } from '../../assets/icon-light-theme.svg';
import { ReactComponent as DarkSVG } from '../../assets/icon-dark-theme.svg';
import { ReactComponent as HideSVG } from '../../assets/icon-hide-sidebar.svg';
import SwitchButton from '../Interactive/SwitchButton';
import { hideSidebar } from '../../store/sidebar';
import { boardData } from '../../store/board/boardsActions';
import CreateBoard from '../Modals/CreateBoard';

function AsideDesktop({ setTheme }) {
  const dispatch = useDispatch();
  const { sidebar, boards, tasks } = useSelector((state) => state);
  const [showModalCreateBoard, setShowModalCreateBoard] = useState(false);
  // const navigate = useNavigate();

  const handleSidebar = () => {
    dispatch(hideSidebar());
  };

  const handleBoardData = (id) => {
    dispatch(boardData(id));
    // navigate('/home/123');
  };

  const createBoard = () => {
    setShowModalCreateBoard(true);
  };

  useEffect(() => {
    const firstId = boards.listBoards[0].id;
    dispatch(boardData(firstId));
  }, []);

  return (
    <Container sidebar={sidebar}>
      <AllBoards>All Boards ({boards.listBoards.length})</AllBoards>
      <BoardList>
        {boards.listBoards.map(({ name, id }) => (
          <BoardItem
            key={id}
            current={boards.board?.id === id}
            onClick={() => handleBoardData(id)}
          >
            <BoardSVG />
            {name}
          </BoardItem>
        ))}
      </BoardList>
      <ButtonCreateBoard onClick={createBoard}>
        <BoardSVG />
        + Create New Board
      </ButtonCreateBoard>
      <ThemeMode>
        <LightSVG />
        <SwitchButton setTheme={setTheme} />
        <DarkSVG />
      </ThemeMode>
      <HideSidebar onClick={handleSidebar}>
        <HideSVG />
        <span>Hide Sidebar</span>
      </HideSidebar>
      {showModalCreateBoard && <CreateBoard closeModal={setShowModalCreateBoard} />}
    </Container>
  );
}

AsideDesktop.propTypes = {
  setTheme: PropTypes.func,
};

AsideDesktop.defaultProps = {
  setTheme: () => {},
};

export default AsideDesktop;

const Container = styled.aside`
  background: ${({ theme }) => theme.bgPrimary};
  //min-width: 280px;
  padding-bottom: 32px;
  padding-right: ${({ sidebar }) => (sidebar ? '24px' : '0px')};
  height: 100%;
  border-right: 1px solid ${({ theme }) => theme.lines};
  display: flex;
  flex-direction: column;
  transition: 700ms all;
  width: ${({ sidebar }) => (sidebar ? '348px' : '0')};
  white-space: nowrap;
  position: relative;
  z-index: 300;
  left: ${({ sidebar }) => (sidebar ? '0' : '-160px')};
  font-size: 15px;
`;

const AllBoards = styled.p`
  padding-left: 32px;
  margin-bottom: 16px;
  margin-top: 16px;
  text-transform: uppercase;
  letter-spacing: 2.4px;
  color: ${({ theme }) => theme.textSecundary};
`;

const BoardList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const BoardItem = styled.li`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 0px 14px 32px;
  background: ${({ theme, current }) => current && theme.colorPrimary};
  color: ${({ theme, current }) => (current ? theme.white : theme.textSecundary)};
  border-radius: 0px 100px 100px 0px;
  transition: 0.4s ease-in-out;
  cursor: pointer;
  path {
    fill: ${({ theme, current }) => current && theme.white};
    transition: 0.4s ease-in-out;
  }
`;

const ButtonCreateBoard = styled.button`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 0px 14px 32px;
  color: ${({ theme }) => theme.colorPrimary};
  cursor: pointer;
  path {
    fill: ${({ theme }) => theme.colorPrimary};
  }
`;

const ThemeMode = styled.div`
  background: ${({ theme }) => theme.bgSecundary};
  padding: 14px 50px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 24px;
  margin-top: auto;
  margin-left: 24px;
  margin-bottom: 20px;
`;

const HideSidebar = styled.p`
  margin-left: 32px;
  display: flex;
  align-items: center;
  gap: 14px;
  cursor: pointer;
`;
