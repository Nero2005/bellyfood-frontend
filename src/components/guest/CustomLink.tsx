import React from "react";
import { NavLink } from "react-router-dom";

interface Props {
  text: string;
  link: string;
}

function CustomLink({ text, link }: Props) {
  return (
    <div>
      <NavLink
        className={({ isActive }) =>
          isActive ? "text-green-400" : "hover:text-green-400"
        }
        to={link}
      >
        {text}
      </NavLink>
    </div>
  );
}

export default CustomLink;
