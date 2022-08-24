import React from "react";
import { HistoryItem } from "../../utils";
import DeliveryHistory from "./DeliveryHistory";

interface Props {
  openDeliveries: boolean;
  histories: HistoryItem[];
}

function DeliveryHistories({ openDeliveries, histories }: Props) {
  return (
    <div
      className={`${
        openDeliveries ? "flex" : "hidden"
      } overflow-scroll max-w-sm sm:max-w-2xl scrollbar-hide mx-2 border`}
    >
      <table className="border border-gray-500 mx-auto text-center overflow-scroll">
        <thead>
          <tr className="border border-gray-500">
            <th className="border border-gray-500">Location</th>
            <th className="border border-gray-500">Customer Name</th>
            <th className="border border-gray-500">Date</th>
          </tr>
        </thead>
        <tbody>
          {histories.map((historyItem, index) => (
            <DeliveryHistory historyItem={historyItem} key={index + 1} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DeliveryHistories;
