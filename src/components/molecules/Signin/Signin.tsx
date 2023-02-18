import axios from "axios";
import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Button, FormField, routeChange } from "../../index";
import { useCookies } from "react-cookie";
import "./Signin.scss";
import {
  createTheme,
  makeStyles,
  MuiThemeProvider,
  StylesProvider,
} from "@material-ui/core";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [displayError, setDisplayError] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies([
    "token",
    "resetToken",
  ]);

  const history = useHistory();

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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const user = { username, password };
    axios
      .post(`${process.env.REACT_APP_BACKEND}/api/users/login`, user)
      .then((res: any) => {
        setCookie("token", res.data.token);
        routeChange(e, `/`, history);
        window.location.reload();
      })
      .catch(() => {
        setDisplayError(true);
      });
  };

  return (
    <div className="signin__form--styling">
      <form
        onSubmit={handleSubmit}
        className="formfield"
        action={`${process.env.REACT_APP_BACKEND}/api/users/login`}
        method="POST"
      >
        <MuiThemeProvider theme={theme}>
          <StylesProvider injectFirst>
            {displayError && (
              <h2 className="signin__error">
                Wrong credentials. Please try again!
              </h2>
            )}
            <div className="signin__margin">
              <FormField
                variant="standard"
                label="Username"
                type="text"
                value={username}
                onChange={(e: any) => setUsername(e.target.value)}
                InputLabelProps={{
                  className: classes.input,
                }}
              />
            </div>
            <div className="signin__margin">
              <FormField
                variant="standard"
                label="Password"
                type="password"
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
                InputLabelProps={{
                  className: classes.input,
                }}
              />
            </div>
          </StylesProvider>
        </MuiThemeProvider>
        <br />
        <br />
        <Button>Submit</Button>
        <br />
        <br />
        <br />
        <h3 className="signin__text">
          Don't have an account? Sign up{" "}
          <NavLink to="/register" className="signin__link">
            here
          </NavLink>
        </h3>
        <br />
        <h3 className="signin__text">
          Forgot your password? Click{" "}
          <NavLink to="/forgot-password" className="signin__link">
            here
          </NavLink>
        </h3>
      </form>
    </div>
  );
};

export default Signin;
