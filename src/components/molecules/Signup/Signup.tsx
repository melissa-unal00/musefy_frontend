import React, { useState } from "react";
// import "../../atoms/Button/Button.scss";
// import "../Signup/Signup.scss";
import {
  FormField,
  Button,
  NavbarComp,
  Header,
  Footer,
  Input,
  routeChange,
} from "../../index";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./Signup.scss";
import {
  createTheme,
  makeStyles,
  MuiThemeProvider,
  StylesProvider,
} from "@material-ui/core";

const Signup = () => {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("Male");
  const [year, setYear] = useState(`${new Date().getFullYear() - 100}`);
  const [month, setMonth] = useState("01");
  const [day, setDay] = useState("01");
  const [birthday, setBirthday] = useState(`${year}-${month}-${day}`);
  const [displayError, setDisplayError] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  let newProfileImage: string = "";

  const history = useHistory();

  const handleDay = (e: any) => {
    setDay(e.target.value);
    setBirthday(`${year}-${month}-${e.target.value}`);
  };

  const handleMonth = (e: any) => {
    setMonth(e.target.value);
    setBirthday(`${year}-${e.target.value}-${day}`);
  };

  const handleYear = (e: any) => {
    setYear(e.target.value);
    setBirthday(`${e.target.value}-${month}-${day}`);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!uploaded) {
      setDisplayError(true);
    } else {
      const user = {
        firstName,
        lastName,
        email,
        username,
        password,
        gender,
        birthday,
      };
      axios
        .post(`${process.env.REACT_APP_BACKEND}/api/users/register`, user)
        .then(() => {
          routeChange(e, `login`, history);
        })
        .catch(() => {
          setDisplayError(true);
        });
    }
  };

  const uploadProfilePhoto = async (e: any) => {
    await axios
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
    });
    setUploaded(true);
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
    <div className="signup__form--styling">
      <MuiThemeProvider theme={theme}>
        <StylesProvider injectFirst>
          <form
            onSubmit={handleSubmit}
            className="formfield"
            method="POST"
            action={`${process.env.REACT_APP_BACKEND}/api/users/register`}
          >
            <h1 className="signup__title">Create account</h1>
            {displayError && (
              <h2 className="signup__error">
                Something went wrong. Please try again!
              </h2>
            )}
            <div className="signup__margin">
              <FormField
                variant="standard"
                label="First Name"
                type="text"
                value={firstName}
                required
                onChange={(e: any) => setFirstName(e.target.value)}
                InputLabelProps={{
                  className: classes.input,
                }}
              />
            </div>
            <div className="signup__margin">
              <FormField
                variant="standard"
                label="Last Name"
                type="text"
                value={lastName}
                required
                onChange={(e: any) => setLastName(e.target.value)}
                InputLabelProps={{
                  className: classes.input,
                }}
              />
            </div>
            <div className="signup__margin">
              <FormField
                variant="standard"
                label="Email"
                type="text"
                value={email}
                required
                onChange={(e: any) => setEmail(e.target.value)}
                InputLabelProps={{
                  className: classes.input,
                }}
              />
            </div>
            <div className="signup__margin">
              <FormField
                variant="standard"
                label="Username"
                type="text"
                value={username}
                required
                onChange={(e: any) => setUsername(e.target.value)}
                InputLabelProps={{
                  className: classes.input,
                }}
              />
            </div>
            <div className="signup__margin">
              <FormField
                variant="standard"
                label="Password"
                type="password"
                value={password}
                required
                onChange={(e: any) => setPassword(e.target.value)}
                InputLabelProps={{
                  className: classes.input,
                }}
              />
            </div>
            <br />
            <div className="signup__margin">
              <FormField
                className="signup__width"
                variant="standard"
                label="Gender"
                type="text"
                select
                required
                value={gender}
                onChange={(e: any) => setGender(e.target.value)}
                InputLabelProps={{
                  className: classes.input,
                }}
              />
            </div>
            <FormField
              className="signup__width signup__margin"
              variant="standard"
              label="Day"
              type="text"
              select
              required
              value={day}
              onChange={handleDay}
              InputLabelProps={{
                className: classes.input,
              }}
            />
            <FormField
              className="signup__width signup__margin"
              variant="standard"
              label="Month"
              type="text"
              select
              required
              value={month}
              onChange={handleMonth}
              InputLabelProps={{
                className: classes.input,
              }}
            />
            <FormField
              className="signup__width signup__margin"
              variant="standard"
              label="Year"
              type="text"
              select
              required
              value={year}
              onChange={handleYear}
              InputLabelProps={{
                className: classes.input,
              }}
            />
            <br />
            <br />
            <Input
              type="file"
              onChange={uploadProfilePhoto}
              id="signup-photo"
            ></Input>
            <label htmlFor="signup-photo" id="signup-custom">
              Choose photo
            </label>
            <br />
            <div className="signup__margin">
              <Button>Submit</Button>
            </div>
          </form>
        </StylesProvider>
      </MuiThemeProvider>
    </div>
  );
};

export default Signup;
