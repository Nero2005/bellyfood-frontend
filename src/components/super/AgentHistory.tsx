import React, { useEffect, useState } from "react";
import { getAdminByCode, getCustomer } from "../../services";

function AgentHistory({ historyDetails }: any) {
  const [agentDetails, setAgentDetails] = useState<any>();
  const [customerDetails, setCustomerDetails] = useState<any>();

  useEffect(() => {
    (async () => {
      if (!historyDetails?.agentCode) return;
      const agent = await getAdminByCode(historyDetails?.agentCode);
      const customer = await getCustomer(historyDetails.customerId);

      setAgentDetails(agent);
      setCustomerDetails(customer);
    })();
  }, [historyDetails]);

  return (
    <tr>
      <td>{agentDetails?.name}</td>
      <td>{historyDetails?.location}</td>
      <td>{customerDetails?.name}</td>
      <td>{historyDetails?.amountPaid}</td>
    </tr>
  );
}

export default AgentHistory;
