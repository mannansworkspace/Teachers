
import React from "react";
import { Modal } from "react-bootstrap";
import DeleteIcon from "assets/img/trash-icon.svg";
import { Button } from "./buttonComponent";

interface DeleteConfirmationModalProps {
    loading: boolean;
    isShow: boolean;
    headerText: string;
    bodyText: string;
    onCancel: () => void;
    onDelete: () => void;
}

export const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
    isShow,
    headerText,
    bodyText,
    loading,
    onCancel,
    onDelete
  }) => {
    return (
      <Modal centered show={isShow} onEscapeKeyDown={onCancel}>
        <div className="modal__header">
          <img alt="trash" src={DeleteIcon} className="modal__header-icon" />
          <h6 className="modal__header-title">{headerText}</h6>
        </div>
        <div className="modal__body">
          <p>{bodyText}</p>
        </div>
        <div className="modal__footer">
          <Button
            buttonText="Cancel"
            onClick={onCancel}
            className='btn cancel-btn mx-3'
            disabled={loading}
            type='button'
          />
          <Button
            buttonText="Delete"
            onClick={onDelete}
            className='btn danger-btn'
            disabled={loading}
            loading={loading}
            type='button'
          />
        </div>
      </Modal>
    );
  };