import styles from 'src/components/Button/Button.module.css';

type Props = {
    title: string;
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
    onClick: () => void;
};

const Button: React.FC<Props> = (props) => {
    const { title, onClick, className = '', disabled = false } = props;

    return (
        <button
            title={title}
            onClick={onClick}
            className={`${styles.button} ${className}`}
            disabled={disabled}
        >
            {props.children}
        </button>
    );
};

export default Button;
