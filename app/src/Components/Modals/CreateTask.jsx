import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import useForm from '../../Hooks/useForm';
import Modal from './Modal';
import Button from '../Interactive/Button';
import DropDown from '../Interactive/DropDown';
import Textarea from '../Interactive/Textarea';
import Input from '../Interactive/Input';
import { ReactComponent as Remove } from '../../assets/icon-cross.svg';
import { createTask } from '../../store/board/tasksActions';

function CreateTask({ closeModal }) {
  const { board } = useSelector((state) => state.boards);
  const dispatch = useDispatch();
  const options = board.columns.map(({ name, id }) => ({
    label: name,
    value: id,
  }));
  const [status, setStatus] = useState(options[options.length - 1]);
  const title = useForm();
  const description = useForm();
  const [subtasks, setSubtasks] = useState([]);

  const closeModalCreateTask = () => {
    closeModal(false);
  };

  const createNewSubtask = () => {
    setSubtasks([...subtasks, '']);
  };

  const removeSubtask = (index) => {
    const newValues = [...subtasks];
    newValues.splice(index, 1);
    setSubtasks(newValues);
  };

  const changeSubstasks = (event, index) => {
    const newValues = [...subtasks];
    newValues[index] = event.target.value;
    setSubtasks(newValues);
  };

  const handleCreateTask = (e) => {
    e.preventDefault();
    console.log(title.value, description.value, subtasks);
    const body = {
      title: title.value,
      description: description.value,
      subtasks,
    };
    dispatch(createTask({ columnId: status.value, body }));
    closeModalCreateTask();
  };

  return (
    <Modal onClose={closeModalCreateTask}>
      <CreateTaskContent onSubmit={handleCreateTask}>
        <h2>Add New Task</h2>
        <Input
          label="Title"
          id="title"
          placeHolder="e.g. Take coffee break"
          {...title}
        />
        <Textarea
          label="Description"
          id="description"
          placeHolder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
          {...description}
        />
        <SubtasksContainer>
          <p>Subtasks</p>
          {subtasks.map((item, index) => (
            <SubtaskInput key={index}>
              <Input
                placeHolder="Subtask"
                onChange={(event) => changeSubstasks(event, index)}
              />
              <Remove onClick={() => removeSubtask(index)} data-index={index} />
            </SubtaskInput>
          ))}
          <Button
            bg="colorQuaternary"
            color="colorPrimary"
            type="button"
            fnClick={createNewSubtask}
          >
            + Add New Subtask
          </Button>
        </SubtasksContainer>
        <DropDown
          options={options}
          label="Status"
          value={status}
          setValue={setStatus}
        />
        <Button type="submit">Create Task</Button>
      </CreateTaskContent>
    </Modal>
  );
}

CreateTask.propTypes = {
  closeModal: PropTypes.func,
};

CreateTask.defaultProps = {
  closeModal: () => {},
};

export default CreateTask;

const CreateTaskContent = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const SubtasksContainer = styled.div`
  p {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    font-weight: 700;
    color: ${({ theme }) => theme.textSecundary};
  }
`;

const SubtaskInput = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
  svg {
    cursor: pointer;
  }
`;
