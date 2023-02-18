import React, { useEffect, useState } from "react";
import "./NavbarComp.scss";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { NavLink, useHistory } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import { useCookies } from "react-cookie";
import { routeChange } from "../..";
import { Player, ImageComp } from "../..";
import axios from "axios";

const NavbarComp = () => {
  const userContextData = useContext(UserContext);
  const { username, userId } = userContextData;

  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const history = useHistory();

  const handleLogout = (e: any) => {
    removeCookie("token", { path: "/" });
    routeChange(e, `/`, history);
    window.location.reload();
  };

  const checkUserAuthenticated = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND}/api/users/profile/${userId}`, {
        headers: {
          "x-access-token": cookies.token,
        },
      })
      .then((res) => {})
      .catch((err) => console.log("Eroare: ", err));
  };

  return (
    <div className="navbar__fixed">
      {username ? (
        <div className="navbar">
          <div className="navbar__submenu">
            <div className="navbar__user">
              <ImageComp
                className="navbar__user-photo"
                src={
                  userContextData.profileImage
                    ? userContextData.profileImage +
                      "?time=" +
                      new Date().valueOf()
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE26NjQaonqTRt7BXD_87Iuukitk_kcGBv3w&usqp=CAU"
                }
              />
              <div className="navbar__user-name" id="username">
                {username}
              </div>
            </div>

            <div className="navbar__submenu-content">
              <div className="navbar__submenu-arrow">
                <BsFillArrowRightCircleFill />
              </div>
              <NavLink
                to={"/profile"}
                className="navbar__submenu-content-a"
                onClick={checkUserAuthenticated}
              >
                Profile
              </NavLink>
              <div className="navbar__submenu-arrow">
                <BsFillArrowRightCircleFill />
              </div>
              <NavLink
                to="/"
                className="navbar__submenu-content-a"
                onClick={handleLogout}
              >
                Sign out
              </NavLink>
            </div>
          </div>
          <NavLink to="/my-playlists" className="navbar__playlist">
            My playlists
          </NavLink>
          <NavLink to="/" className="navbar__home">
            Home
          </NavLink>
          <Player />
        </div>
      ) : (
        <div className="navbar">
          <NavLink to="/login" className="navbar__playlist">
            Login
          </NavLink>
          <Player />
        </div>
      )}
    </div>
  );
};

export default NavbarComp;
