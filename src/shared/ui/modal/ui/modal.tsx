import { PropsWithChildren, useEffect, useRef } from 'react';
import cn from 'classnames';
import ReactModal from 'react-modal';
import Modal from 'react-modal';

import useClickOutside from '../../../lib/hooks/use-click-outside';

import classes from './modal.module.sass';

ReactModal.setAppElement('#root');

type ModalProps = {
  onClose: () => void;
  button?: boolean;
}

export function CustomModal ({onClose, button = false, children}: PropsWithChildren<ModalProps>): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside([ref], onClose);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    if (document.getElementById("layout")) {
      document.getElementById("layout")!.style.filter = 'blur(12px)';
    }

    return () => {
      document.body.style.overflow = 'visible';
      if (document.getElementById("layout")) {
        document.getElementById("layout")!.style.filter = '';
      }
    };
  });

  return (
    <Modal
      isOpen
      onRequestClose={onClose}
      style={{
        overlay: {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0)'
        },
        content: {
          position: 'absolute',
          border: 'none',
          background: '#fff0',
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          borderRadius: '4px',
          outline: 'none',
          padding: '20px'
        }
      }}
    >
      <div className={cn([classes.modal, classes.isActive])}>
        <div className={classes.modalWrapper}>
          <div className={classes.modalOverlay} onClick={() => onClose}>
          </div>

          <div className={classes.modalContent} ref={ref}>
            {children}

            {
              button &&
              <button
                className={classes.crossBtn}
                type="button"
                aria-label="Закрыть попап"
                onClick={onClose}
              >
                <svg width="10" height="10" aria-hidden="true">
                  <use xlinkHref="#icon-close"></use>
                </svg>
              </button>
            }
          </div>
        </div>
      </div>
    </Modal>
  );
}
