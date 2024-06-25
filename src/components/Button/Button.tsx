import React from "react";
import './Button.css';

interface ButtonProps {
    ariaLabel: string;
    text: string;
    href: string;
}

const Button = (props: ButtonProps) => {
    return <a href={props.href} aria-label={props.ariaLabel}><button>{props.text}</button></a>;
};

export default Button;