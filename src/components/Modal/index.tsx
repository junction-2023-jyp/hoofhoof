import { ReactNode, useCallback, useEffect, useRef } from 'react';
import useClickOutside from '@src/hooks/useClickOutside';
import { AnimatePresence, motion } from 'framer-motion';
import './style.css';

interface ModalProps {
  isOpen: boolean;
  setIsOpen?: (isOpen: boolean) => void;
  children: ReactNode;
}
const Modal = ({ isOpen, setIsOpen, children, ...props }: ModalProps) => {
  const modalRef = useRef(null);

  useClickOutside(modalRef, () => {
    if (setIsOpen) {
      setIsOpen(false);
    }
  });

  const handleKeyboardEvent = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (setIsOpen) {
          setIsOpen(false);
        }
      }
    },
    [setIsOpen],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyboardEvent);
    return () => {
      document.removeEventListener('keydown', handleKeyboardEvent);
    };
  }, [handleKeyboardEvent]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          key="modal"
          className="ui-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          {...props}>
          <div className="ui-modal-content" ref={modalRef}>
            {children}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default Modal;
