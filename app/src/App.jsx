import { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import light from './styles/light';
import GlobalStyle from './styles/global';
import Header from './Components/Header/Header';

function App() {
  const [theme, setTheme] = useState(light);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Container>
          <GlobalStyle />
          <Header />
          <Routes>
          </Routes>
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
