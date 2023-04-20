import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Modal from './Modal';
import { getTaskById } from '../../store/board/tasks';
import { ReactComponent as EditSVG } from '../../assets/icon-vertical-ellipsis.svg';

function ViewTask({ taskId, closeModal }) {
  const task = useSelector(({ boards }) => getTaskById(boards.board, taskId));

  console.log(task);

  if (!taskId) return null;

  const closeViewModal = () => {
    closeModal(false);
  };

  const handleDeleteTask = () => {};

  return (
    <Modal onClose={closeViewModal}>
      <ViewTaskContent>
        <Title>
          {task.title}
          <EditButton onClick={handleDeleteTask}>
            <EditSVG />
          </EditButton>
        </Title>
        <Description>{task.description}</Description>
        <Subtasks>
          <span>
            Subtasks (
            {task.subtasks.filter(({ completed }) => completed).length}
            {' '}
            of
            {' '}
            {task.subtasks.length}
            )
          </span>
          {task.subtasks.map(({ id, title, completed }) => (
            <Subtask key={id}>
              <Checkbox></Checkbox>
              <p>{title}</p>
            </Subtask>
          ))}
        </Subtasks>
      </ViewTaskContent>
    </Modal>
  );
}

ViewTask.propTypes = {
  taskId: PropTypes.string,
  closeModal: PropTypes.func,
};

ViewTask.defaultProps = {
  taskId: null,
  closeModal: () => {},
};

export default ViewTask;

const ViewTaskContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Title = styled.h1`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
`;

const EditButton = styled.button``;

const Description = styled.div`
  color: ${({ theme }) => theme.textSecundary};
  line-height: 23px;
  font-size: 16px;
`;

const Subtasks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  span {
    font-weight: 700;
    margin-bottom: 8px;
  }
`;

const Subtask = styled.div`
  background: ${({ theme }) => theme.bgSecundary};
  border-radius: 4px;
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Checkbox = styled.div`

`;
