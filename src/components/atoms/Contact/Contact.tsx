import React from "react";
import { Button } from "../..";
import "./Contact.scss";

interface Props {
  onCloseClick?(...args: any): void;
  label?: string;
  data?: string;
}

const Contact = ({ onCloseClick, label, data }: Props) => {
  return (
    <div className="contact">
      <div className="contact__container">
        <Button className="contact__button" onClick={onCloseClick}>
          x
        </Button>
        <div>
          <span className="contact__text">{label}</span> {data}
        </div>
      </div>
    </div>
  );
};

export default Contact;
