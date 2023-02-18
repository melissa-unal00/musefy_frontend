import { useContext, useEffect, useState } from "react";
import { Button, Song } from "../..";
import "./ResultModal.scss";
import loading from "../../../assets/svg/Spinner-1s-200px.svg";
import { Circles } from "react-loading-icons";
import { SearchResultContext } from "../../../context/SearchResultContext";

interface Props {
  onCloseClick?(...args: any): void;
}

const ResultModal = ({ onCloseClick }: Props) => {
  const searchContextData = useContext(SearchResultContext);
  return (
    <>
      <div className="result-modal">
        <div className="result-modal__container">
          <div>
            <Button className="result-modal__button" onClick={onCloseClick}>
              x
            </Button>
          </div>
          {searchContextData.searchData.length === 0 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Circles />
            </div>
          )}
          {searchContextData.searchData?.map((value: any) => {
            return (
              <>
                <Song
                  key={"result_" + value._id}
                  song={value}
                  currentPlaylist={searchContextData.searchData}
                  isXButton={false}
                ></Song>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ResultModal;
