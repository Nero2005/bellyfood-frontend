import React, { SetStateAction, useEffect } from "react";
import { getAdminByCode, getCustomer } from "../../services";
import { HistoryDetails, HistoryItem } from "../../utils";
import PaymentHistory from "./PaymentHistory";

interface Props {
  openPayments: boolean;
  histories: HistoryItem[];
  setSave?: (value: SetStateAction<boolean>) => void;
}

function PaymentHistories({ openPayments, histories, setSave }: Props) {
  return (
    <div
      className={`${
        openPayments ? "flex" : "hidden"
      } overflow-scroll max-w-sm sm:max-w-2xl scrollbar-hide mx-2 border`}
    >
      <table className="mx-auto text-center overflow-scroll border border-gray-500">
        <thead>
          <tr className="border border-gray-500">
            <th className="border border-gray-500">S/N</th>
            <th className="border border-gray-500">Admin Name</th>
            <th className="border border-gray-500">Agent Name</th>
            <th className="border border-gray-500">Location</th>
            <th className="border border-gray-500">Customer Name</th>
            <th className="border border-gray-500">Amount paid</th>
          </tr>
        </thead>
        <tbody>
          {histories.map((historyItem, index) => (
            <PaymentHistory
              historyItem={historyItem}
              key={index + 1}
              index={index + 1}
              setSave={setSave}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PaymentHistories;
