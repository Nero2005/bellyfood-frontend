import { faGift, faHandHoldingDollar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import WelcomeImg from "../../assets/images/welcome.jpeg";
import DonateImg from "../assets/images/donate.jpeg";

interface Props {
  vision: string;
  mission: string;
  about: string;
}

function Welcome({ vision, mission, about }: Props) {
  return (
    <div className="bg-white px-8 flex flex-col md:px-10 overflow-hidden mt-16 rounded-md py-5 items-center space-y-10 my-32">
      <div className="max-w-xl">
        <img src={WelcomeImg} className="w-full" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="pr-3 pb-2">
          <h1 className="font-bold text-2xl">Our Vision</h1>
          <p className="leading-6 w-80 md:w-full">{vision}</p>
        </div>
        <div className="pr-3 py-2">
          <h1 className="font-bold text-2xl">Our Mission</h1>
          <p className="leading-6 w-80 md:w-full">{mission}</p>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
