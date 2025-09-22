import Tippy from '@tippyjs/react';
import { ChangeEventHandler } from 'react';
import Info from 'src/assets/Info';
import styles from 'src/components/Select/Select.module.css';

type Props = {
    id: string;
    label: string;
    placeholder: string;
    value: string | number | undefined;
    options: { value: string | number; label: string }[];
    onChange: ChangeEventHandler<HTMLSelectElement> | (() => void);
    disabled?: boolean;
    tooltip?: boolean;
    getTooltipContent?: () => string;
};

export const Select: React.FC<Props> = (props) => {
    const {
        id,
        value,
        label,
        placeholder,
        options,
        onChange,
        disabled = false,
        tooltip = false,
        getTooltipContent = () => '',
    } = props;

    return (
        <div className={styles.selectWrapper}>
            {tooltip ? (
                <Tippy content={getTooltipContent()}>
                    <label htmlFor={id + '-id'}>
                        {label}
                        <Info />
                    </label>
                </Tippy>
            ) : (
                <label htmlFor={id + '-id'}>{label}</label>
            )}
            <div className={styles.selectBody}>
                <select
                    value={value}
                    name={id}
                    id={id + '-id'}
                    onChange={onChange}
                    disabled={disabled}
                >
                    <option value="" id="placeholder" disabled hidden>
                        {placeholder}
                    </option>
                    {options.map((option, index) => (
                        <option
                            key={`${option.value} - ${index}`}
                            value={option.value}
                        >
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};
