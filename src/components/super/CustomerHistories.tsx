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
      <table className="mx-auto text-center overflow-scroll">
        <thead>
          <tr>
            <th>Agent Name</th>
            <th>Location</th>
            <th>Customer Name</th>
          </tr>
        </thead>
        <tbody>
          {histories.map((historyItem, index) => (
            <CustomerHistory historyItem={historyItem} key={index + 1} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerHistories;
