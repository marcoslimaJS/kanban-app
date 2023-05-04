import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ViewTask from './Modals/ViewTask';

function Board() {
  const { board } = useSelector((state) => state.boards);
  const { sidebar } = useSelector((state) => state);
  const [columnsPosition, setColumnsPosition] = useState([]);
  const taskElement = useRef([]);
  const columnsElement = useRef([]);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(null);
  const [modalViewTask, setModalViewTask] = useState(null);
  const [dropTask, setDropTask] = useState('');

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = (e, taskId) => {
    console.log('teste');
    // console.log(dropTask);
    if (isDragging) {
      setDropTask(taskId);
      if (sidebar) {
        setPosition({ x: e.clientX - 400, y: e.clientY - 115 });
      } else {
        setPosition({ x: e.clientX - 100, y: e.clientY - 115 });
      }
    }
  };
  console.log(position);

  const adjustTaskInColumn = () => {
    const x = position?.x;
    // console.log(dropTask);
    const taskCurrent = taskElement.current.find(({ id }) => id === dropTask);
    console.log(`${x}: Posição da Task`);
    console.log(columnsPosition);
    if (x < columnsPosition[0].x) {
      console.log('primeira coluna');
      columnsElement.current[0].appendChild(taskCurrent);
    } else if (x < columnsPosition[1].x) {
      console.log('segunda coluna');
      columnsElement.current[1].appendChild(taskCurrent);
    } else if (x < columnsPosition[2].x) {
      console.log('terceira coluna');
      columnsElement.current[2].appendChild(taskCurrent);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    console.log(position);
    adjustTaskInColumn();
    setDropTask('');
    console.log('MouseUp no pulo');
  };

  const handleViewTaskModal = (taskId) => {
    setModalViewTask(taskId);
  };

  useEffect(() => {
    // const task = taskElement?.current?.getBoundingClientRect();
    // console.log(task);
  });

  useEffect(() => {
    console.log('useffect siderbar');
    const columns = columnsElement?.current;
    if (columns) {
      console.log('ifffffffff');
      const positions = columns.map((column) => {
        const { right } = column.getBoundingClientRect();
        return { x: right };
      });
      setColumnsPosition(positions);
    }
  }, [sidebar]);
  console.log(columnsPosition);

  return (
    <Container>
      {board?.columns.map(({ name, id: columnId, tasks }, index) => (
        <Column
          key={columnId}
          ref={(element) => {
            columnsElement.current[index] = element;
          }}
        >
          <ColumnTitle>
            {name}
            {`(${tasks.length})`}
          </ColumnTitle>
          {tasks.map(({ title, id: taskId, subtasks }, i) => (
            <Task
              ref={(element) => {
                taskElement.current[i] = element;
              }}
              key={taskId}
              onMouseDown={handleMouseDown}
              onMouseMove={isDragging ? ((e) => handleMouseMove(e, taskId)) : undefined}
              onMouseUp={handleMouseUp}
              onClick={() => handleViewTaskModal(taskId)}
              position={position}
              drop={dropTask}
              id={taskId}
            >
              {title}
              <Subtask>
                {subtasks.filter(({ completed }) => completed).length}
                {' '}
                of
                {' '}
                {subtasks.length}
                {' '}
                subtasks
              </Subtask>
            </Task>
          ))}
        </Column>
      ))}
      {modalViewTask && (
        <ViewTask taskId={modalViewTask} closeModal={setModalViewTask} />
      )}
    </Container>
  );
}

export default Board;

const Container = styled.main`
  padding: 24px;
  display: flex;
  width: 100%;
  gap: 24px;
  position: relative;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 240px;
  border: 1px solid red;
`;

const ColumnTitle = styled.h3`
  text-transform: uppercase;
  letter-spacing: 2.4px;
  font-size: 14px;
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
  background: #b8b8ce;
  box-shadow: 0px 4px 6px rgba(54, 78, 126, 0.101545);
  padding: 22px 16px;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 700;
  cursor: move;
  position: ${({ drop, id }) => (drop === id ? 'absolute' : 'initial')};
  width: 236px;
  left: ${({ position }) => position && position.x}px;
  top: ${({ position }) => position && position.y}px;
  user-select: none;
`;

const Subtask = styled.p`
  color: ${({ theme }) => theme.textSecundary};
  margin-top: 8px;
  font-size: 14px;
`;
