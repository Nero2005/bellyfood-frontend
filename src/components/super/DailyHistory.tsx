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

  useEffect(() => {
    // historyDetails?.histories.forEach(async (historyD, index, historiesA) => {
    //   const agentDetails = await getAdminByCode(historyD?.agentCode);
    //   const customerDetails = await getCustomer(historyD?.customerId);
    //   console.log(agentDetails);
    //   console.log(customerDetails);
    //   historiesA[index] = {
    //     ...historiesA[index],
    //     agentName: agentDetails.name,
    //     customerName: customerDetails.name,
    //   };
    // });
  }, []);

  return (
    <div className="flex flex-col flex-1 items-center space-y-2">
      <h1 className="text-2xl font-bold">Daily History</h1>
      <div
        className="flex space-x-6 cursor-pointer"
        onClick={() => setOpenPayments((prev) => !prev)}
      >
        <span>Total revenue on {new Date(day).toDateString()}:</span>
        <span> ₦{historyDetails?.totalAmount}</span>
      </div>
      {/* {historyDetails?.totalAmount !== 0 && (
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
              {agentWorks?.map((agentWork: any, index: any) => (
                <PaymentAgentHistories
                  key={index}
                  histories={agentWork.histories?.filter(
                    (historyDetails: any) => historyDetails.type === "payment"
                  )}
                />
              ))}
            </tbody>
          </table>
        </div>
      )} */}
      {historyDetails?.totalAmount > 0 && (
        <PaymentHistories
          openPayments={openPayments}
          histories={historyDetails.histories.filter(
            (historyItem) => historyItem.type === "payment"
          )}
        />
      )}
      <div
        className="flex space-x-6 cursor-pointer"
        onClick={() => setOpenCustomers((prev) => !prev)}
      >
        <span>Total customers added on {new Date(day).toDateString()}:</span>
        <span> {historyDetails?.numNewCustomer}</span>
      </div>
      {historyDetails?.numNewCustomer > 0 && (
        <CustomerHistories
          openCustomers={openCustomers}
          histories={historyDetails.histories.filter(
            (historyItem) => historyItem.type === "creation"
          )}
        />
      )}
      <div className="flex space-x-6">
        <span>Total deliveries made on {new Date(day).toDateString()}:</span>
        <span> {historyDetails?.numNewDelivery}</span>
      </div>
    </div>
  );
}

export default DailyHistory;
