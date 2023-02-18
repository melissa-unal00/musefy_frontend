import React from "react";

interface Types {
  likeSong: Array<any>;
  setLikeSong(...args: any): void;
}

const defaultState = {
  likeSong: [],
  setLikeSong: (): void => {},
};

export const LikeContext = React.createContext<Types>(defaultState);
