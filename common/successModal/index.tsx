/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import React from "react";
import { Modal } from "react-bootstrap";

interface SuccessModalProps {
  isShow: boolean;
  headerText: string;
  bodyText: string;
  closeModal: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  isShow,
  headerText,
  bodyText,
  closeModal,
}) => {
  return (
    <Modal centered show={isShow} onHide={closeModal} onEscapeKeyDown={closeModal}>
      <div className="modal__header">
        <h6 className="modal__header-title">{headerText}</h6>
      </div>
      <div className="modal__body">
        <p>{bodyText}</p>
      </div>
      <div className="modal__footer">
        <button
          className="btn success-btn mx-2"
          onClick={closeModal}
          
        >
          Got it
        </button>
      </div>
    </Modal>
  );
};

export default SuccessModal;