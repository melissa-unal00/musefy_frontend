import React, { useContext, useEffect, useRef, useState } from "react";
import { Button } from "../..";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import "./Player.scss";
import { AudioContext } from "../../../context/AudioContext";
import { Slider, StylesProvider } from "@material-ui/core";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";

const Player = () => {
  const audioContextData = useContext(AudioContext);
  const currentSelectedSong = audioContextData.audioArray?.find((elem: any) => {
    return elem._id === audioContextData.currentSongId;
  });
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const myRef = useRef<any>(null);

  useEffect(() => {
    if (currentSelectedSong) {
      setIsPlaying(true);
    }
  }, []);

  // aici cand dam play pe o melodie facem state-ul true si se face play la mel
  useEffect(() => {
    if (currentSelectedSong) {
      handlePlayButton(myRef, true);
    }
  }, [currentSelectedSong]);

  //daca o melodie e pe play, respectiv isPlaying e true si apas pe un alt buton de play, ii vom face iar setIsplaying de true si ii vom da play
  const handlePlayButton = (song: any, forcePlay: boolean) => {
    if (forcePlay) {
      setIsPlaying(true);
      song.current.play();
    } else {
      setIsPlaying(!isPlaying);
      isPlaying ? song.current.pause() : song.current.play();
    }
  };

  const handlePlayNextSong = () => {
    const { audioArray } = audioContextData;
    setIsPlaying(false);
    const currentSongIndex = audioArray.findIndex(
      (element: any) => element === currentSelectedSong
    );
    if (currentSongIndex !== -1) {
      if (audioArray[currentSongIndex + 1]) {
        audioContextData.setCurrentSongId(audioArray[currentSongIndex + 1]._id);
      } else {
        audioContextData.setCurrentSongId(audioArray[0]._id);
      }
    }
  };

  const handlePlayPreviousSong = () => {
    const { audioArray } = audioContextData;
    setIsPlaying(false);
    const currentSongIndex = audioArray.findIndex(
      (element: any) => element === currentSelectedSong
    );

    if (currentSongIndex !== -1) {
      if (audioArray[currentSongIndex - 1]) {
        audioContextData.setCurrentSongId(audioArray[currentSongIndex - 1]._id);
      } else {
        audioContextData.setCurrentSongId(
          audioArray[audioArray.length - 1]._id
        );
      }
    }
  };

  const handleSetPosition = (value: number) => {
    setPosition(value);
  };

  const handleSetDuration = (value: number) => {
    setDuration(value);
  };

  const setCurrentTime = (value: number) => {
    // console.log(myRef.current.currentTime);
    if (value < duration) {
      myRef.current.currentTime = value;
    }
  };

  // e?.currentTarget?.duration durata totala a melodiei

  //e.currentTarget.duration e de tip string si il convertim in number cu parseInt

  return (
    <React.Fragment>
      {typeof currentSelectedSong !== "undefined" && (
        <div style={{ display: "flex" }}>
          <div className="player" style={{ paddingTop: "0.3rem" }}>
            <audio
              ref={myRef}
              src={currentSelectedSong.url}
              onLoadedData={(e) => {
                handleSetDuration(
                  e?.currentTarget?.duration
                    ? parseInt(e.currentTarget.duration.toFixed(0))
                    : 0
                );
              }}
              onTimeUpdate={(e) => {
                handleSetPosition(
                  e?.currentTarget?.currentTime
                    ? e.currentTarget.currentTime
                    : 0
                );
              }}
            ></audio>
            <Button
              className="player__play-button"
              onClick={handlePlayPreviousSong}
            >
              <MdSkipPrevious style={{ fontSize: "2rem" }} />
            </Button>
            <Button
              className="player__play-button"
              onClick={() => handlePlayButton(myRef, false)}
            >
              {isPlaying ? (
                <BsFillPauseFill style={{ fontSize: "2rem" }} />
              ) : (
                <BsFillPlayFill style={{ fontSize: "2rem" }} />
              )}
            </Button>
            <Button
              className="player__play-button"
              onClick={handlePlayNextSong}
            >
              <MdSkipNext style={{ fontSize: "2rem" }} />
            </Button>
          </div>
          <div style={{ paddingLeft: "1rem" }}>
            <div className="player__name">
              {currentSelectedSong.artistName} - {currentSelectedSong.audioName}
            </div>
            <div style={{ width: "15rem" }}>
              <StylesProvider injectFirst>
                <div style={{ width: "8rem", height: "1rem" }}>
                  <Slider
                    color="secondary"
                    min={0}
                    step={1}
                    value={position}
                    max={duration}
                    onChange={(_, value) => setCurrentTime(value as number)}
                  />
                </div>
              </StylesProvider>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Player;
