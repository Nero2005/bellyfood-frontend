import React, { useState } from "react";
import bellyfood from "../../assets/images/bellyfood-logo.jpg";
import { MenuIcon, XIcon } from "@heroicons/react/solid";
import Menu from "./Menu";
import CustomLink from "./CustomLink";
import { LinkRoutes, post } from "../../utils";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { setUser } from "../../store/userReducer";

interface Props {
  isAuthenticated: () => boolean;
}

function Header({ isAuthenticated }: Props) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const links = [
    { text: "HOME", link: "/home" },
    { text: "ABOUT US", link: "/about" },
    { text: "DONATE A FOOD BASKET", link: "/donate" },
    { text: "PRODUCTS", link: "/products" },
    { text: "GIFT A BASKET", link: "/gift" },
    { text: "CONTACT", link: "/contact" },
  ];

  if (!isAuthenticated()) links.push({ text: "LOGIN", link: "/login" });

  const dispatch = useAppDispatch();
  const logout = async () => {
    await post("auth/logout");
    dispatch(setUser(undefined));
    navigate(LinkRoutes.LOGIN);
    window.location.reload();
  };

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
        {isAuthenticated() && (
          <button className="hover:text-green-400" onClick={() => logout()}>
            LOGOUT
          </button>
        )}
      </div>
      <Menu open={open} isAuthenticated={isAuthenticated} logout={logout} />
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
