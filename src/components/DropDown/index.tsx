import useClickOutside from '@src/hooks/useClickOutside';
import { useEffect, useRef, useState } from 'react';
import './index.css';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDownIcon } from '@root/src/assets/icons/arrow-down';

interface DropDownProps {
  selectedOption?: string;
  setSelectedOption?: ({ index, option }: { index: number; option: string }) => void;
  options: string[];
  placeholder?: string;
}

const DropDown = ({
  selectedOption,
  setSelectedOption,
  options,
  placeholder = 'Select Status',
  ...props
}: DropDownProps) => {
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);

  useClickOutside(dropdownRef, () => {
    setIsOpen(false);
  });

  const handleClickToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOption = (index: number, option: string) => {
    setSelectedOptionIndex(index);
    setSelectedOption({ index, option });
    setIsOpen(false);
  };

  return (
    <div className="ui-dropdown" ref={dropdownRef} {...props}>
      <div className="ui-dropdown-toggle-container" onClick={handleClickToggle}>
        <div className="ui-dropdown-toggle-text">{selectedOption ? selectedOption : placeholder}</div>
        <motion.div
          className="ui-dropdown-toggle-icon"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.1, ease: 'linear' }}>
          <ArrowDownIcon size={16} />
        </motion.div>
      </div>
      <AnimatePresence>
        {/* {isOpen ? (
          <motion.ul
            className="ui-dropdown-menu"
            initial={{ maxHeight: 0 }}
            exit={{ maxHeight: 0 }}
            transition={{ duration: 0.1 }}>
            {options.map((option, index) => (
              <li
                key={index}
                className={['ui-dropdown-menu-item', index === selectedOptionIndex && 'selected'].join(' ')}
                onClick={() => handleClickOption(index, option)}>
                {option}
              </li>
            ))}
          </motion.ul>
        ) : null} */}
      </AnimatePresence>
    </div>
  );
};

export default DropDown;
