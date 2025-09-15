import React, { PropsWithChildren } from 'react';
import styles from 'src/components/IconButton/IconButton.module.css';

type Props = {
    label?: string;
    ariaLabel?: string;
    onClick?: () => void;
    className?: string;
};

const IconButton: React.FC<PropsWithChildren<Props>> = ({
    label,
    ariaLabel,
    onClick,
    className = '',
    children,
}) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`${styles.button} ${className}`}
            aria-label={ariaLabel ?? label}
            title={label}
        >
            {children}
        </button>
    );
};

export default IconButton;
