import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  ImageComp,
  NavbarComp,
  UserProfileModal,
} from "../../components";
import "./MapPage.scss";
import { FaMapPin } from "react-icons/fa";
import ReactMapGl, { Marker, Popup } from "react-map-gl";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import * as Location from "expo-location";
import { FcMusic } from "react-icons/fc";

const MapPage = () => {
  const [viewport, setViewport] = useState({
    width: "220vh",
    height: "100vh",
    latitude: 44.4268,
    longitude: 26.1025,
    zoom: 8,
  });
  const [users, setUsers] = useState<any>([]);
  const [latitude, setLatitude] = useState<any>();
  const [longitude, setLongitude] = useState<any>();
  const [audio, setAudio] = useState<any>([]);
  const [userProfile, setUserProfile] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const userContextData = useContext(UserContext);
  const userId = userContextData.userId;

  const handleCloseButton = () => {
    setUserProfile(false);
  };

  const saveUserLocation = async () => {
    await axios
      .put(`${process.env.REACT_APP_BACKEND}/api/users/userLocation`, {
        userId,
        latitude,
        longitude,
      })
      .then((res: any) => {
        let usersArray = res.data.data.map((obj: any) => ({ ...obj }));
        setUsers(usersArray);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getUsers();
    getAudio();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLongitude(position.coords.longitude);
        setLatitude(position.coords.latitude);
      });
      saveUserLocation();
    }, 1000);
    return () => clearInterval(interval);
  }, [latitude, longitude]);

  const getUsers = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND}/api/users/getUsers`)
      .then((res: any) => setUsers(res.data.data));
  };

  const getAudio = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND}/api/audio/allAudio`)
      .then((res: any) => setAudio(res.data.data));
  };
  return (
    <div className="map">
      <NavbarComp />
      <ReactMapGl
        {...viewport}
        mapboxApiAccessToken={
          "pk.eyJ1IjoibWVsaXNzYS11bmFsIiwiYSI6ImNrdjlxOHQ0MTA3b3EycHBnZjc1cWgwbjcifQ.cH_IOEwzTCS3NOlY-JVwew"
        }
        onViewportChange={(nextViewport: any) => setViewport(nextViewport)}
        mapStyle="mapbox://styles/melissa-unal/ckv9tc0tvahv715npzszp620v"
      >
        {users.map((value: any, idx: any) => (
          <div key={idx}>
            {value?.latitude !== "0" && value?.longitude !== "0" && (
              <div>
                <Marker
                  latitude={parseFloat(value.latitude)}
                  longitude={parseFloat(value.longitude)}
                  offsetLeft={-20}
                  offsetTop={-10}
                >
                  <FaMapPin />
                </Marker>
                {
                  <Popup
                    latitude={parseFloat(value.latitude)}
                    longitude={parseFloat(value.longitude)}
                    closeButton={false}
                    closeOnClick={true}
                    anchor="left"
                  >
                    <div className="map__popup">
                      <ImageComp
                        src={value.profileImage}
                        className="map__popup-user-photo"
                      ></ImageComp>
                      <div>
                        <Button
                          className="map__popup-username"
                          onClick={() => {
                            setUserProfile(true);
                            setSelectedUser(value._id);
                          }}
                        >
                          {value.username}
                        </Button>
                        <div className="map__popup-location">
                          {value.latitude}, {value.longitude}
                        </div>
                        {audio.map((elem: any) => {
                          return (
                            <div className="map__popup-song">
                              {elem._id === value.currentSongId && (
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                  }}
                                >
                                  <ImageComp
                                    src={elem.albumCover}
                                    className="map__popup-song-cover"
                                  ></ImageComp>
                                  <span id="song">
                                    <FcMusic /> {elem.artistName} -{" "}
                                    {elem.audioName}
                                  </span>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </Popup>
                }
              </div>
            )}
          </div>
        ))}
      </ReactMapGl>
      {userProfile && (
        <UserProfileModal
          selectedUser={selectedUser}
          onCloseClick={handleCloseButton}
        />
      )}
    </div>
  );
};

export default MapPage;
