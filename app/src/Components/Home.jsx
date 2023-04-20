import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import AsideDesktop from './Aside/AsideDesktop';
import Board from './Board';
import Header from './Header/Header';
import { ReactComponent as ShowSVG } from '../assets/icon-show-sidebar.svg';
import { showSidebar } from '../store/sidebar';
import { AnimeLeft } from '../styles/animations';

function Home({ setTheme }) {
  const dispatch = useDispatch();
  const { sidebar } = useSelector((state) => state);

  const handleSidebar = () => {
    dispatch(showSidebar());
  };

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    // console.log(token, userId);
  }, []);

  return (
    <Container>
      <Header />
      <Content>
        <AsideDesktop setTheme={setTheme} />
        {!sidebar && (
          <ShowSidebar onClick={handleSidebar}>
            <ShowSVG />
          </ShowSidebar>
        )}
        <Board />
      </Content>
    </Container>
  );
}

Home.propTypes = {
  setTheme: PropTypes.func,
};

Home.defaultProps = {
  setTheme: () => {},
};

export default Home;

const Container = styled.section`
  display: flex;
  flex-direction: column;
  height: 100vh;
  animation: ${AnimeLeft} 0.5 ease-in-out;
`;

const Content = styled.div`
  display: flex;
  height: 100%;
`;

const ShowSidebar = styled.div`
  background: ${({ theme }) => theme.colorPrimary};
  padding: 18px 22px 18px 18px;
  position: fixed;
  z-index: 1000;
  bottom: 32px;
  border-radius: 0px 100px 100px 0px;
  cursor: pointer;
  animation: ${AnimeLeft} 0.5s ease-in-out;
`;
