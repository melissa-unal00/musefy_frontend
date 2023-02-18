import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { ImageComp } from "../..";
import "./CarouselComp.scss";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const CarouselComp = () => {
  const [albumCovers, setAlbumCovers] = useState<any>([]);

  const getAudioData = async () => {
    await axios
      .get(`${process.env.REACT_APP_BACKEND}/api/audio/randomAudio`)
      .then((res: any) => setAlbumCovers(res.data.data));
  };

  useEffect(() => {
    getAudioData();
  }, []);

  // useEffect(() => {
  //   for (let i = 0; i < 5; i++) {
  //     let randomItem =
  //       albumCovers[Math.floor(Math.random() * albumCovers.length)];
  //     randomCovers?.push(randomItem);
  //     setRandomCovers(randomCovers);
  //   }
  // }, [albumCovers, randomCovers]);

  return (
    <div className="carousel__box">
      <Carousel>
        {albumCovers?.map((value: any) => (
          <ImageComp
            key={uuidv4()}
            src={value?.albumCover}
            className="carousel"
          ></ImageComp>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselComp;
