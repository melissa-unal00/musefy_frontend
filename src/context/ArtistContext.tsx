import React from "react";

interface Types {
  selectedArtistName: string;
  setSelectedArtistName(...args: any): void;
}

const defaultState = {
  selectedArtistName: "",
  setSelectedArtistName: (): void => {},
};

export const ArtistContext = React.createContext<Types>(defaultState);
