import React from "react";
import WelcomeImg from "../../assets/images/welcome.jpeg";
import DonateImg from "../assets/images/donate.jpeg";

interface Props {
  vision: string;
  mission: string;
  about: string;
}

function Welcome({ vision, mission, about }: Props) {
  return (
    <div className="bg-white px-10 flex flex-col md:px-10 overflow-hidden mt-16 rounded-md py-5 items-center space-y-10 my-32">
      <div className="max-w-xl">
        <img src={WelcomeImg} className="w-full" />
      </div>
      <h1 className="text-5xl lg:text-6xl text-green-400 font-thin text-center">
        Welcome to Bellyfood
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="px-3 py-2">
          <h1 className="font-bold text-2xl">Our Vision</h1>
          <p className="leading-6 w-80 md:w-full">{vision}</p>
        </div>
        <div className="px-3 py-2">
          <h1 className="font-bold text-2xl">Our Mission</h1>
          <p className="leading-6 w-80 md:w-full">{mission}</p>
        </div>
      </div>
      <div className="lg:flex-row lg:space-x-4 flex flex-col space-y-3">
        <button className="rounded-2xl bg-green-500 py-2 px-4 text-white">
          BUY A BASKET
        </button>
        <button className="rounded-2xl bg-green-500 py-2 px-4 text-white">
          GIFT A BASKET
        </button>
        <button className="rounded-2xl bg-green-500 py-2 px-4 text-white">
          DONATE A BASKET
        </button>
      </div>
    </div>
  );
}

export default Welcome;
