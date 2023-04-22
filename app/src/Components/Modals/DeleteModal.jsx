import React from 'react';
import styled from 'styled-components';
import Modal from './Modal';
import Button from '../Interactive/Button';

function DeleteModal({ taskId, closeModal }) {
  const closeDeleteModal = () => {
    closeModal(false);
  };

  return (
    <Modal onClose={closeDeleteModal}>
      <DeleteModalContent>
        <Title>Delete this Task</Title>
        <Description>
          Are you sure you want to delete the ‘Build settings UI’ task and its
          subtasks? This action cannot be reversed.
        </Description>
        <ButtonsContainer>
          <Button bg="delete" color="white" >Delete</Button>
          <Button bg="colorQuaternary" color="colorPrimary">
            Cancel
          </Button>
        </ButtonsContainer>
      </DeleteModalContent>
    </Modal>
  );
}

export default DeleteModal;

const DeleteModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Title = styled.h3`
  color: ${({ theme }) => theme.delete};
  font-size: 20px;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.textSecundary};
  font-size: 14px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;
