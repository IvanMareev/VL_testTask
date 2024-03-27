// TemplateModal.js
import React, { ReactNode } from 'react';
import styles from './TemplateModal.module.css';

interface ModalType {
  children?: ReactNode;
  isOpen: boolean;
  toggle: () => void;
}

export function TemplateModal(props: ModalType) {
  return (
    <>
      {props.isOpen && (
        <div className={styles['modal-overlay']} onClick={props.toggle}>
          <div className={styles['modal-box']} onClick={(e) => e.stopPropagation()}>
            {props.children}
          </div>
        </div>
      )}
    </>
  );
}
