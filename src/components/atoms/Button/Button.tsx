import React from "react";
import "./Button.scss";
interface Props {
  children: React.ReactNode;
  className?: string;
  onClick?(...args: any): void;
  style?: any;
  disabled?: boolean;
}

const Button = ({ children, className, style, onClick, disabled }: Props) => {
  return (
    <button
      onClick={onClick}
      className={className ? className : "button header__button--gray"}
      style={style}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
