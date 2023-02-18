import {
  createTheme,
  makeStyles,
  MuiThemeProvider,
  StylesProvider,
} from "@material-ui/core";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router";
import {
  Header,
  NavbarComp,
  Footer,
  ImageComp,
  FormField,
  Button,
  routeChange,
  Input,
} from "../../components/index";
import { UserContext } from "../../context/UserContext";
import "./ProfilePage.scss";

const ProfilePage = () => {
  let userContextData = useContext(UserContext);
  let { userId } = userContextData;
  let { username } = userContextData;
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const [userData, setUserData] = useState<Types>({
    lastName: "",
    firstName: "",
    email: "",
    username: "",
    gender: "",
    birthday: "",
    profileImage: "",
  });
  let newProfileImage: string = "";
  const history = useHistory();

  interface Types {
    lastName: string;
    firstName: string;
    email: string;
    username: string;
    gender: string;
    birthday: string;
    profileImage: string;
  }

  const fetchUserData = (userId: string) => {
    axios
      .get(`${process.env.REACT_APP_BACKEND}/api/users/profile/${userId}`, {
        headers: {
          token: cookies.token,
        },
      })
      .then((res: any) => {
        setUserData(res.data.data);
      })
      .catch((e) => {
        removeCookie("token", { path: "/" });
        routeChange(e, `/`, history);
      });
  };

  const uploadProfilePhoto = async (e: any) => {
    axios
      .put(`${process.env.REACT_APP_BACKEND}/api/users/uploadPhoto`, {
        username,
      })
      .then((res: any) => {
        newProfileImage = res.data.data;
      });

    const { files } = e.target;
    await fetch(newProfileImage, {
      method: "PUT",
      headers: {
        "Context-Type": "multipart/form-data",
      },
      body: files[0],
    }).then(() => {
      window.location.reload();
    });
  };

  useEffect(() => {
    fetchUserData(userId);
  }, []);

  const handleSubmit = async () => {
    let { lastName, firstName, email } = userData;
    await axios
      .put(`${process.env.REACT_APP_BACKEND}/api/users/updateUser`, {
        lastName,
        firstName,
        email,
      })
      .then((res) => {})
      .catch(() => {
        window.location.reload();
      });
  };

  const onChange = (e: any) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
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
    <div>
      <Header />
      <NavbarComp />

      <div className="profile-page--styling">
        <div className="profile-page--flex-parent profile-page--center">
          <div className="profile-page__field-name profile-page--flex-child">
            <div className="profile-page__image">
              <div className="">
                <ImageComp
                  className="image"
                  src={userData.profileImage + "?time=" + new Date().valueOf()}
                  alt="Mock image"
                ></ImageComp>
                <Input
                  type="file"
                  id="upload-photo"
                  onChange={uploadProfilePhoto}
                ></Input>{" "}
                <label htmlFor="upload-photo" id="upload-custom">
                  Choose photo
                </label>
              </div>
            </div>
            <div className="profile-page--flex-child">
              <br />
              <div className="height">Last Name</div>
              <br />
              <div className="height">First Name</div>
              <br />
              <div className="height">Email</div>
              <br />
              <div className="height">Username</div>
              <br />
              <div className="height">Gender</div>
              <br />
              <div className="height">Birthday</div>
            </div>
          </div>

          <div className="profile-page__field-box profile-page--flex-child">
            <div className="profile-page__image">
              <ImageComp
                className="image-none"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE26NjQaonqTRt7BXD_87Iuukitk_kcGBv3w&usqp=CAU"
                alt="Mock image"
              ></ImageComp>
            </div>
            <MuiThemeProvider theme={theme}>
              <StylesProvider injectFirst>
                <br />
                <form
                  onSubmit={handleSubmit}
                  className="formfield"
                  method="PUT"
                >
                  <div>
                    <FormField
                      name="lastName"
                      variant="standard"
                      type="text"
                      value={
                        (typeof userData !== "undefined" &&
                          userData.lastName) ||
                        ""
                      }
                      onChange={onChange}
                      required
                      InputLabelProps={{
                        className: classes.input,
                      }}
                    ></FormField>
                  </div>
                  <br />
                  <div>
                    <FormField
                      name="firstName"
                      variant="standard"
                      type="text"
                      value={
                        (typeof userData !== "undefined" &&
                          userData.firstName) ||
                        ""
                      }
                      onChange={onChange}
                      required
                      InputLabelProps={{
                        className: classes.input,
                      }}
                    ></FormField>
                  </div>
                  <br />
                  <div>
                    <FormField
                      variant="standard"
                      type="text"
                      value={
                        (typeof userData !== "undefined" && userData.email) ||
                        ""
                      }
                      required
                      InputLabelProps={{
                        className: classes.input,
                      }}
                    ></FormField>
                  </div>
                  <br />
                  <div>
                    <FormField
                      variant="standard"
                      type="text"
                      value={
                        (typeof userData !== "undefined" &&
                          userData.username) ||
                        ""
                      }
                      required
                      InputLabelProps={{
                        className: classes.input,
                      }}
                    ></FormField>
                  </div>
                  <br />
                  <div>
                    <FormField
                      variant="standard"
                      type="text"
                      value={
                        (typeof userData !== "undefined" && userData.gender) ||
                        ""
                      }
                      required
                      InputLabelProps={{
                        className: classes.input,
                      }}
                    ></FormField>
                  </div>
                  <br />
                  <div>
                    <FormField
                      variant="standard"
                      type="text"
                      value={
                        (typeof userData !== "undefined" &&
                          userData.birthday.slice(0, 10)) ||
                        ""
                      }
                      required
                      InputLabelProps={{
                        className: classes.input,
                      }}
                    ></FormField>
                  </div>
                </form>
              </StylesProvider>
            </MuiThemeProvider>
          </div>
        </div>
        <div className="profile-page__button">
          <br />
          <br />
          <Button onClick={handleSubmit}>Update Data</Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
