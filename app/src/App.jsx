import { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import light from './styles/light';
import GlobalStyle from './styles/global';
import Login from './Components/Login';
import ProtectedRoute from './Components/helper/ProtectedRoute';
import Home from './Components/Home';

function App() {
  const [theme, setTheme] = useState(light);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Container>
          <GlobalStyle />
          <Routes>
            <Route path="login/*" element={<Login />} />
            <Route
              path="/"
              element={(
                <ProtectedRoute>
                  <Home setTheme={setTheme}/>
                </ProtectedRoute>
              )}
            />
          </Routes>
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;

const Container = styled.section`
  min-height: 100vh;
`;
