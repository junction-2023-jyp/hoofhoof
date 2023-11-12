import Modal from '../../Modal';
import * as S from './style';
import LoadingLottie from '@assets/loading.json';
import Lottie from 'lottie-react';

interface LoadingModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
const LoadingModal = ({ isOpen, setIsOpen }: LoadingModalProps) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <S.Container>
        <Lottie animationData={LoadingLottie} loop={true} />
      </S.Container>
    </Modal>
  );
};

export default LoadingModal;
