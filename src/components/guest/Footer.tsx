import React from "react";
import twitterIcon from "../../assets/images/icons8-twitter-48.png";
import instagramIcon from "../../assets/images/icons8-instagram-48.png";
import facebookIcon from "../../assets/images/icons8-facebook-48.png";
//src/assets/images/icons8-instagram-48.png
function Footer() {
  return (
    <div className="bg-white flex max-w-7xl mt-10 px-5 mx-auto justify-between items-center pt-12 pb-2 flex-col lg:flex-row space-y-3">
      <div className="flex space-x-2">
        <a href="https://www.instagram.com/bellyfoodng/" target="_blank">
          <img
            alt={"Social media icon"}
            src={facebookIcon}
            className="border rounded-full border-black p-2 w-12 cursor-pointer 
          hover:bg-green-400 transform duration-300 ease-in"
          />
        </a>
        <a href="https://www.instagram.com/bellyfoodng/" target="_blank">
          <img
            alt={"Social media icon"}
            src={instagramIcon}
            className="border rounded-full border-black p-2 w-12 cursor-pointer 
          hover:bg-green-400 transform duration-300 ease-in"
          />
        </a>
        <a href="https://www.instagram.com/bellyfoodng/" target="_blank">
          <img
            alt={"Social media icon"}
            src={twitterIcon}
            className="border rounded-full border-black p-2 w-12 cursor-pointer 
          hover:bg-green-400 transform duration-300 ease-in"
          />
        </a>
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
