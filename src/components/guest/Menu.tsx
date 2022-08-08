import React from "react";
import CustomLink from "./CustomLink";

interface Props {
  open: boolean;
}

function Menu({ open }: Props) {
  const links = [
    { text: "HOME", link: "/home" },
    { text: "ABOUT US", link: "/about" },
    { text: "DONATE A FOOD BASKET", link: "/donate" },
    { text: "PRODUCTS", link: "/products" },
    { text: "GIFT A BASKET", link: "/gift" },
    { text: "CONTACT", link: "/contact" },
    { text: "LOGIN", link: "/login" },
  ];
  return (
    <div
      className={`${
        open ? "translate-x-0" : "-translate-x-full"
      } justify-center h-full p-8 absolute 
      top-20 left-0 transition transform ease-in-out duration-300 w-full flex-col space-y-4 bg-white z-50 lg:hidden`}
    >
      {links.map((link) => (
        <CustomLink text={link.text} link={link.link} key={link.text} />
      ))}
    </div>
  );
}

export default Menu;
