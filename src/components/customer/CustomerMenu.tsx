import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setPage } from "../../store/userReducer";

function CustomerMenu() {
  const page = useAppSelector((state) => state.users.page);
  const dispatch = useAppDispatch();

  return (
    <div className="bg-white mx-2 sticky top-20 z-40 shadow shadow-gray-500 flex overflow-x-scroll scrollbar-hide">
      <button
        className={`sticky ${
          page === "DASHBOARD" && "shadow-md text-white bg-green-400"
        } px-6 py-2 hover:bg-green-400 hover:text-white border-r border-black transform ease-in duration-300`}
        onClick={() => dispatch(setPage("DASHBOARD"))}
      >
        Dashboard
      </button>
      <button
        className={`sticky ${
          page === "CUSTOMER_HISTORY" && "shadow-md text-white bg-green-400"
        } px-6 py-2 hover:bg-green-400 hover:text-white border-r border-black transform ease-in duration-300`}
        onClick={() => dispatch(setPage("CUSTOMER_HISTORY"))}
      >
        History
      </button>
      <button
        className={`sticky ${
          page === "CUSTOMER_PROFILE" && "shadow-md text-white bg-green-400"
        } px-6 py-2 hover:bg-green-400 hover:text-white transform ease-in duration-300`}
        onClick={() => dispatch(setPage("CUSTOMER_PROFILE"))}
      >
        Profile
      </button>
    </div>
  );
}

export default CustomerMenu;
