import React, { DetailedHTMLProps, ElementType } from 'react';
import styles from 'src/components/Typography/Typography.module.css';

type Variant =
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'body-large'
    | 'body'
    | 'body-small'
    | 'small';

interface Props
    extends DetailedHTMLProps<
        React.HTMLAttributes<HTMLHeadingElement>,
        HTMLHeadingElement
    > {
    variant: Variant;
    children: React.ReactNode;
    className?: string;
    as?: ElementType;
}

const tags: Record<Variant, ElementType> = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
    'body-large': 'p',
    body: 'p',
    'body-small': 'p',
    small: 'span',
};

const variantClassMap: Record<Variant, string> = {
    h1: styles.h1,
    h2: styles.h2,
    h3: styles.h3,
    h4: styles.h4,
    h5: styles.h5,
    h6: styles.h6,
    'body-large': styles.bodyLarge,
    body: styles.body,
    'body-small': styles.bodySmall,
    small: styles.small,
};

export const Typography = ({
    variant,
    children,
    className = '',
    as,
    ...props
}: Props) => {
    const Tag = as || tags[variant];
    const variantClass = variantClassMap[variant];

    return (
        <Tag className={`${variantClass} ${className}`} {...props}>
            {children}
        </Tag>
    );
};
