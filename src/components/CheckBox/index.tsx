import { CheckIcon } from '@root/src/assets/icons/check';
import * as S from './style';

interface CheckBoxProps {
  checked?: boolean;
  onClick: () => void;
  isDisabled?: boolean;
}

const CheckBox = ({ checked, isDisabled, onClick, ...props }: CheckBoxProps) => {
  const handleClickToggle = () => {
    onClick();
    console.log('click');
  };
  return (
    <S.Container checked={checked} {...props} onClick={handleClickToggle}>
      {(checked || null) ? <CheckIcon size={8} /> : null}
    </S.Container>
  );
};

export default CheckBox;
