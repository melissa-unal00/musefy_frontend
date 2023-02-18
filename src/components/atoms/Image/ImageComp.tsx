import React from "react";
import "./ImageComp.scss";
interface Props {
  src: string;
  alt?: string;
  className?: string;
  style?: any;
}

const ImageComp = ({ src, alt, className, style }: Props) => {
  return <img src={src} alt={alt} className={className} style={style}></img>;
};

export default ImageComp;
