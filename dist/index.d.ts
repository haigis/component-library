import React from 'react';

interface ButtonProps {
    ariaLabel: string;
    text: string;
    href: string;
}
declare const Button: (props: ButtonProps) => React.JSX.Element;

export { Button };
