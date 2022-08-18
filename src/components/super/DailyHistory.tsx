import React, { useEffect, useState } from "react";
import { getAdminByCode, getSuperDailyHistory } from "../../services";
import { History, HistoryDetails } from "../../utils";
import PaymentAgentHistories from "./PaymentAgentHistories";
import AgentHistory from "./AgentHistory";

interface Props {
  day: string;
  historyDetails: HistoryDetails;
  agentWorks: any[];
}

function DailyHistory({ day, historyDetails, agentWorks }: Props) {
  // const [agentWorks, setAgentWorks] = useState<any>();
  const [openPayments, setOpenPayments] = useState(false);

  useEffect(() => {
    console.log(agentWorks);
  }, [agentWorks]);

  // useEffect(() => {
  //   console.log(agentWorks);

  //   (async () => {
  //     setAgentWorks(
  //       await historyDetails?.agentWork?.map(async (agent) => {
  //         const agentDetails = await getAdminByCode(agent.agentCode);
  //         return { ...agent, name: agentDetails.name };
  //       })
  //     );
  //   })();
  // }, [agentWorks]);

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
      {historyDetails?.totalAmount !== 0 && (
        <div
          className={`${
            openPayments ? "flex" : "hidden"
          } overflow-scroll max-w-sm scrollbar-hide mx-2 border`}
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
      )}
      <div className="flex space-x-6">
        <span>Total customers added on {new Date(day).toDateString()}:</span>
        <span> {historyDetails?.numNewCustomer}</span>
      </div>
      <div className="flex space-x-6">
        <span>Total deliveries made on {new Date(day).toDateString()}:</span>
        <span> {historyDetails?.numNewDelivery}</span>
      </div>
    </div>
  );
}

export default DailyHistory;
