import React from "react";
interface Props {
  type?: string;
  placeholder?: string;
  onChange?(...args: any): void;
  onClick?(...args: any): void;
  id?: string;
  onKeyPress?(...args: any): void;
  value?: any;
  className?: string;
}
const Input = ({
  type,
  placeholder,
  onChange,
  onClick,
  id,
  onKeyPress,
  value,
  className,
}: Props) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      onClick={onClick}
      id={id}
      onKeyPress={onKeyPress}
      value={value}
      className={className}
    />
  );
};

export default Input;
