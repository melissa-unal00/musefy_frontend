import "./Slider.scss";

import React, { useState, useEffect } from "react";

interface Props {
  onChange?: any;
  percentage: number;
}

const Slider = ({ onChange, percentage }: Props) => {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    setPosition(percentage);
  }, [percentage]);

  return (
    <div className="slider">
      <div className="slider__bar"></div>
      <div
        className="slider__thumb"
        style={{
          left: `${position}%`,
        }}
      ></div>
      <input
        type="range"
        step="0.01"
        className="slider__range"
        onChange={onChange}
      ></input>
    </div>
  );
};

export default Slider;
