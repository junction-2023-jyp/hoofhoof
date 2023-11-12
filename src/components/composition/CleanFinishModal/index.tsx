import Modal from '../../Modal';
import * as S from './style';
import LoadingLottie from '@assets/loading.json';
import Lottie from 'lottie-react';

interface CleanFinishModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
const CleanFinishModal = ({ isOpen, setIsOpen }: CleanFinishModalProps) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <S.Container>
        <Lottie animationData={LoadingLottie} loop={true} />
        <S.Description>
          Clean up
          <br />
          your carbon footprint
        </S.Description>
      </S.Container>
    </Modal>
  );
};

export default CleanFinishModal;
