import {
  createMuiTheme,
  createTheme,
  makeStyles,
  MuiThemeProvider,
  StylesProvider,
} from "@material-ui/core";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/UserContext";
import { Button, FormField, Input } from "../../index";
import "./AddToPlaylistModal.scss";

const AddToPlaylistModal = ({
  createPlaylist,
  onCloseClick,
  onCreatePlaylistClick,
  songId,
  onAddToPlaylistClick,
}: any) => {
  const [selectedPlaylist, setSelectedPlaylist] = useState<any>();
  const [displayError, setDisplayError] = useState(false);

  let userContextData = useContext(UserContext);
  const { userId } = userContextData;

  const useStyles = makeStyles(() => ({
    input: {
      color: "#ffff",
    },
  }));
  const classes = useStyles();

  const theme = createTheme({
    overrides: {
      MuiFormLabel: {
        root: {
          "&$focused": {
            color: "#ef5c19",
          },
        },
        focused: {},
      },

      MuiInput: {
        underline: {
          "&:after": {
            borderBottom: "2px solid #ef5c19",
          },
        },
      },
    },
  });

  //   const postPlaylists = async () => {
  //     await axios
  //       .post("http://localhost:3001/api/playlist/allPlaylist", userContextData)
  //       .then((res: any) => {
  //         setAllPlaylists(res.data.data);
  //       })
  //       .catch((err) => console.log(err));
  //   };

  //   useEffect(() => {
  //     postPlaylists();
  //   });

  const handleAddToPlaylist = () => {
    const playlistId = selectedPlaylist?._id;
    axios
      .post(
        `${process.env.REACT_APP_BACKEND}/api/playlistSong/addPlaylistSong`,
        {
          songId,
          userId,
          playlistId,
        }
      )
      .then(() => {
        setDisplayError(false);
        // window.location.reload();
      })
      .catch((err) => {
        setDisplayError(true);
      });
  };

  return (
    <>
      <div className="add-playlist-modal">
        <div className="add-playlist-modal__container">
          <div>
            <Button
              onClick={onCloseClick}
              className="add-playlist-modal__button"
            >
              x
            </Button>
          </div>
          <MuiThemeProvider theme={theme}>
            <StylesProvider injectFirst>
              {displayError && (
                <div>This song already exists in the playlist!</div>
              )}
              <div className="add-playlist-modal__input">
                <FormField
                  variant="standard"
                  required
                  select
                  label="Playlists"
                  value={selectedPlaylist}
                  onChange={(e: any) => setSelectedPlaylist(e.target.value)}
                  InputLabelProps={{
                    className: classes.input,
                  }}
                ></FormField>
              </div>
              <div>
                <Button
                  onClick={() => {
                    handleAddToPlaylist();
                    onAddToPlaylistClick();
                  }}
                >
                  Ok
                </Button>
              </div>
            </StylesProvider>
          </MuiThemeProvider>
        </div>
      </div>
    </>
  );
};

export default AddToPlaylistModal;
