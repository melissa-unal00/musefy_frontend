import React, { ReactNode, useContext, useEffect, useState } from "react";
import { TextField, MenuItem } from "@material-ui/core";
import axios from "axios";
import { UserContext } from "../../../context/UserContext";
import { useCookies } from "react-cookie";

type Props = {
  children?: ReactNode;
  className?: string;
  value?: string;
  variant: "standard" | "filled" | "outlined" | undefined;
  label?: string;
  onChange?: any;
  type?: string;
  select?: boolean;
  required?: boolean;
  name?: string;
  color?: "primary" | "secondary";
  InputLabelProps?: any;
  InputProps?: any;
  autoFocus?: any;
  disabled?: boolean;
};
const genders = ["Male", "Female", "Other"];

const generateYears = () => {
  let years = [];
  let currentYear = new Date().getFullYear();
  for (let i = currentYear - 100; i < currentYear; i++) {
    years.push(i);
  }
  return years;
};
const years: number[] = generateYears();

const generateMonths = () => {
  let months = [];
  for (let i = 0; i < 12; i++) {
    months.push(i + 1);
  }
  months.toString();
  for (let i = 0; i < 9; i++) {
    months[i] = "0" + months[i];
  }
  return months;
};
const months: (string | number)[] = generateMonths();

const generateDays = () => {
  let days = [];
  for (let i = 0; i < 31; i++) {
    days.push(i + 1);
  }
  days.toString();
  for (let i = 0; i < 9; i++) {
    days[i] = "0" + days[i];
  }
  return days;
};

const days: (string | number)[] = generateDays();

const FormField = ({
  className,
  value,
  variant,
  label,
  onChange,
  type,
  select,
  required,
  name,
  color,
  InputLabelProps,
  InputProps,
  autoFocus,
  disabled,
}: Props) => {
  const [allPlaylists, setAllPlaylists] = useState<any>([]);
  let userContextData = useContext(UserContext);
  const helpOptions = ["Account", "Technical", "Audio", "Other"];
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const postPlaylists = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_BACKEND}/api/playlist/allPlaylist`,
        userContextData,
        {
          headers: {
            token: cookies.token,
          },
        }
      )
      .then((res: any) => {
        setAllPlaylists(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    postPlaylists();
  }, []);

  return (
    <TextField
      className={className}
      type={type}
      value={value}
      variant={variant}
      label={label}
      onChange={onChange}
      select={select}
      required={required}
      name={name}
      color={color}
      InputLabelProps={InputLabelProps}
      InputProps={InputProps}
      autoFocus={autoFocus}
      disabled={disabled}
    >
      {select && label === "Gender"
        ? genders.map((option: any) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))
        : null}
      {select && label === "Day"
        ? days.map((option: any) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))
        : null}
      {select && label === "Month"
        ? months.map((option: any) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))
        : null}
      {select && label === "Year"
        ? years.map((option: any) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))
        : null}

      {select && label === "Playlists"
        ? allPlaylists.map((option: any) => (
            <MenuItem key={"playlists_id_" + option._id} value={option}>
              {option.playlistName}
            </MenuItem>
          ))
        : null}

      {select && label === "Help"
        ? helpOptions.map((option: any) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))
        : null}
    </TextField>
  );
};

export default FormField;
