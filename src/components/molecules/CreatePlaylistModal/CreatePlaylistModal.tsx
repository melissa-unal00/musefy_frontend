import {
  createTheme,
  makeStyles,
  MuiThemeProvider,
  StylesProvider,
} from "@material-ui/core";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useCookies } from "react-cookie";
import { UserContext } from "../../../context/UserContext";
import { Button, FormField, Input } from "../../index";
import "./CreatePlaylistModal.scss";

const CreatePlaylistModal = ({ onCloseClick, onCreatePlaylistClick }: any) => {
  const [playlistName, setPlaylistName] = useState("");
  const [isPlaylistSaving, setIsPlaylistSaving] = useState(false);
  const [displayError, setDisplayError] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  let userContextData = useContext(UserContext);
  const { userId } = userContextData;

  const handleNewPlaylist = () => {
    setIsPlaylistSaving(true);
    axios
      .post(
        `${process.env.REACT_APP_BACKEND}/api/playlist/newPlaylist`,
        {
          userId,
          playlistName,
        },
        {
          headers: {
            token: cookies.token,
          },
        }
      )
      .then(() => {
        onCreatePlaylistClick();
        setIsPlaylistSaving(false);
        setDisplayError(false);
      })
      .catch((err) => {
        setIsPlaylistSaving(false);
        setDisplayError(true);
      });
  };

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

  return (
    <>
      <div className="modal">
        <div className="modal__container">
          <div>
            <Button onClick={onCloseClick} className="modal__button">
              x
            </Button>
          </div>
          {displayError && (
            <h1 className="modal__error">This playlist name already exists!</h1>
          )}
          <MuiThemeProvider theme={theme}>
            <StylesProvider injectFirst>
              <div className="modal__input">
                <FormField
                  variant="standard"
                  label="Name your playlist..."
                  onChange={(e: any) => setPlaylistName(e.target.value)}
                  required
                  InputLabelProps={{
                    className: classes.input,
                  }}
                ></FormField>
              </div>
              <div>
                {!isPlaylistSaving ? (
                  <Button
                    onClick={() => {
                      handleNewPlaylist();
                    }}
                  >
                    Ok
                  </Button>
                ) : (
                  <p>is Loading</p>
                )}
              </div>
            </StylesProvider>
          </MuiThemeProvider>
        </div>
      </div>
    </>
  );
};

export default CreatePlaylistModal;
