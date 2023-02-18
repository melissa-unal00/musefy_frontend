import {
  createTheme,
  makeStyles,
  MuiThemeProvider,
  StylesProvider,
} from "@material-ui/core";
import axios from "axios";
import React, { useContext, useState } from "react";
import { Button, Input } from "../..";
import FormField from "../../atoms/FormField/FormField";
import "./Help.scss";

const Help = () => {
  const [input, setInput] = useState("");
  const [issueType, setIssueType] = useState("");
  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState<boolean>();
  const handleSubmitIssue = async () => {
    if (input !== "") {
      await axios
        .post(`${process.env.REACT_APP_BACKEND}/api/users/submitIssue`, {
          email,
          input,
          issueType,
        })
        .then((res: any) => {
          setInput("");
          setEmail("");
          setIssueType("");
          setIsSent(true);
        })
        .catch(() => setIsSent(false));
    }
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
    <div className="help">
      <h1 className="help__title">
        Did you encounter any issues? Let us know your issue below and we will
        be happy to help! Please provide the email where you would like to be
        contacted and state your issue in detail.
      </h1>
      {isSent === true && (
        <h1 className="help__success">
          Your email has been sent succesfully! We will be getting back to you
          as soon as possible!
        </h1>
      )}
      {isSent === false && (
        <h1 className="help__error">Something went wrong. Please try again!</h1>
      )}
      <MuiThemeProvider theme={theme}>
        <StylesProvider injectFirst>
          <FormField
            className="help__email"
            variant="standard"
            label="Email"
            type="text"
            required
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
            InputLabelProps={{
              className: classes.input,
            }}
          />
          <FormField
            className="help__select"
            variant="standard"
            label="Help"
            type="text"
            select
            required
            value={issueType}
            onChange={(e: any) => setIssueType(e.target.value)}
            InputLabelProps={{
              className: classes.input,
            }}
          />
          <div className="help__message">
            <Input
              value={input}
              className="help__input"
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSubmitIssue()}
            ></Input>
            <Button className="help__button" onClick={handleSubmitIssue}>
              Send
            </Button>
          </div>{" "}
        </StylesProvider>
      </MuiThemeProvider>
    </div>
  );
};

export default Help;
