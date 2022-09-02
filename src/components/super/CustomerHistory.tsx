import React, { useEffect, useRef } from "react";
import { getAdminByCode, getCustomer } from "../../services";
import { useAppSelector } from "../../store/hooks";
import { HistoryItem } from "../../utils";

interface Props {
  historyItem: HistoryItem;
  index: number;
}

function CustomerHistory({ historyItem, index }: Props) {
  const user = useAppSelector((state) => state.users.user);
  const adminNameRef = useRef<any>(null!);
  const agentNameRef = useRef<any>(null!);
  const customerNameRef = useRef<any>(null!);

  useEffect(() => {
    (async () => {
      let agentDetails;
      if (user?.roles.includes("SUPERADMIN")) {
        agentDetails = await getAdminByCode(historyItem.agentCode);
      } else {
        agentDetails = user;
      }
      const customerDetails = await getCustomer(
        historyItem.customerId || historyItem.bellysave
      );
      historyItem.agentName = agentDetails.name;
      historyItem.customerName = customerDetails.name;
      if (agentNameRef && customerNameRef && adminNameRef) {
        adminNameRef.current.innerHTML = agentDetails.name;
        agentNameRef.current.innerHTML = customerDetails.agentName;
        customerNameRef.current.innerHTML = customerDetails.name;
      }
    })();
  }, [historyItem]);

  return (
    <tr className="border border-gray-500 text-sm">
      <td className="border border-gray-500 mx-1 px-1">{index}</td>
      <td className="border border-gray-500" ref={adminNameRef}>
        {historyItem.agentName}
      </td>
      <td className="border border-gray-500" ref={agentNameRef}></td>
      <td className="border border-gray-500">{historyItem.location}</td>
      <td className="border border-gray-500" ref={customerNameRef}>
        {historyItem.customerName}
      </td>
    </tr>
  );
}

export default CustomerHistory;
