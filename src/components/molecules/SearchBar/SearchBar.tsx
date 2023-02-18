import React, {
  createElement,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import "./SearchBar.scss";
import {
  Input,
  Button,
  ResultModal,
  routeChange,
  OpenSearchedSong,
} from "../../index";
import { BiSearchAlt } from "react-icons/bi";
import { NavLink, useHistory } from "react-router-dom";
import axios from "axios";
import { MdImageSearch } from "react-icons/md";
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";
import { UserContext } from "../../../context/UserContext";
import { SearchResultContext } from "../../../context/SearchResultContext";
import ImageComp from "../../atoms/Image/ImageComp";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const [data, setData] = useState<any>([]);
  const [imageSearch, setImageSearch] = useState<any>([]);
  const [resultModal, setResultModal] = useState(false);
  // const [isLoaded, setIsLoaded] = useState(false);
  const [clickSearchedModal, setClickSearchedModal] = useState(false);
  const [songId, setSongId] = useState("");
  const userContextData = useContext(UserContext);
  const userId = userContextData.userId;
  const searchContextData = useContext(SearchResultContext);
  const history = useHistory();

  const getAllAudio = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND}/api/audio/allAudio`)
      .then((res: any) => setData(res.data.data));
  };

  const uploadPhoto = async (e: any) => {
    // setIsLoaded(false);
    let imageData: any;
    await axios
      .put(`${process.env.REACT_APP_BACKEND}/api/audio/uploadImage`, { userId })
      .then((res: any) => (imageData = res.data.data));

    const { files } = e.target;
    await fetch(imageData, {
      method: "PUT",
      headers: {
        "Context-Type": "multipart/form-data",
      },
      body: files[0],
    });

    const imgURL = imageData?.split("?")[0];

    const uploadedImage = new Image();
    uploadedImage.crossOrigin = "Anonymous";
    uploadedImage.src = imgURL;
    uploadedImage.width = 500;
    uploadedImage.height = 500;
    uploadedImage.onload = () => {
      tf.browser.fromPixels(uploadedImage);
    };

    const modelUpload = await mobilenet.load();
    const resultUpload = await modelUpload.classify(uploadedImage);
    const resultUploadStrings = resultUpload.map((elem) => {
      return elem.className;
    });

    let itemsToShow: any = [];
    for (let i = 0; i < data.length; i++) {
      const dataImage = new Image();
      dataImage.crossOrigin = "Anonymous";
      dataImage.src = data[i]?.albumCover + "?time=" + new Date().valueOf();
      dataImage.width = 500;
      dataImage.height = 500;
      // console.log(resultUpload);

      dataImage.onload = () => tf.browser.fromPixels(dataImage);
      const model1 = await mobilenet.load();
      const resultAllData = await model1.classify(dataImage);
      const resultAllDataStrings = resultAllData.map((elem) => {
        return elem.className;
      });

      for (let j = 0; j < resultAllDataStrings.length; j++) {
        if (resultUploadStrings.includes(resultAllDataStrings[j])) {
          itemsToShow.push(data[i]);
          break;
        }
      }
    }
    // setImageSearch(itemsToShow);
    searchContextData.setSearchData(itemsToShow.slice(0, 5));
  };
  const handleOnCloseClick = () => {
    setResultModal(false);
    // setImageSearch([]);
    window.location.reload();
  };

  const handleSearchRedirect = (e: any) => {
    searchContextData.searchData.length > 0 &&
      routeChange(e, `search`, history);
  };

  useEffect(() => {
    getAllAudio();
  }, []);

  // useEffect(() => {
  //   input !== "" ? setIsOpen(true) : setIsOpen(false);
  //   let searchDataArray: any = [];
  //   data.map(
  //     (value: any) =>
  //       value.audioName?.toLowerCase().includes(input) &&
  //       searchDataArray.push(value)
  //   );
  //   setSearchData(searchDataArray);
  // }, [input]);

  const handleSearchInputChange = (e: any) => {
    const value = e.target.value;

    const searchDataArray = data.filter((elem: any) => {
      return (
        elem.audioName?.toLowerCase().includes(value) ||
        elem.artistName?.toLowerCase().includes(value)
      );
    });
    setInput(value);
    searchContextData.setSearchData(searchDataArray);
  };

  const handleOnKeyPress = (e: any) => {
    e.key === "Enter" && handleSearchRedirect(e);
  };

  const handleCloseButton = () => {
    setClickSearchedModal(false);
  };

  return (
    <div className="searchbar">
      <div className="searchbar__input">
        <Input
          id="search-normal"
          type="text"
          placeholder="Browse here..."
          onChange={handleSearchInputChange}
          onKeyPress={(e) => handleOnKeyPress(e)}
        />
        <Button
          className="searchbar__icon-button"
          onClick={handleSearchRedirect}
        >
          <BiSearchAlt />
        </Button>
        <Input
          type="file"
          id="search-photo"
          onChange={uploadPhoto}
          onClick={() => setResultModal(true)}
        ></Input>
        <label htmlFor="search-photo" id="search-custom">
          <MdImageSearch />
        </label>
      </div>
      {searchContextData.searchData.length > 0 && input !== "" && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {searchContextData.searchData.slice(0, 4).map((value: any) => {
            return (
              <div style={{ zIndex: "11" }}>
                <Button
                  key={"search_data_item_" + value}
                  className="searchbar__result-option"
                  onClick={() => {
                    setClickSearchedModal(true);
                    setSongId(value._id);
                  }}
                >
                  {" "}
                  <ImageComp
                    src={value.albumCover}
                    style={{ width: "3rem", height: "2rem", float: "left" }}
                  ></ImageComp>
                  {value.audioName}
                </Button>
              </div>
            );
          })}
        </div>
      )}
      {resultModal ? <ResultModal onCloseClick={handleOnCloseClick} /> : null}

      {clickSearchedModal ? (
        <OpenSearchedSong songId={songId} onCloseClick={handleCloseButton} />
      ) : null}
    </div>
  );
};

export default SearchBar;
