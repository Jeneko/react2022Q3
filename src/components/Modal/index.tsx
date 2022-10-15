import React, { ReactNode } from 'react';
import close from './close.svg';
import './Modal.css';

interface ModalProps {
  children?: ReactNode;
  onClose: () => void;
}

class Modal extends React.Component<ModalProps> {
  render() {
    return (
      <div className="modal">
        <div className="modal__backdrop" onClick={this.props.onClose} />
        <div className="modal__container">
          <button className="modal__close" onClick={this.props.onClose} title="Close">
            <img src={close} alt="" />
          </button>
          <div className="modal__content">{this.props.children}</div>
        </div>
      </div>
    );
  }
}

export { Modal };
