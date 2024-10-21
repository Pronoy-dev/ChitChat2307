import React from "react";

import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    zIndex: 4000,
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.75)",
  },
};

const ModalComponents = ({ openModal, closeModal, modalIsOpen, children }) => {
  return (
    <div className="h-[80vh]">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button
          onClick={closeModal}
          className="flex h-10 w-16 items-center justify-center rounded-xl bg-red-600 text-2xl text-white"
        >
          X
        </button>
        {children}
      </Modal>
    </div>
  );
};

export default ModalComponents;
