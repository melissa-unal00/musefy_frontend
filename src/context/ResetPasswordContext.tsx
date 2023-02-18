import React from "react";

interface Types {
  token: string;
  setToken: any;
}

const defaultState = {
  token: "",
  setToken: (): void => {},
};

export const ResetPasswordContext = React.createContext<Types>(defaultState);
