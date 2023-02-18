import React, { useContext, useEffect, useRef, useState } from "react";
import { Song, SongList } from "../..";
import { SearchResultContext } from "../../../context/SearchResultContext";
import "./ResultModalNormal.scss";

const ResultModalNormal = () => {
  const searchContextData = useContext(SearchResultContext);
  return (
    <div className="result-modal-normal">
      <div style={{ paddingBottom: "2rem" }}>Your search results...</div>
      {searchContextData.searchData.map((value) => {
        return (
          <Song
            key={"result_" + value._id}
            song={value}
            currentPlaylist={searchContextData.searchData}
            isXButton={false}
          />
        );
      })}
    </div>
  );
};

export default ResultModalNormal;
