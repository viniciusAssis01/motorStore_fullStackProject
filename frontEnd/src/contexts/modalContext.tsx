import { createContext, useContext, useState } from "react";

interface iModalInfo {
  isOpen: boolean;
  data?: {
    title: string;
    content: React.ReactNode;
  }
}

export interface iModalProps {
  modal: iModalInfo;
  setModal: React.Dispatch<React.SetStateAction<iModalInfo>>;
  closeModal: () => void;
}

interface iModalProviderProps {
  children: React.ReactNode;
}

const ModalContext = createContext({} as iModalProps);

export const ModalProvider = ({ children }: iModalProviderProps) => {
  const [modal, setModal] = useState<iModalInfo>({ isOpen: false });

  const closeModal = () => {
    setModal({ isOpen: false })
  }

  return (
    <ModalContext.Provider value={{ modal, setModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  )
};

export const useModal = () => useContext(ModalContext);
