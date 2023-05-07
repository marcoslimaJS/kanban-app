import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ViewTask from './Modals/ViewTask';
import useMedia from '../Hooks/useMedia';

function Board() {
  const { board } = useSelector((state) => state.boards);
  const { sidebar } = useSelector((state) => state);
  const mobile = useMedia('(max-width: 640px)');
  const taskElement = useRef([]);
  const columnsElement = useRef([]);
  const [allTasks, setAllTasks] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [wasMoved, setWasMoved] = useState(false);
  const [position, setPosition] = useState(null);
  const [modalViewTask, setModalViewTask] = useState(null);
  const [dropTask, setDropTask] = useState('');

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = (event, taskId) => {
    setWasMoved(true);
    let e = event;
    if (e.type === 'touchmove') {
      e = event.touches[0];
    }
    if (isDragging) {
      setDropTask(taskId);
      if (sidebar) {
        setPosition({ x: e.clientX - 440, y: e.clientY - 135 });
      } else {
        setPosition({ x: e.clientX - 140, y: e.clientY - 135 });
      }
    }
  };

  const adjustTaskInColumn = () => {
    const x = sidebar ? position.x + 300 : position.x;
    const columnsPosition = columnsElement.current.map((column) => {
      const { right } = column.getBoundingClientRect();
      return { x: right };
    });
    const taskCurrent = allTasks.find(({ id }) => id === dropTask);
    console.log(`${x}: Posição da Task`);
    console.log(`${columnsPosition[0].x}: Posição da Coluna 1`);
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
    adjustTaskInColumn();
    setDropTask('');
    setPosition(null);
    console.log('MouseUp no pulo');
  };

  const handleViewTaskModal = (taskId) => {
    if (wasMoved) {
      setWasMoved(false);
    } else {
      setModalViewTask(taskId);
    }
  };

  const getAllTasksOfBoard = () => {
    const tasks = columnsElement.current.reduce((accum, column) => {
      const onlyTask = [...column.children].filter(({ id }) => id);
      return [...accum, ...onlyTask];
    }, []);
    setAllTasks(tasks);
  };

  useEffect(() => {
    // const task = taskElement?.current?.getBoundingClientRect();
    // console.log(task);
  });

  useEffect(() => {
    const columns = columnsElement?.current;
    if (columns.length) {
      console.log('ifffffffff');
      getAllTasksOfBoard();
    }
  }, [sidebar, board?.columns]);

  return (
    <Container sidebar={sidebar} mobile={mobile}>
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
              onMouseMove={
                isDragging ? (e) => handleMouseMove(e, taskId) : undefined
              }
              onMouseUp={handleMouseUp}
              onTouchStart={handleMouseDown}
              onTouchMove={
                isDragging ? (e) => handleMouseMove(e, taskId) : undefined
              }
              onTouchEnd={handleMouseUp}
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
  position: relative;
  padding: 24px;
  display: grid;
  grid-template-columns: repeat(auto-fit, 280px);
  grid-auto-flow: column;
  gap: 24px;
  overflow: auto;
  height: calc(100vh - 90px);
  transition: 700ms all;
  width: ${({ sidebar, mobile }) => (
    sidebar && !mobile ? 'calc(100vw - 300px)' : '100vw')};
  margin-left: ${({ sidebar, mobile }) => (
    sidebar && !mobile ? '300px' : '0px')};
  @media (max-width: 768px) {
    width: ${({ sidebar, mobile }) => (
    sidebar && !mobile ? 'calc(100vw - 260px)' : '100vw')};
    margin-left: ${({ sidebar, mobile }) => (
    sidebar && !mobile ? '260px' : '0px')};
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 280px;
  border: 1px solid red;
`;

const ColumnTitle = styled.h3`
  text-transform: uppercase;
  letter-spacing: 2.4px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 10px;
  //position: fixed;
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
  font-size: 16px;
  font-weight: 700;
  cursor: move;
  position: ${({ drop, id }) => (drop === id ? 'absolute' : 'initial')};
  width: 280px;
  left: ${({ position }) => position && position.x}px;
  top: ${({ position }) => position && position.y}px;
  user-select: none;
`;

const Subtask = styled.p`
  color: ${({ theme }) => theme.textSecundary};
  margin-top: 8px;
  font-size: 13px;
`;
