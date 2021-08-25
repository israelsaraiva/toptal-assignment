import './Modal.scss';

import { Dialog } from '@material-ui/core';
import React, { useContext, useState } from 'react';

export interface IModalContext {
  modalOpen: boolean;
  initialData: any;
  openModal(data?: any): void;
  closeModal(result?: any, ...args: any): void;
}

export const ModalContext = React.createContext<Partial<IModalContext>>({});

export function useModalContext() {
  return useContext(ModalContext);
}

interface IModalProps {
  children: React.ReactNode;
  modalContent: React.ReactNode;
  onCloseModal: (result: any, ...args: any) => void;
}

export default function ModalProvider({ children, modalContent, onCloseModal }: IModalProps) {
  const [initialData, setInitialData] = useState<any>();
  const [modalOpen, toggleModal] = useState(false);

  function openModal(data?: any) {
    toggleModal(true);
    setInitialData(data);
  }

  function closeModal(result?: any, ...args: any) {
    toggleModal(false);
    onCloseModal(result, ...args);
  }

  return (
    <ModalContext.Provider value={{ modalOpen, openModal, closeModal, initialData }}>
      <div className="Modal">{children}</div>

      <Dialog open={modalOpen} fullWidth>
        {modalContent}
      </Dialog>
    </ModalContext.Provider>
  );
}
