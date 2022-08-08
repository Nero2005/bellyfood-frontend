import React, { SetStateAction } from "react";
import { Basket } from "../../pages/Home";

interface Props {
  setShowModal: (value: SetStateAction<Basket>) => void;
}
function Baskets({ setShowModal }: Props) {
  return (
    <div className="flex flex-col items-center my-48">
      <h1 className="text-5xl text-purple-600 font-thin mb-5">BASKETS</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4 place-items-center">
        <div className="flex flex-col items-center bg-white rounded-sm shadow-md shadow-gray-500 px-7 py-2">
          <h2 className="text-2xl font-bold mb-8">NANO</h2>
          <h1 className="text-5xl font-bold text-amber-700">₦10,500</h1>
          <p className="mb-10">per month</p>
          <button
            className="bg-gray-50 text-green-400 rounded-md py-1 px-3 mb-8"
            onClick={() => setShowModal({ open: true, name: "NANO" })}
          >
            View Basket Contents
          </button>
          <button className="bg-gray-50 text-green-400 rounded-xl py-1 px-8 mb-4">
            Subscribe
          </button>
        </div>
        <div className="flex flex-col items-center bg-white rounded-sm shadow-md shadow-gray-500 px-7 py-2">
          <h2 className="text-2xl font-bold mb-8">MICRO</h2>
          <h1 className="text-5xl font-bold text-gray-300">₦18,000</h1>
          <p className="mb-10">per month</p>
          <button
            className="bg-gray-50 text-green-400 rounded-md py-1 px-3 mb-8"
            onClick={() => setShowModal({ open: true, name: "MICRO" })}
          >
            View Basket Contents
          </button>
          <button className="bg-gray-50 text-green-400 rounded-xl py-1 px-8 mb-4">
            Subscribe
          </button>
        </div>
        <div className="flex flex-col items-center bg-white rounded-sm shadow-md shadow-gray-500 px-7 py-2">
          <h2 className="text-2xl font-bold mb-8">MEGA</h2>
          <h1 className="text-5xl font-bold text-yellow-400">₦30,000</h1>
          <p className="mb-10">per month</p>
          <button
            className="bg-gray-50 text-green-400 rounded-md py-1 px-3 mb-8"
            onClick={() => setShowModal({ open: true, name: "MEGA" })}
          >
            View Basket Contents
          </button>
          <button className="bg-gray-50 text-green-400 rounded-xl py-1 px-8 mb-4">
            Subscribe
          </button>
        </div>
        <div className="flex flex-col items-center bg-white rounded-sm shadow-md shadow-gray-500 px-7 py-2">
          <h2 className="text-2xl font-bold mb-8">GIGA</h2>
          <h1 className="text-5xl font-bold text-blue-300">₦40,000</h1>
          <p className="mb-10">per month</p>
          <button
            className="bg-gray-50 text-green-400 rounded-md py-1 px-3 mb-8"
            onClick={() => setShowModal({ open: true, name: "GIGA" })}
          >
            View Basket Contents
          </button>
          <button className="bg-gray-50 text-green-400 rounded-xl py-1 px-8 mb-4">
            Subscribe
          </button>
        </div>
        <div className="flex flex-col items-center bg-white rounded-sm shadow-md shadow-gray-500 px-7 py-2">
          <h2 className="text-2xl font-bold mb-8">OGA NA BOSS</h2>
          <h1 className="text-5xl font-bold text-green-500">₦50,000</h1>
          <p className="mb-10">per month</p>
          <button
            className="bg-gray-50 text-green-400 rounded-md py-1 px-3 mb-8"
            onClick={() => setShowModal({ open: true, name: "OGA NA BOSS" })}
          >
            View Basket Contents
          </button>
          <button className="bg-gray-50 text-green-400 rounded-xl py-1 px-8 mb-4">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}

export default Baskets;
