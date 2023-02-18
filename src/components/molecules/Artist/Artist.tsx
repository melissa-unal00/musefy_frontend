import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { ArtistContext } from "../../../context/ArtistContext";
import { ImageComp } from "../..";
import "./Artist.scss";

const Artist = () => {
  const artistContextData = useContext(ArtistContext);
  const [artistData, setArtistData] = useState<any>(null);
  const [albumData, setAlbumData] = useState<any>(null);

  const getArtist = () => {
    const artistName = artistContextData.selectedArtistName;
    axios
      .get(
        `${process.env.REACT_APP_BACKEND}/api/artist/getArtist/${artistName}`
      )
      .then((res: any) => setArtistData(res.data.data));
  };

  const getAlbums = () => {
    const artistName = artistContextData.selectedArtistName;
    axios
      .post(`${process.env.REACT_APP_BACKEND}/api/audio/getAlbums`, {
        artistName,
      })
      .then((res: any) => setArtistData(res.data.data));
  };

  useEffect(() => {
    getArtist();
    getAlbums();
  }, []);

  return (
    <div>
      {artistData && (
        <div className="artist">
          <div className="artist__info">
            <ImageComp src={artistData.artistImage} className="artist__image" />
            <div>
              <div className="artist__name">{artistData.artistName}</div>
              <div className="artist__gender">{artistData.gender}</div>
            </div>
          </div>
          <div></div>
        </div>
      )}
    </div>
  );
};

export default Artist;
