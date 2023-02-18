import React, { useEffect, useState } from "react";
import { CookiesProvider, useCookies } from "react-cookie";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  SignupPage,
  SigninPage,
  HomePage,
  ProfilePage,
  ForgotPasswordPage,
  ResetPasswordPage,
  TrendingPage,
  MyPlaylistsPage,
  Chat,
  ResultModalNormalPage,
  ReviewsPage,
  HelpPage,
  MapPage,
  ArtistPage,
} from "../src/components/index";
import { UserContext } from "./context/UserContext";
import { ResetPasswordContext } from "./context/ResetPasswordContext";
import { AudioContext } from "./context/AudioContext";
import { splitCookie } from "./utils/functions/splitCookie";
import "./App.scss";
import { SearchResultContext } from "./context/SearchResultContext";
import axios from "axios";
import { ArtistContext } from "./context/ArtistContext";
import { LikeContext } from "./context/LikeContext";

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    "token",
    "resetToken",
  ]);
  const [token, setToken] = useState("");
  const [audioArray, setAudioArray] = useState([]);
  const [currentSongId, setCurrentSongId] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [selectedArtistName, setSelectedArtistName] = useState("");
  const [likeSong, setLikeSong] = useState([]);

  let username = "";
  let userId = "";
  let profileImage = "";
  let email = "";

  if (typeof cookies.token !== "undefined") {
    const dataObject = splitCookie(cookies);
    username = dataObject.username;
    userId = dataObject._id;
    profileImage = dataObject.profileImage;
    email = dataObject.email;
  } else {
    username = "";
  }

  const updateLikedAudio = () => {
    axios
      .post(`${process.env.REACT_APP_BACKEND}/api/like/userLike`, { userId })
      .then((res: any) => {
        setLikeSong(res.data.data.map((value: any) => value._id));
      })
      .catch((err) => console.log(err));
  };

  const updateCurrentSong = () => {
    axios.put(`${process.env.REACT_APP_BACKEND}/api/users/updateCurrentSong`, {
      userId,
      currentSongId,
    });
  };

  const setPlayingData = (playlist: any, songId: any) => {
    setAudioArray(playlist);
    setCurrentSongId(songId);
  };
  useEffect(() => {
    updateLikedAudio();
  }, []);

  useEffect(() => {
    updateCurrentSong();
  }, [currentSongId]);

  return (
    <div className="global">
      <UserContext.Provider
        value={{
          email: email,
          username: username,
          userId: userId,
          profileImage: profileImage,
        }}
      >
        <ResetPasswordContext.Provider
          value={{ token: token, setToken: setToken }}
        >
          <AudioContext.Provider
            value={{
              currentSongId: currentSongId,
              audioArray: audioArray,
              setPlayingData: setPlayingData,
              setCurrentSongId: setCurrentSongId,
            }}
          >
            <SearchResultContext.Provider
              value={{
                searchData: searchData,
                setSearchData: setSearchData,
              }}
            >
              <ArtistContext.Provider
                value={{
                  selectedArtistName: selectedArtistName,
                  setSelectedArtistName: setSelectedArtistName,
                }}
              >
                <LikeContext.Provider
                  value={{ likeSong: likeSong, setLikeSong: setLikeSong }}
                >
                  <Router>
                    <Switch>
                      <Route exact path="/" component={HomePage}></Route>
                      <Route
                        exact
                        path="/register"
                        component={SignupPage}
                      ></Route>
                      <Route exact path="/login" component={SigninPage}></Route>
                      <Route
                        exact
                        path="/forgot-password"
                        component={ForgotPasswordPage}
                      ></Route>
                      <Route
                        exact
                        path="/reset-password/:token"
                        component={ResetPasswordPage}
                      ></Route>
                      <Route
                        exact
                        path="/profile"
                        component={username ? ProfilePage : HomePage}
                      ></Route>
                      <Route path="/trending" component={TrendingPage}></Route>
                      <Route
                        exact
                        path="/my-playlists"
                        component={username ? MyPlaylistsPage : HomePage}
                      ></Route>
                      <Route
                        exact
                        path="/search"
                        component={
                          searchData.length > 0
                            ? ResultModalNormalPage
                            : HomePage
                        }
                      ></Route>
                      <Route
                        exact
                        path="/reviews"
                        component={username ? ReviewsPage : HomePage}
                      ></Route>
                      <Route exact path="/help" component={HelpPage}></Route>
                      <Route
                        exact
                        path="/map"
                        component={username ? MapPage : HomePage}
                      ></Route>
                      <Route
                        exact
                        path={`/artist`}
                        component={selectedArtistName ? ArtistPage : HomePage}
                      ></Route>
                    </Switch>
                  </Router>
                  {username !== "" && <Chat />}
                </LikeContext.Provider>
              </ArtistContext.Provider>
            </SearchResultContext.Provider>
          </AudioContext.Provider>
        </ResetPasswordContext.Provider>
      </UserContext.Provider>
    </div>
  );
};

export default App;
