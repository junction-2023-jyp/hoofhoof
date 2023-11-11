// Modal.tsx
import React from 'react';
import { ModalOverlay, ModalContent, ModalHeader, ModalBodyText, ModalStats, ModalButton } from './style';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>Congratulations!</ModalHeader>
        <ModalBodyText>
          {/* By cleaning up your inbox today, you've reduced your digital carbon footprint. Here's how much carbon */}
          {/* emissions you've saved */}
        </ModalBodyText>
        <ModalStats>
          <div>
            Today <strong>10 g</strong>
          </div>
          <div>
            Total <strong>312 g</strong>
          </div>
        </ModalStats>
        <ModalBodyText>This is equivalent to producing one medium-sized (150g) beef burger patty</ModalBodyText>
        <ModalButton onClick={onClose}>YEEHAW!!!</ModalButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
