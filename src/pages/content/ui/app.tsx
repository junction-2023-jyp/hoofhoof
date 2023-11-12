// App.tsx
import React, { useState } from 'react';
import Modal from './Modal';

interface AppProps {
  isOpen?: boolean;
}

const App: React.FC<AppProps> = ({ isOpen = true }) => {
  console.log('app 로딩');
  const [modalOpen, setModalOpen] = useState(isOpen);
  console.log('modalOpen', modalOpen);

  const closeModal = () => setModalOpen(false);

  return (
    <div>
      <Modal isOpen={modalOpen} onClose={closeModal} />
    </div>
  );
};

export default App;
