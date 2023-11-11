// App.tsx
import React, { useState } from 'react';
import Modal from './Modal';

const App: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(true);

  const closeModal = () => setModalOpen(false);

  return (
    <div>
      <Modal isOpen={modalOpen} onClose={closeModal} />
    </div>
  );
};

export default App;
