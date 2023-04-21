import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Modal from './Modal';
import { getTaskById } from '../../store/board/tasks';
import { ReactComponent as EditSVG } from '../../assets/icon-vertical-ellipsis.svg';
import { ReactComponent as CheckIcon } from '../../assets/icon-check.svg';
import DropDown from '../Interactive/DropDown';

function ViewTask({ taskId, closeModal }) {
  const task = useSelector(({ boards }) => getTaskById(boards.board, taskId));
  const { columns } = useSelector(({ boards }) => boards.board);

  console.log(task);

  const options = columns.map(({ id, name }) => ({ label: name, value: id }));
  const [status, setStatus] = useState(options[options.length - 1]);

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
            <Subtask key={id} completed={completed}>
              <Checkbox>
                {completed && <CheckIcon />}
              </Checkbox>
              <p>{title}</p>
            </Subtask>
          ))}
        </Subtasks>
        <DropDown
          options={options}
          label="Current Status"
          value={status}
          setValue={setStatus}
        />
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
    color: ${({ theme }) => theme.textSecundary};
  }
`;

const Subtask = styled.div`
  background: ${({ theme }) => theme.bgSecundary};
  border-radius: 4px;
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 16px;
  font-weight: 700;
  p {
    text-decoration: ${({ completed }) => (completed ? 'line-through' : 'none')};
    opacity: ${({ completed }) => (completed ? 0.5 : 1)};
  }
`;

const Checkbox = styled.div`
  height: 16px;
  width: 16px;
  border: 1px solid ${({ theme }) => theme.stroke};
  border-radius: 2px;
  background: ${({ theme, completed }) => (completed ? theme.colorPrimary : theme.white)};
  display: flex;
  align-items: center;
  justify-content: center;
`;
