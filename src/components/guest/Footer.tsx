import React from "react";
import twitterIcon from "../../assets/images/icons8-twitter.svg";

function Footer() {
  return (
    <div className="flex max-w-5xl mx-auto justify-between items-center pt-12 pb-2 flex-col lg:flex-row space-y-3">
      <div className="flex space-x-2">
        <img
          alt={"Social media icon"}
          src={twitterIcon}
          className="border rounded-full border-black p-2 w-12 cursor-pointer 
          hover:bg-green-400 transform duration-300 ease-in"
        />
        <img
          alt={"Social media icon"}
          src={twitterIcon}
          className="border rounded-full border-black p-2 w-12 cursor-pointer 
          hover:bg-green-400 transform duration-300 ease-in"
        />
        <img
          alt={"Social media icon"}
          src={twitterIcon}
          className="border rounded-full border-black p-2 w-12 cursor-pointer 
          hover:bg-green-400 transform duration-300 ease-in"
        />
      </div>
      <div className="px-2">
        <button className="text-green-400">Privacy Policy</button> |{" "}
        <button className="text-green-400">Terms &amp; Conditions</button> |{" "}
        <button className="text-green-400">Terms of Use</button>
      </div>
      <div>
        <p className="text-sm">All rights reserved Bellyfood, Nigeria.</p>
      </div>
    </div>
  );
}

export default Footer;
