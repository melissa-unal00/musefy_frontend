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
import { NavLink } from "react-router-dom";
import {
  Header,
  NavbarComp,
  Footer,
  FormField,
  ButtonComp,
  routeChange,
} from "../../components/index";
import "./ResetPasswordPage.scss";

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [repeatNewPassword, setRepeatNewPassword] = useState("");
  const [displayError, setDisplayError] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies([
    "token",
    "resetToken",
  ]);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const user = { newPassword, repeatNewPassword };
    await axios
      .put(
        `${process.env.REACT_APP_BACKEND}/api/users/resetPassword/${cookies.resetToken}`,
        user
      )
      .then(() => {
        setIsSubmitted(true);
        removeCookie("resetToken", { path: "/" });
      })
      .catch(() => setDisplayError(true));
  };

  useEffect(() => {
    removeCookie("token");
  }, []);

  return (
    <div>
      <Header />
      <NavbarComp />
      <MuiThemeProvider theme={theme}>
        <StylesProvider injectFirst>
          <div className="reset-password">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="formfield" method="POST">
                <h1 className="reset-password__title">
                  Enter your new password. Make sure that you reenter the same
                  password you choose.
                </h1>
                {displayError && (
                  <h1 className="reset-password__error">
                    Something went wrong. Make sure that your passwords match or
                    that the reset link has not yet expired.
                  </h1>
                )}
                <div className="reset-password__margin">
                  <FormField
                    variant="standard"
                    label="New Password"
                    type="password"
                    value={newPassword}
                    onChange={(e: any) => setNewPassword(e.target.value)}
                    InputLabelProps={{
                      className: classes.input,
                    }}
                  />
                </div>

                <div className="reset-password__margin">
                  <FormField
                    variant="standard"
                    label="Repeat New Password"
                    type="password"
                    value={repeatNewPassword}
                    onChange={(e: any) => setRepeatNewPassword(e.target.value)}
                    InputLabelProps={{
                      className: classes.input,
                    }}
                  />
                </div>
                <br />
                <br />
                <br />
                <ButtonComp type="submit" variant="contained">
                  Submit
                </ButtonComp>
              </form>
            ) : (
              <h2 className="reset-password__success">
                You have successfully changed your password. Please return to
                the login page by accessing{" "}
                <a href={"/login"} className="reset-password__this">
                  this
                </a>{" "}
                link. Thank you for being part of our community!
              </h2>
            )}
          </div>
        </StylesProvider>
      </MuiThemeProvider>

      <Footer />
    </div>
  );
};

export default ResetPasswordPage;
