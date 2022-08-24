import React, { useState } from "react";
import bellyfood from "../../assets/images/bellyfood-logo.jpg";
import { MenuIcon, XIcon } from "@heroicons/react/solid";
import Menu from "./HeaderMenu";
import CustomLink from "./CustomLink";
import { LinkRoutes, post } from "../../utils";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { setUser } from "../../store/userReducer";

interface Props {
  isAuthenticated: () => boolean;
  dashboard: () => string;
}

export const getHeaderLinks = ({ isAuthenticated, dashboard }: Props) => {
  const links = [
    { text: "HOME", link: "/home" },
    { text: "ABOUT US", link: "/home#about", isA: true },
    { text: "DONATE A FOOD BASKET", link: "/home#donate", isA: true },
    { text: "SUBSCRIPTION PLAN", link: "/home#baskets", isA: true },
    { text: "GIFT A BASKET", link: "/home#gift", isA: true },
    { text: "CONTACT", link: "/home#contact", isA: true },
  ];
  if (isAuthenticated()) links.push({ text: "DASHBOARD", link: dashboard() });
  if (!isAuthenticated()) links.push({ text: "LOGIN", link: "/login" });
  return links;
};

function Header({ isAuthenticated, dashboard }: Props) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const links = getHeaderLinks({ isAuthenticated, dashboard });

  const dispatch = useAppDispatch();
  const logout = async () => {
    await post("auth/logout");
    console.log("Logging out");
    dispatch(setUser(undefined));
    navigate(LinkRoutes.LOGIN);
    window.location.reload();
  };

  return (
    <div className="sticky w-full top-0 flex bg-white mx-auto justify-between items-center px-2 shadow-sm z-50">
      <Link to="/home">
        <img
          className="w-20 flex-shrink-0 cursor-pointer"
          src={bellyfood}
          alt={"Company logo"}
        />
      </Link>

      <div className="lg:flex space-x-8 hidden">
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
      <Menu
        open={open}
        setOpen={setOpen}
        isAuthenticated={isAuthenticated}
        logout={logout}
        dashboard={dashboard}
      />
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
