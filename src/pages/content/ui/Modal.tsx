// Modal.tsx
import React from 'react';
import * as S from './style';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <S.ModalOverlay>
      <S.ModalContent>
        <S.ModalHeader>Congratulations!</S.ModalHeader>
        <S.ModalBodyText>
          {/* By cleaning up your inbox today, you've reduced your digital carbon footprint. Here's how much carbon */}
          {/* emissions you've saved */}
        </S.ModalBodyText>
        <S.ModalStats>
          <div>
            Today <strong>10 g</strong>
          </div>
          <div>
            Total <strong>312 g</strong>
          </div>
        </S.ModalStats>
        <S.ModalBodyText>This is equivalent to producing one medium-sized (150g) beef burger patty</S.ModalBodyText>
        <S.ModalButton onClick={onClose}>YEEHAW!!!</S.ModalButton>
      </S.ModalContent>
    </S.ModalOverlay>
  );
};

export default Modal;
