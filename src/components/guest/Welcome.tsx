import React from "react";

interface Props {
  welcome: string;
}

function Welcome({ welcome }: Props) {
  return (
    <div className="flex flex-col md:max-w-xl overflow-hidden mt-20 mx-4 items-center space-y-4 my-32">
      <h1 className="text-5xl lg:text-6xl text-green-400 font-thin text-center">
        Welcome to Bellyfood
      </h1>
      <p className="leading-6 w-80 md:w-full">{welcome}</p>
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
