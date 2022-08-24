import React, { useEffect, useRef } from "react";
import { getAdminByCode, getCustomer } from "../../services";
import { useAppSelector } from "../../store/hooks";
import { HistoryItem } from "../../utils";

interface Props {
  historyItem: HistoryItem;
}

function DeliveryHistory({ historyItem }: Props) {
  const user = useAppSelector((state) => state.users.user);
  const customerNameRef = useRef<any>(null!);

  useEffect(() => {
    (async () => {
      let agentDetails;
      if (user?.roles.includes("SUPERADMIN")) {
        agentDetails = await getAdminByCode(historyItem.agentCode);
      } else {
        agentDetails = user;
      }
      const customerDetails = await getCustomer(historyItem.customerId);
      historyItem.agentName = agentDetails.name;
      historyItem.customerName = customerDetails.name;
      if (customerNameRef) {
        customerNameRef.current.innerHTML = customerDetails.name;
      }
    })();
  }, [historyItem]);

  return (
    <tr className="border border-gray-500">
      <td className="border border-gray-500">{historyItem.location}</td>
      <td className="border border-gray-500" ref={customerNameRef}>
        {historyItem.customerName}
      </td>
      <td className="border border-gray-500">
        {new Date(historyItem.date).toDateString()}
      </td>
    </tr>
  );
}

export default DeliveryHistory;
