//atoms
import FormField from "./atoms/FormField/FormField";
import ButtonComp from "./atoms/ButtonComp/ButtonComp";
import Atag from "./atoms/Atag/Atag";
import Input from "./atoms/Input/Input";
import ImageComp from "./atoms/Image/ImageComp";
import Button from "./atoms/Button/Button";
import Contact from "./atoms/Contact/Contact";

//molecules
import Signup from "./molecules/Signup/Signup";
import Signin from "./molecules/Signin/Signin";
import NavbarComp from "./molecules/NavbarComp/NavbarComp";
import SearchBar from "./molecules/SearchBar/SearchBar";
import Player from "./molecules/Player/Player";
import MyPlaylists from "./molecules/MyPlaylists/MyPlaylists";
import SongList from "./molecules/SongList/SongList";
import Song from "./molecules/Song/Song";
import CreatePlaylistModal from "./molecules/CreatePlaylistModal/CreatePlaylistModal";
import Slider from "./molecules/Slider/Slider";
import AddToPlaylistModal from "./molecules/AddToPlaylistModal/AddToPlaylistModal";
import ResultModal from "./molecules/ResultModal/ResultModal";
import ResultModalNormal from "./molecules/ResultModalNormal/ResultModalNormal";
import Chat from "./molecules/Chat/Chat";
import CarouselComp from "./molecules/CarouselComp/CarouselComp";
import ReviewsList from "./molecules/ReviewsList/ReviewsList";
import Help from "./molecules/Help/Help";
import OpenSearchedSong from "./molecules/OpenSearchedSong/OpenSearchedSong";
import UserProfileModal from "./molecules/UserProfileModal/UserProfileModal";
import Trending from "./molecules/Trending/Trending";
import Artist from "./molecules/Artist/Artist";

//organisms
import Header from "./organisms/Header/Header";
import Footer from "./organisms/Footer/Footer";

//pages
import SigninPage from "../pages/SigninPage";
import SignupPage from "../pages/SignupPage";
import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage/ForgotPasswordPage";
import ResetPasswordPage from "../pages/ResetPasswordPage/ResetPasswordPage";
import TrendingPage from "../pages/TrendingPage";
import MyPlaylistsPage from "../pages/MyPlaylistsPage";
import ResultModalNormalPage from "../pages/ResultModalNormalPage";
import ReviewsPage from "../pages/ReviewsPage";
import HelpPage from "../pages/HelpPage";
import MapPage from "../pages/MapPage/MapPage";
import ArtistPage from "../pages/ArtistPage/ArtistPage";

//functions
import { splitCookie } from "../utils/functions/splitCookie";
import { routeChange } from "../utils/functions/routeChange";

export {
  Footer,
  Signup,
  FormField,
  ButtonComp,
  Signin,
  NavbarComp,
  Header,
  Atag,
  SigninPage,
  SignupPage,
  HomePage,
  Input,
  ProfilePage,
  SearchBar,
  ImageComp,
  ForgotPasswordPage,
  ResetPasswordPage,
  splitCookie,
  routeChange,
  TrendingPage,
  Player,
  Button,
  MyPlaylistsPage,
  MyPlaylists,
  SongList,
  Song,
  CreatePlaylistModal,
  Slider,
  AddToPlaylistModal,
  ResultModal,
  ResultModalNormal,
  Chat,
  CarouselComp,
  ResultModalNormalPage,
  ReviewsPage,
  ReviewsList,
  HelpPage,
  Help,
  MapPage,
  OpenSearchedSong,
  ArtistPage,
  Contact,
  UserProfileModal,
  Trending,
  Artist,
};
