import React from "react";

interface Types {
  searchData: Array<any>;
  setSearchData: (...args: any) => void;
}

const defaultState = {
  searchData: [],
  setSearchData: (): void => {},
};

export const SearchResultContext = React.createContext<Types>(defaultState);
