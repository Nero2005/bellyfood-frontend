import React from "react";
import { NavLink } from "react-router-dom";

interface Props {
  link: { text: string; link: string; isA?: boolean };
}

function CustomLink({ link }: Props) {
  return (
    <div>
      {link.isA ? (
        <a className="hover:text-green-400" href={link.link}>
          {link.text}
        </a>
      ) : (
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-green-400" : "hover:text-green-400"
          }
          to={link.link}
        >
          {link.text}
        </NavLink>
      )}
    </div>
  );
}

export default CustomLink;
