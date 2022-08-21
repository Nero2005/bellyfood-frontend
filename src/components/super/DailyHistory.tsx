import React, { useEffect, useState } from "react";
import {
  getAdminByCode,
  getCustomer,
  getSuperDailyHistory,
} from "../../services";
import { HistoryItem, HistoryDetails } from "../../utils";
import PaymentHistories from "./PaymentHistories";
import CustomerHistories from "./CustomerHistories";

interface Props {
  day: string;
  historyDetails: HistoryDetails;
}

function DailyHistory({ day, historyDetails }: Props) {
  const [openPayments, setOpenPayments] = useState(false);
  const [openCustomers, setOpenCustomers] = useState(false);

  useEffect(() => {}, []);

  return (
    <div className="flex flex-col flex-1 items-center space-y-2">
      <h1 className="text-2xl font-bold">Daily History</h1>
      <div
        className="flex flex-col md:flex-row items-center space-x-6 cursor-pointer"
        onClick={() => setOpenPayments((prev) => !prev)}
      >
        <span>Total revenue on {new Date(day).toDateString()}</span>
        <span>₦{historyDetails?.totalAmount}</span>
      </div>
      {historyDetails?.totalAmount > 0 && (
        <PaymentHistories
          openPayments={openPayments}
          histories={historyDetails.histories.filter(
            (historyItem) => historyItem.type === "payment"
          )}
        />
      )}
      <div
        className="flex flex-col md:flex-row space-x-6 items-center cursor-pointer mx-2"
        onClick={() => setOpenCustomers((prev) => !prev)}
      >
        <span>Total customers added on {new Date(day).toDateString()}</span>
        <span>{historyDetails?.numNewCustomer}</span>
      </div>
      {historyDetails?.numNewCustomer > 0 && (
        <CustomerHistories
          openCustomers={openCustomers}
          histories={historyDetails.histories.filter(
            (historyItem) => historyItem.type === "creation"
          )}
        />
      )}
      <div className="flex flex-col md:flex-row items-center space-x-6 mx-2">
        <span>Total deliveries made on {new Date(day).toDateString()}</span>
        <span>{historyDetails?.numNewDelivery}</span>
      </div>
    </div>
  );
}

export default DailyHistory;
