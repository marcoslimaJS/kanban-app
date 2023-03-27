import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as BoardSVG } from '../../assets/icon-board.svg';
import { ReactComponent as LightSVG } from '../../assets/icon-light-theme.svg';
import { ReactComponent as DarkSVG } from '../../assets/icon-dark-theme.svg';
import { ReactComponent as HideSVG } from '../../assets/icon-hide-sidebar.svg';
import SwitchButton from '../Interactive/SwitchButton';
import { hideSidebar } from '../../store/sidebar';

function AsideDesktop({ setTheme }) {
  const dispatch = useDispatch();
  const { sidebar } = useSelector((state) => state);

  const handleSidebar = () => {
    dispatch(hideSidebar());
  };

  return (
    <Container sidebar={sidebar}>
      <AllBoards>All Boards (3)</AllBoards>
      <BoardList>
        <BoardItem>
          <BoardSVG />
          Platform
        </BoardItem>
        <BoardItem>
          <BoardSVG />
          Platform
        </BoardItem>
        <BoardItem>
          <BoardSVG />
          Roadmap
        </BoardItem>
      </BoardList>
      <ThemeMode>
        <LightSVG />
        <SwitchButton setTheme={setTheme} />
        <DarkSVG />
      </ThemeMode>
      <HideSidebar onClick={handleSidebar}>
        <HideSVG />
        <span>Hide Sidebar</span>
      </HideSidebar>
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
  padding: 0px 24px 32px 0px;
  //min-width: 280px;
  height: 100%;
  border-right: 1px solid ${({ theme }) => theme.lines};
  display: flex;
  flex-direction: column;
  transition: 500ms all;
  transition: width 300ms cubic-bezier(0.2, 0, 0, 1) 0s;
  width: ${({ sidebar }) => (!sidebar ? '0px' : '280px')};
`;

const AllBoards = styled.p`
  padding-left: 32px;
  margin-bottom: 16px;
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
  padding-left: 32px;
  padding: 14px 90px 14px 32px;
  background: ${({ theme }) => theme.colorPrimary};
  border-radius: 0px 100px 100px 0px;
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
