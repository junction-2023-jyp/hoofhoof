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
    <S.ModalOverlay isOpen={true}>
      <S.ModalContent>
        <S.ModalCloseButton />
        <S.ModalTopWrap>
          <S.ModalTopTextWrap>
            <S.ModalHeader>Congratulations!</S.ModalHeader>
            <S.ModalBodyText>
              By cleaning up your inbox today, you've reduced your
              <br />
              digital carbon footprint. Here's how much carbon
              <br />
              emissions you've saved.
            </S.ModalBodyText>
            <S.ModalStatsWrap>
              <S.ModalStats>
                <S.ModalStatsTitle>Now</S.ModalStatsTitle>
                <S.ModalStatsText>10 g</S.ModalStatsText>
              </S.ModalStats>
              <S.ModalStats>
                <S.ModalStatsTitle>Total</S.ModalStatsTitle>
                <S.ModalStatsText>312 g</S.ModalStatsText>
              </S.ModalStats>
            </S.ModalStatsWrap>
          </S.ModalTopTextWrap>
          <S.ModalImage />
        </S.ModalTopWrap>
        <S.ModalDivider />
        <S.ModalBottomWrap>
          <S.ModalEquivalentWrap>
            <S.ModalEquivalentTitle>This is equivalent to</S.ModalEquivalentTitle>
            <S.ModalEquivalentText>producing one medium-sized (150g) beef burger patty</S.ModalEquivalentText>
          </S.ModalEquivalentWrap>
          <S.ModalButton>YEEHAH!!!</S.ModalButton>
        </S.ModalBottomWrap>
      </S.ModalContent>
    </S.ModalOverlay>
  );
};

export default Modal;
