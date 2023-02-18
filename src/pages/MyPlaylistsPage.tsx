import React, { useContext } from "react";
import {
  Footer,
  Header,
  NavbarComp,
  MyPlaylists,
  Chat,
} from "../components/index";
import { UserContext } from "../context/UserContext";

const MyPlaylistsPage = () => {
  const userContextData = useContext(UserContext);
  return (
    <>
      <NavbarComp />
      <Header />
      <MyPlaylists selectedUser={userContextData.userId} isXButton likedSongs/>
      <Footer />
    </>
  );
};

export default MyPlaylistsPage;
