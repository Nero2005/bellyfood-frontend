import React from "react";
import twitterIcon from "../../assets/images/icons8-twitter.svg";

function Footer() {
  return (
    <div className="flex max-w-5xl mx-auto justify-between items-center pt-12 pb-2 flex-col lg:flex-row space-y-3">
      <div className="flex space-x-2">
        <img
          src={twitterIcon}
          className="border rounded-full border-black p-2 w-12 cursor-pointer 
          hover:bg-green-400 transform duration-300 ease-in"
        />
        <img
          src={twitterIcon}
          className="border rounded-full border-black p-2 w-12 cursor-pointer 
          hover:bg-green-400 transform duration-300 ease-in"
        />
        <img
          src={twitterIcon}
          className="border rounded-full border-black p-2 w-12 cursor-pointer 
          hover:bg-green-400 transform duration-300 ease-in"
        />
      </div>
      <div className="text-green-400">
        <a>Privacy Policy</a> | <a>Terms &amp; Conditions</a> |{" "}
        <a>Terms of Use</a>
      </div>
      <div>
        <p className="text-sm">All rights reserved Bellyfood, Nigeria.</p>
      </div>
    </div>
  );
}

export default Footer;
