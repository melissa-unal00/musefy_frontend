export const splitCookie = (cookies: any) => {
  if (typeof cookies.token !== "undefined") {
    const jwt = cookies.token;
    const jwtSplit = jwt.split(".");
    const data = atob(jwtSplit[1]);
    const dataObject = JSON.parse(data);
    return dataObject;
  }
};
