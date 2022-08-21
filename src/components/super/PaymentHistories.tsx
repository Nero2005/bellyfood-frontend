import React, { useEffect } from "react";
import { getAdminByCode, getCustomer } from "../../services";
import { HistoryDetails, HistoryItem } from "../../utils";
import PaymentHistory from "./PaymentHistory";

interface Props {
  openPayments: boolean;
  histories: HistoryItem[];
}

function PaymentHistories({ openPayments, histories }: Props) {
  // useEffect(() => {
  //   histories.forEach(async (historyD, index, historiesA) => {
  //     const agentDetails = await getAdminByCode(historyD?.agentCode);
  //     const customerDetails = await getCustomer(historyD?.customerId);
  //     console.log(agentDetails);
  //     console.log(customerDetails);

  //     historiesA[index] = {
  //       ...historiesA[index],
  //       agentName: agentDetails.name,
  //       customerName: customerDetails.name,
  //     };
  //   });
  // }, [histories, openPayments]);

  return (
    <div
      className={`${
        openPayments ? "flex" : "hidden"
      } overflow-scroll max-w-sm sm:max-w-2xl scrollbar-hide mx-2 border`}
    >
      <table className="mx-auto text-center overflow-scroll">
        <thead>
          <tr>
            <th>Agent Name</th>
            <th>Location</th>
            <th>Customer Name</th>
            <th>Amount paid</th>
          </tr>
        </thead>
        <tbody>
          {histories.map((historyItem, index) => (
            <PaymentHistory historyItem={historyItem} key={index + 1} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PaymentHistories;
