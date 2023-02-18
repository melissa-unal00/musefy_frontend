import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, SongList, CreatePlaylistModal, routeChange } from "../..";
import { UserContext } from "../../../context/UserContext";
import "./MyPlaylists.scss";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { createTheme, MuiThemeProvider } from "@material-ui/core";
import { makeStyles, StylesProvider } from "@material-ui/styles";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router";

interface Props {
  selectedUser: string;
  isXButton: boolean;
  likedSongs: boolean;
}

interface ResInterface {
  data: any;
}

const MyPlaylists = ({ selectedUser, isXButton, likedSongs }: Props) => {
  const [selectedPlaylist, setSelectedPlaylist] = useState("All songs");
  const [selectedPlaylistId, setSelectedPlaylistId] = useState("");
  const [allPlaylists, setAllPlaylists] = useState<Object[]>([]);
  const [createPlaylist, setCreatePlaylist] = useState(false);
  const [deletePlaylist, setDeletePlaylist] = useState(false);
  let userContextData = useContext(UserContext);
  const { userId } = userContextData;
  const [currentPlaylist, setCurrentPlaylist] = useState<any>([]);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const history = useHistory();

  const handlePlaylistClick = (
    playlistNameParam: string,
    playlistIdParam: string
  ) => {
    if (playlistNameParam === "All songs") {
      setSelectedPlaylist("All songs");
    }
    if (playlistNameParam === "Liked songs") {
      setSelectedPlaylist("Liked songs");
    }
    if (playlistNameParam !== "") {
      setSelectedPlaylist(playlistNameParam);
      setSelectedPlaylistId(playlistIdParam);
    }
  };

  const postPlaylists = () => {
    const userId = selectedUser;
    axios
      .post(
        `${process.env.REACT_APP_BACKEND}/api/playlist/allPlaylist`,
        {
          userId,
        },
        {
          headers: {
            token: cookies.token,
          },
        }
      )
      .then((res: ResInterface) => {
        setAllPlaylists(res.data.data);
      })
      .catch((e) => {
        removeCookie("token", { path: "/" });
        routeChange(e, "/", history);
      });
  };

  const handleNewPlaylist = () => {
    setCreatePlaylist(true);
  };

  const handleCloseButton = () => {
    setCreatePlaylist(false);
  };

  const handleDeletePlaylist = (playlistName: string, playlistId: string) => {
    const userId = selectedUser;
    axios
      .delete(`${process.env.REACT_APP_BACKEND}/api/playlist/deletePlaylist`, {
        data: { userId, playlistName, playlistId },
      })
      .then(() => setSelectedPlaylist("All songs"));
    setDeletePlaylist(!deletePlaylist);
  };

  // const getPlaylistSong = async () => {
  //   const playlistId = selectedPlaylistId;
  //   await axios
  //     .post("http://localhost:3001/api/playlistSong/allPlaylistSong", {
  //       userId,
  //       playlistId,
  //     })
  //     .then((res: any) => {
  //       setCurrentPlaylist(res.data.data);
  //     })
  //     .catch((err) => console.log(err));
  // };

  useEffect(() => {
    postPlaylists();
  }, []);

  useEffect(() => {
    postPlaylists();
  }, [createPlaylist, deletePlaylist]);

  // useEffect(() => {
  //   getPlaylistSong();
  // }, [selectedPlaylistId]);

  return (
    <>
      <div className="my-playlists-page--styling">
        <div style={{ display: "flex", columnGap: "20%" }}>
          <div className="my-playlists-page__buttons">
            {isXButton && (
              <Button
                className="my-playlists-page__button my-playlists-page__button-padding"
                onClick={handleNewPlaylist}
              >
                Create new playlist
              </Button>
            )}

            <Button
              className={
                isXButton
                  ? "my-playlists-page__button my-playlists-page__button-padding"
                  : "my-playlists-page__button my-playlists-page__button"
              }
              onClick={() => handlePlaylistClick("All songs", "")}
            >
              All songs
            </Button>

            {likedSongs && (
              <div style={{ display: "flex" }}>
                <Button
                  className="my-playlists-page__button my-playlists-page__button-padding"
                  onClick={() => handlePlaylistClick("Liked songs", "")}
                >
                  Liked songs
                </Button>
              </div>
            )}

            {allPlaylists.map((value: any) => {
              return (
                <div
                  key={"playlist_id_" + value._id}
                  style={{ display: "flex" }}
                >
                  {isXButton && (
                    <Button
                      className="my-playlists-page__x-button"
                      onClick={() =>
                        handleDeletePlaylist(value.playlistName, value._id)
                      }
                    >
                      x
                    </Button>
                  )}
                  <Button
                    className="my-playlists-page__button"
                    onClick={() =>
                      handlePlaylistClick(value.playlistName, value._id)
                    }
                  >
                    {value.playlistName}
                  </Button>
                </div>
              );
            })}
          </div>
          <div>
            <SongList
              playlistName={selectedPlaylist}
              playlistId={selectedPlaylistId}
              isXButton={isXButton}
              selectedUser={selectedUser}
            />
          </div>{" "}
        </div>
      </div>

      {createPlaylist && (
        <CreatePlaylistModal
          onCloseClick={handleCloseButton}
          onCreatePlaylistClick={handleCloseButton}
        />
      )}
    </>
  );
};

export default MyPlaylists;
