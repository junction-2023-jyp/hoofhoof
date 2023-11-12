import Modal from '../../Modal';
import * as S from './style';

interface CleanAlertProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
const CleanAlert = ({ isOpen, setIsOpen }: CleanAlertProps) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <S.Container>
        <S.Title>
          BEFORE
          <br />
          YOU PROCEED
        </S.Title>
        <S.Description>
          <span>Deleting your emails cannot be undone.</span>
          <span>
            Are you ready to reduce your digital clutter, and, in turn, minimize
            <br />
            your carbon footprint?
          </span>
        </S.Description>
        <S.Button>CONFIRM</S.Button>
      </S.Container>
    </Modal>
  );
};

export default CleanAlert;
