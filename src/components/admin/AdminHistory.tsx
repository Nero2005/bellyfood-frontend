import React, { SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getAdminDailyHistory } from "../../services";
import { useAppSelector } from "../../store/hooks";
import { LinkRoutes } from "../../utils";
import CustomerHistories from "../super/CustomerHistories";
import PaymentHistories from "../super/PaymentHistories";

function AdminHistory() {
  const user = useAppSelector((state) => state.users.user);
  const [openPayments, setOpenPayments] = useState(false);
  const [openCustomers, setOpenCustomers] = useState(false);
  const [historyDetails, setHistoryDetails] = useState<any>(null!);
  const [bellysaveH, setBellysaveH] = useState<any>(null!);
  const day = new Date().toISOString().split("T")[0];
  const navigate = useNavigate();

  useEffect(() => {
    const n = toast.loading("Getting history");
    (async () => {
      try {
        const h = await getAdminDailyHistory(
          day,
          user?.agentCode || 12345,
          "bellyfood"
        );
        const b = await getAdminDailyHistory(
          day,
          user?.agentCode || 12345,
          "bellysave"
        );
        setHistoryDetails(h);
        setBellysaveH(b);
        toast.success("Got history", { id: n });
      } catch (err: any) {
        console.log(err);
        if (err === "Unauthorized") {
          navigate(LinkRoutes.LOGIN);
          window.location.reload();
        }
        toast.error("An error occurred", { id: n });
      }
    })();
  }, []);

  return (
    <div className="flex flex-col flex-1 items-center space-y-2">
      <h1 className="text-2xl font-bold">Daily History</h1>
      <div
        className="text-blue-500 flex flex-col items-center space-y-4 cursor-pointer"
        onClick={() => setOpenPayments((prev) => !prev)}
      >
        <span>
          Total revenue for bellyfood on {new Date(day).toDateString()}
        </span>
        <span>₦{historyDetails?.totalAmount || 0}</span>
      </div>
      {historyDetails?.totalAmount > 0 && (
        <PaymentHistories
          openPayments={openPayments}
          histories={historyDetails.histories.filter(
            (historyItem: any) => historyItem.type === "payment"
          )}
        />
      )}
      <div
        className="text-red-500 flex flex-col items-center space-y-4 cursor-pointer"
        onClick={() => setOpenPayments((prev) => !prev)}
      >
        <span>
          Total revenue for bellysave on {new Date(day).toDateString()}
        </span>
        <span>₦{bellysaveH?.totalAmount || 0}</span>
      </div>
      {bellysaveH?.totalAmount > 0 && (
        <PaymentHistories
          openPayments={openPayments}
          histories={bellysaveH.histories.filter(
            (historyItem: any) => historyItem.type === "payment"
          )}
        />
      )}
      <div
        className="text-blue-500 flex flex-col md:flex-row space-x-6 items-center cursor-pointer mx-2"
        onClick={() => setOpenCustomers((prev) => !prev)}
      >
        <span>
          Total bellyfood customers added on {new Date(day).toDateString()}
        </span>
        <span>{historyDetails?.numNewCustomer || 0}</span>
      </div>
      {historyDetails?.numNewCustomer > 0 && (
        <CustomerHistories
          openCustomers={openCustomers}
          histories={historyDetails.histories.filter(
            (historyItem: any) => historyItem.type === "creation"
          )}
        />
      )}
      <div
        className="text-red-500 flex flex-col md:flex-row space-x-6 items-center cursor-pointer mx-2"
        onClick={() => setOpenCustomers((prev) => !prev)}
      >
        <span>
          Total bellysave customers added on {new Date(day).toDateString()}
        </span>
        <span>{bellysaveH?.numNewCustomer || 0}</span>
      </div>
      {bellysaveH?.numNewCustomer > 0 && (
        <CustomerHistories
          openCustomers={openCustomers}
          histories={bellysaveH.histories.filter(
            (historyItem: any) => historyItem.type === "creation"
          )}
        />
      )}
    </div>
  );
}

export default AdminHistory;
