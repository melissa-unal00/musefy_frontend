import React from "react";

interface Types {
  username: string;
  userId: string;
  profileImage: string;
  email: string;
}

const defaultState = {
  username: "",
  userId: "",
  profileImage: "",
  email: "",
};

export const UserContext = React.createContext<Types>(defaultState);
