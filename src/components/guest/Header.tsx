import React, { useState } from "react";
import bellyfood from "../../assets/images/bellyfood-logo.jpg";
import { MenuIcon, XIcon } from "@heroicons/react/solid";
import Menu from "./Menu";
import CustomLink from "./CustomLink";
function Header() {
  const [open, setOpen] = useState(false);
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
    <div className="flex bg-white max-w-6xl mx-auto justify-between items-center px-2 shadow">
      <img
        className="w-20 flex-shrink-0 cursor-pointer"
        src={bellyfood}
        alt={"Company logo"}
      />
      <div className="lg:flex space-x-8 hidden">
        {links.map((link) => (
          <CustomLink text={link.text} link={link.link} key={link.text} />
        ))}
      </div>
      <Menu open={open} />
      <div className="flex items-center lg:hidden">
        {open ? (
          <XIcon className="icon" onClick={() => setOpen(false)} />
        ) : (
          <MenuIcon className="icon" onClick={() => setOpen(true)} />
        )}
      </div>
    </div>
  );
}

export default Header;
