import React from "react";

interface Types {
  currentSongId: string;
  audioArray: Array<any>;
  setPlayingData(...args: any): void;
  setCurrentSongId(...args: any): void;
}

const defaultState = {
  currentSongId: "",
  audioArray: [],
  setPlayingData: (): void => {},
  setCurrentSongId: (): void => {},
};

export const AudioContext = React.createContext<Types>(defaultState);
