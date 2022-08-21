import React, { useEffect, useRef } from "react";
import { getAdminByCode, getCustomer } from "../../services";
import { HistoryItem } from "../../utils";

interface Props {
  historyItem: HistoryItem;
}

function PaymentHistory({ historyItem }: Props) {
  const agentNameRef = useRef<HTMLTableDataCellElement>(null!);
  const customerNameRef = useRef<HTMLTableDataCellElement>(null!);

  useEffect(() => {
    (async () => {
      const agentDetails = await getAdminByCode(historyItem.agentCode);
      const customerDetails = await getCustomer(historyItem.customerId);
      historyItem.agentName = agentDetails.name;
      historyItem.customerName = customerDetails.name;
      if (agentNameRef && customerNameRef) {
        agentNameRef.current.innerHTML = agentDetails.name;
        customerNameRef.current.innerHTML = customerDetails.name;
      }
    })();
  }, [historyItem]);

  return (
    <tr>
      <td ref={agentNameRef}>{historyItem.agentName}</td>
      <td>{historyItem.location}</td>
      <td ref={customerNameRef}>{historyItem.customerName}</td>
      <td>{historyItem.amountPaid}</td>
    </tr>
  );
}

export default PaymentHistory;
