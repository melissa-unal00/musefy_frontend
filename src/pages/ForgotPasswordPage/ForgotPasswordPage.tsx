import {
  createTheme,
  makeStyles,
  MuiThemeProvider,
  StylesProvider,
} from "@material-ui/core";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useCookies } from "react-cookie";
import {
  Header,
  NavbarComp,
  Footer,
  FormField,
  ButtonComp,
} from "../../components/index";
import "./ForgotPasswordPage.scss";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [displayError, setDisplayError] = useState<boolean>();
  const [cookies, setCookie, removeCookie] = useCookies(["resetToken"]);

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
    axios
      .post(`${process.env.REACT_APP_BACKEND}/api/users/forgotPassword`, {
        email,
      })
      .then((res: any) => {
        setCookie("resetToken", res.data.token);
        setDisplayError(false);
        setEmail("");
      })
      .catch(() => {
        setDisplayError(true);
      });
  };
  return (
    <div>
      <Header />
      <NavbarComp />

      <MuiThemeProvider theme={theme}>
        <StylesProvider injectFirst>
          <div className="forgot-password">
            <form
              onSubmit={handleSubmit}
              className="formfield"
              action={`${process.env.REACT_APP_BACKEND}/api/users/home`}
              method="POST"
            >
              <div className="forgot-password__margin">
                <h1 className="forgot-password__title">
                  Please provide your email. You will shortly receive a reset
                  link on the provided email address. Be aware that the reset
                  link expires in{" "}
                  <span className="forgot-password__timer">10 minutes</span>.
                </h1>
                {displayError && (
                  <h1 className="forgot-password__error">
                    Something went wrong. Please try again!
                  </h1>
                )}
                {displayError === false && (
                  <h1 className="forgot-password__success">
                    Reset link sent successfully! Please check your email.
                  </h1>
                )}
                <FormField
                  variant="standard"
                  label="Email"
                  type="text"
                  value={email}
                  onChange={(e: any) => setEmail(e.target.value)}
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
          </div>
        </StylesProvider>
      </MuiThemeProvider>

      <Footer />
    </div>
  );
};

export default ForgotPasswordPage;
