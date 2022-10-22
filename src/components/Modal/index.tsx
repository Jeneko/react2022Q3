import React, { ReactNode } from 'react';
import close from './close.svg';
import './Modal.css';

interface ModalProps {
  children?: ReactNode;
  onClose: () => void;
}

function Modal(props: ModalProps) {
  return (
    <div className="modal" data-testid="modal-component">
      <div className="modal__backdrop" onClick={props.onClose} />
      <div className="modal__container">
        <button
          className="modal__close"
          onClick={props.onClose}
          title="Close"
          data-testid="close-modal"
        >
          <img src={close} alt="" />
        </button>
        <div className="modal__content">{props.children}</div>
      </div>
    </div>
  );
}

export { Modal };
