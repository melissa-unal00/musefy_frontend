import React, { useContext, useRef, useState } from "react";
import { Button, Song } from "../..";
import { SearchResultContext } from "../../../context/SearchResultContext";
import "./OpenSearchedSong.scss";
interface Props {
  songId: string;
  onCloseClick(...args: any): void;
}

const OpenSearchedSong = ({ songId, onCloseClick }: Props) => {
  const searchContextData = useContext(SearchResultContext);

  return (
    <div className="open-searched-song">
      <div className="open-searched-song__container">
        <Button className="open-searched-song__button" onClick={onCloseClick}>
          x
        </Button>
        {searchContextData.searchData.map((value) => {
          return (
            <div className="open-searched-song__song">
              {value._id === songId && (
                <Song
                  key={"result_" + value._id}
                  song={value}
                  currentPlaylist={searchContextData.searchData}
                  isXButton={false}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OpenSearchedSong;
