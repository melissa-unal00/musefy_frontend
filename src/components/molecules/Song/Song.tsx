import { Slider, StylesProvider } from "@material-ui/core";
import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { NavLink } from "react-router-dom";
import { ArtistContext } from "../../../context/ArtistContext";
import { AudioContext } from "../../../context/AudioContext";
import { LikeContext } from "../../../context/LikeContext";
import { UserContext } from "../../../context/UserContext";
import { ImageComp, Button, AddToPlaylistModal } from "../../index";
import "./Song.scss";

interface Props {
  song: any;
  currentPlaylist?: Array<Object>[];
  onClick?(...args: any): void;
  playlistId?: string;
  onClickDeleteFromPlaylist?(...args: any): void;
  isXButton: boolean;
  getLikedAudio?(...args: any): void;
}

const Song = ({
  song,
  currentPlaylist,
  onClickDeleteFromPlaylist,
  isXButton,
  getLikedAudio,
}: Props) => {
  const [addToPlaylist, setAddToPlaylist] = useState(false);
  const audioContextData = useContext(AudioContext);
  const artistContextData = useContext(ArtistContext);
  const userContextData = useContext(UserContext);
  const { selectedArtistName } = artistContextData;
  let selectedArtistNameVar;
  const likeContextData = useContext(LikeContext);

  const handleIsLiked = (songId: any) => {
    const userId = userContextData.userId;

    if (likeContextData.likeSong?.includes(songId)) {
      axios
        .delete(`${process.env.REACT_APP_BACKEND}/api/like/deleteLike`, {
          data: { userId, songId },
        })
        .then(() => {
          const updatedLikeSong = likeContextData.likeSong.filter(
            (value: any) => value !== songId
          );
          likeContextData.setLikeSong(updatedLikeSong);
          if (getLikedAudio) getLikedAudio();
        });
    } else {
      axios
        .post(`${process.env.REACT_APP_BACKEND}/api/like/addLike`, {
          userId,
          songId,
        })
        .then(() => {
          const updatedLikeSong = likeContextData.likeSong.map((value: any) => {
            return value;
          });
          updatedLikeSong.push(songId);
          likeContextData.setLikeSong(updatedLikeSong);
        });
    }
  };

  const handleOnSongPlay = () => {
    if (currentPlaylist?.length === 0) {
      audioContextData.setPlayingData([song], song._id);
    } else {
      audioContextData.setPlayingData(currentPlaylist, song._id);
    }
    const audioId = song._id;
    axios.put(`${process.env.REACT_APP_BACKEND}/api/audio/updateTimesPlayed`, {
      audioId,
    });
  };

  const handleAddToPlaylist = () => {
    setAddToPlaylist(true);
  };

  const handleCloseButton = () => {
    setAddToPlaylist(false);
  };

  const handleArtist = (artistParam: string) => {
    selectedArtistNameVar = artistParam;
    artistContextData.setSelectedArtistName(artistParam);
  };

  return (
    <div>
      <div className="song">
        {isXButton && (
          <div>
            <Button
              className="song__button-x"
              onClick={onClickDeleteFromPlaylist}
            >
              x
            </Button>
          </div>
        )}
        <div style={{ display: "flex" }}>
          <div>
            <ImageComp
              className="song__image"
              src={
                song?.albumCover
                  ? song?.albumCover
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE26NjQaonqTRt7BXD_87Iuukitk_kcGBv3w&usqp=CAU"
              }
              alt="Mock image"
            />
          </div>
          <div>
            <div style={{ display: "flex" }}>
              {/* <NavLink
                to={`/artist`}
                className="song__artist"
                onClick={() => handleArtist(song.artistName)}
              >
                {song?.artistName}
              </NavLink> */}
              <div className="song__artist"> {song?.artistName}</div>
              <div className="song__audio"> - {song.audioName}</div>
            </div>
            <div style={{ display: "flex" }}>
              <div className="song__play">
                <Button className="song__button" onClick={handleOnSongPlay}>
                  Play
                </Button>
              </div>
              <div className="song__like">
                <Button
                  className="song__button"
                  onClick={() => handleIsLiked(song._id)}
                >
                  {likeContextData.likeSong?.includes(song._id) ? (
                    userContextData.username ? (
                      <FcLike />
                    ) : (
                      <FcLikePlaceholder />
                    )
                  ) : (
                    <FcLikePlaceholder />
                  )}
                </Button>
              </div>
              <div>
                <Button
                  className="song__button"
                  onClick={handleAddToPlaylist}
                  disabled={userContextData.username ? false : true}
                >
                  Add to...
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {addToPlaylist && (
        <AddToPlaylistModal
          onCloseClick={handleCloseButton}
          onAddToPlaylistClick={handleCloseButton}
          songId={song._id}
        />
      )}
    </div>
  );
};

export default Song;
