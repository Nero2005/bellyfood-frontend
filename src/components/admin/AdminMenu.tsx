import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setPage } from "../../store/userReducer";

function AdminMenu() {
  const page = useAppSelector((state) => state.users.page);
  const dispatch = useAppDispatch();

  return (
    <div className="bg-white sticky top-20 md:h-screen z-40 md:shadow md:shadow-gray-500 flex flex-col space-y-2">
      {/* sticky top-36 */}
      {/* sticky top-20 */}
      {/* sticky top-36 */}
      <button
        className={`sticky ${
          page === "DASHBOARD" && "shadow-md text-white bg-green-400"
        } px-6 py-1 md:py-3 hover:bg-green-400 hover:text-white transform ease-in duration-300`}
        onClick={() => dispatch(setPage("DASHBOARD"))}
        style={{ top: "5rem" }}
      >
        Dashboard
      </button>
      <button
        className={`sticky ${
          page === "PENDING_PAYMENTS" && "shadow-md text-white bg-green-400"
        } px-6 py-1 md:py-3 hover:bg-green-400 hover:text-white transform ease-in duration-300`}
        onClick={() => dispatch(setPage("PENDING_PAYMENTS"))}
        style={{ top: "6rem" }}
      >
        Pending Payments
      </button>
      <button
        className={`sticky ${
          page === "PENDING_APPROVAL" && "shadow-md text-white bg-green-400"
        } px-6 py-1 md:py-3 hover:bg-green-400 hover:text-white transform ease-in duration-300`}
        onClick={() => dispatch(setPage("PENDING_APPROVAL"))}
        style={{ top: "7rem" }}
      >
        Pending Approval
      </button>
    </div>
  );
}

export default AdminMenu;
