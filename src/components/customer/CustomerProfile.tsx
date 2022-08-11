import {
  faAddressCard,
  faBoxesPacking,
  faBoxOpen,
  faBuildingColumns,
  faLocationDot,
  faLocationPin,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserIcon } from "@heroicons/react/solid";
import React from "react";

function CustomerProfile() {
  return (
    <div className="mt-5 max-w-5xl mx-auto px-4">
      <div className="mb-10">
        <h3 className="text-gray-700">PROFILE</h3>
        <div className="flex flex-col w-full mt-4 px-2 space-y-3">
          <div className="flex space-x-3 items-center">
            <FontAwesomeIcon icon={faUser} className="w-6 h-6 text-gray-600" />
            <p className="flex-1 border-b border-gray-600 py-5">Personal</p>
          </div>
          <div className="flex space-x-3 items-center">
            <FontAwesomeIcon
              icon={faLocationDot}
              className="w-6 h-6 text-gray-600"
            />
            <p className="flex-1 border-b border-gray-600 py-5">Location</p>
          </div>
          <div className="flex space-x-3 items-center">
            <FontAwesomeIcon
              icon={faLocationPin}
              className="w-6 h-6 text-gray-600"
            />
            <p className="flex-1 border-b border-gray-600 py-5">State</p>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-gray-700">PACKAGE</h3>
        <div className="flex flex-col w-full mt-4 px-2 space-y-3">
          <div className="flex space-x-3 items-center">
            <FontAwesomeIcon
              icon={faBoxesPacking}
              className="w-6 h-6 text-gray-600"
            />
            <p className="flex-1 border-b border-gray-600 py-5">
              Change Package
            </p>
          </div>
          <div className="flex space-x-3 items-center">
            <FontAwesomeIcon
              icon={faBoxOpen}
              className="w-6 h-6 text-gray-600"
            />
            <p className="flex-1 border-b border-gray-600 py-5">Add Package</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerProfile;
