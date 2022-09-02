import React from "react";
import { HistoryItem } from "../../utils";
import CustomerHistory from "./CustomerHistory";

interface Props {
  openCustomers: boolean;
  histories: HistoryItem[];
}

function CustomerHistories({ openCustomers, histories }: Props) {
  return (
    <div
      className={`${
        openCustomers ? "flex" : "hidden"
      } overflow-scroll max-w-sm sm:max-w-2xl scrollbar-hide mx-2 border`}
    >
      <table className="mx-auto text-center overflow-scroll border border-gray-500">
        <thead>
          <tr className="border border-gray-500 text-sm">
            <th className="border border-gray-500">S/N</th>
            <th className="border border-gray-500">Admin Name</th>
            <th className="border border-gray-500">Agent Name</th>
            <th className="border border-gray-500">Location</th>
            <th className="border border-gray-500">Customer Name</th>
          </tr>
        </thead>
        <tbody>
          {histories.map((historyItem, index) => (
            <CustomerHistory
              historyItem={historyItem}
              key={index + 1}
              index={index + 1}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerHistories;
