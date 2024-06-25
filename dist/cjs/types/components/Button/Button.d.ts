import React from "react";
import './Button.css';
interface ButtonProps {
    ariaLabel: string;
    text: string;
    href: string;
}
declare const Button: (props: ButtonProps) => React.JSX.Element;
export default Button;
