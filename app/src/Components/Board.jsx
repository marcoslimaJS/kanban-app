import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

function Board() {
  const { board } = useSelector((state) => state.boards);

  return (
    <Container>
      {board?.columns.map(({ name, id: columnId, tasks }) => (
        <Column key={columnId}>
          <ColumnTitle>
            {name}
            {`(${tasks.length})`}
          </ColumnTitle>
          {tasks.map(({ title, id: taskId, subtasks }) => (
            <Task key={taskId}>
              {title}
              <Subtask>
                {subtasks.filter(({ completed }) => completed).length}
                {' '}
                of subtasks
                {' '}
                {subtasks.length}
              </Subtask>
            </Task>
          ))}
        </Column>
      ))}
    </Container>
  );
}

export default Board;

const Container = styled.main`
  padding: 24px;
  display: flex;
  width: 100%;
  gap: 24px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 240px;
`;

const ColumnTitle = styled.h3`
  text-transform: uppercase;
  letter-spacing: 2.4px;
  font-size: 14px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 10px;
  &::before {
    content: '';
    display: inline-block;
    background: red;
    width: 15px;
    height: 15px;
    border-radius: 50%;
  }
`;

const Task = styled.div`
  background: ${({ theme }) => theme.bgPrimary};
  box-shadow: 0px 4px 6px rgba(54, 78, 126, 0.101545);
  padding: 22px 16px;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
`;

const Subtask = styled.p`
  color: ${({ theme }) => theme.textSecundary};
  margin-top: 8px;
  font-size: 14px;
`;
