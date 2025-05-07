import styles from './Modal.module.css';
import IconButton from '../IconButton';
import { Typography } from '../Typography';
import Close from 'src/assets/Close';

type Props = {
    open: boolean;
    title: string;
    handleClose: () => void;
    children: React.ReactNode;
    action: React.ReactNode;
};

const Modal: React.FC<Props> = ({
    open,
    title,
    handleClose,
    children,
    action,
}) => {
    return (
        <>
            {open && (
                <div
                    id="modal-overlay"
                    data-testid="modal-overlay"
                    className={styles.overlay}
                    onClick={(e) => {
                        if ((e.target as HTMLElement).id === 'modal-overlay') {
                            handleClose();
                        }
                    }}
                >
                    <div
                        data-testid="modal-content"
                        className={styles.modalContent}
                    >
                        <div id="modal-header" className={styles.modalHeader}>
                            <Typography variant="h3" className={styles.title}>
                                {title}
                            </Typography>
                            <IconButton
                                label="Leave State"
                                onClick={handleClose}
                                className={styles.closeButton}
                            >
                                <Close className={styles.closeIcon} />
                            </IconButton>
                        </div>
                        <div id="modal-body" className={styles.modalBody}>
                            {children}
                        </div>
                        <div id="modal-action" className={styles.modalAction}>
                            {action}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;
