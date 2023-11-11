// style.ts
import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ModalHeader = styled.h1``;

export const ModalBodyText = styled.p``;

export const ModalStats = styled.div`
  background-color: #eee;
  border-radius: 4px;
  padding: 10px;
  margin: 10px 0;
`;

export const ModalButton = styled.button`
  background-color: #800080;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
