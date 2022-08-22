import React, { SetStateAction } from "react";
import CustomLink from "./CustomLink";
import { getHeaderLinks } from "./Header";

interface Props {
  open: boolean;
  isAuthenticated: () => boolean;
  logout: () => void;
  dashboard: () => string;
  setOpen: (value: SetStateAction<boolean>) => void;
}

function Menu({ open, isAuthenticated, logout, dashboard, setOpen }: Props) {
  // const links = [
  //   { text: "HOME", link: "/home" },
  //   { text: "ABOUT US", link: "/about" },
  //   { text: "DONATE A FOOD BASKET", link: "/donate" },
  //   { text: "PRODUCTS", link: "/products" },
  //   { text: "GIFT A BASKET", link: "/gift" },
  //   { text: "CONTACT", link: "/contact" },
  // ];

  // if (!isAuthenticated()) links.push({ text: "LOGIN", link: "/login" });
  const links = getHeaderLinks({ isAuthenticated, dashboard });
  return (
    <div
      onClick={() => setOpen(false)}
      className={`${
        open ? "translate-x-0" : "-translate-x-full"
      } justify-center h-screen p-8 absolute 
      top-16 left-0 transition transform ease-in-out duration-300 w-full flex-col space-y-4 bg-white z-50 lg:hidden`}
    >
      {links.map((link) => (
        <CustomLink link={link} key={link.text} />
      ))}
      {isAuthenticated() && (
        <button
          className="hover:text-green-400 text-sm xl:text-base"
          onClick={() => logout()}
        >
          LOGOUT
        </button>
      )}
    </div>
  );
}

export default Menu;
