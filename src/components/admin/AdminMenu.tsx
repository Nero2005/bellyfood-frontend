import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setPage } from "../../store/userReducer";

function AdminMenu() {
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
          page === "CREATE_CUSTOMER" && "shadow-md text-white bg-green-400"
        } px-6 py-2 hover:bg-green-400 hover:text-white border-r border-black transform ease-in duration-300`}
        onClick={() => dispatch(setPage("CREATE_CUSTOMER"))}
      >
        Create Customer
      </button>
      <button
        className={`sticky ${
          page === "PENDING_PAYMENTS" && "shadow-md text-white bg-green-400"
        } px-6 py-2 hover:bg-green-400 hover:text-white border-r border-black transform ease-in duration-300`}
        onClick={() => dispatch(setPage("PENDING_PAYMENTS"))}
      >
        Pending Payments
      </button>
      <button
        className={`sticky ${
          page === "BELLYSAVE_ADMIN" && "shadow-md text-white bg-green-400"
        } px-6 py-2 hover:bg-green-400 hover:text-white border-r border-black transform ease-in duration-300`}
        onClick={() => dispatch(setPage("BELLYSAVE_ADMIN"))}
      >
        Bellysave Customers
      </button>
      <button
        className={`sticky ${
          page === "COMPLETED_DELIVERIES" && "shadow-md text-white bg-green-400"
        } px-6 py-2 hover:bg-green-400 hover:text-white border-r border-black transform ease-in duration-300`}
        onClick={() => dispatch(setPage("COMPLETED_DELIVERIES"))}
      >
        Completed Deliveries
      </button>
      <button
        className={`sticky ${
          page === "PENDING_APPROVAL" && "shadow-md text-white bg-green-400"
        } px-6 py-2 hover:bg-green-400 hover:text-white border-r border-black transform ease-in duration-300`}
        onClick={() => dispatch(setPage("PENDING_APPROVAL"))}
      >
        Pending Approval
      </button>
      <button
        className={`sticky ${
          page === "ADMIN_HISTORY" && "shadow-md text-white bg-green-400"
        } px-6 py-2 hover:bg-green-400 hover:text-white transform ease-in duration-300`}
        onClick={() => dispatch(setPage("ADMIN_HISTORY"))}
      >
        History
      </button>
    </div>
  );
}

export default AdminMenu;
