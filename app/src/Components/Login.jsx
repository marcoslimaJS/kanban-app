import React from 'react';
import styled from 'styled-components';
import { ReactComponent as ImgSVG } from '../assets/scrum-board.svg';
import Button from './Interactive/Button';
import Input from './Interactive/Input';

function Login() {
  return (
    <Container>
      <ColumnImg>
        <ImgSVG />
      </ColumnImg>
      <Content>
        <Title>Login</Title>
        <FormLogin>
          <Input label="Username" id="username" placeHolder="Enter task name" />
          <Input label="Password" id="password" />
          <Button bg="white" color="red">
            Login
          </Button>
        </FormLogin>
      </Content>
    </Container>
  );
}

export default Login;

const Container = styled.main`
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
  grid-gap: 2rem;
  gap: 2rem;
  background-image: linear-gradient(315deg, #6e72fc 0%, #ad1deb 74%);
`;

const ColumnImg = styled.div`
  svg {
    width: 100%;
  }
`;

const Content = styled.div`
  padding: 20px;
  margin-top: 100px;

  input {
    margin-bottom: 20px;
    max-width: 450px;
  }
`;

const Title = styled.h1`
  line-height: 1;
  font-size: 3rem;
  position: relative;
  margin-bottom: 30px;
  z-index: 1;
  color: ${({ theme }) => theme.white};

  &::after {
    content: '';
    display: block;
    width: 1.5rem;
    height: 1.5rem;
    background: #280074;
    position: absolute;
    bottom: 0px;
    left: -5px;
    border-radius: 0.2rem;
    z-index: -1;
  }
`;

const FormLogin = styled.form`
  label {
    color: #fff;
  }
`;
