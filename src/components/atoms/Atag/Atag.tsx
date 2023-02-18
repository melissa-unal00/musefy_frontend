import React from "react";

import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

interface Props {
  className?: string;
  icon?: string;
  link?: string;
}
const getIcon = (icon: string) => {
  switch (icon) {
    case "InstagramIcon":
      return <FaInstagram />;
    case "FacebookIcon":
      return <FaFacebook />;
    case "TwitterIcon":
      return <FaTwitter />;
  }
};
const getLink = (link: string) => {
  switch (link) {
    case "facebookPage":
      return "https://www.facebook.com";
    case "instagramPage":
      return "https://www.instagram.com";
    case "twitterPage":
      return "https://www.twitter.com";
  }
};
const Atag = ({ link, className, icon }: Props) => (
  <a
    target="_blank"
    rel="noreferrer"
    href={link ? getLink(link) : ""}
    className={className}
  >
    {icon ? getIcon(icon) : null}
  </a>
);
export default Atag;
