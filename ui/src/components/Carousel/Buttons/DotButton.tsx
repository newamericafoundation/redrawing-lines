import { ComponentPropsWithRef } from 'react';

type Props = ComponentPropsWithRef<'button'>;

export const DotButton: React.FC<Props> = (props) => {
    const { children, ...restProps } = props;

    return (
        <button type="button" {...restProps}>
            {children}
        </button>
    );
};
