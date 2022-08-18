import React, { useEffect, useState } from "react";
import { getAdminByCode } from "../../services";
import AgentHistory from "./AgentHistory";

function PaymentAgentHistories({ histories }: any) {
  const [agentDetails, setAgentDetails] = useState<any>();
  const [paymentHistories, setPaymentHistories] = useState<any>();

  useEffect(() => {
    (async () => {
      console.log(histories);
      console.log(paymentHistories);

      if (!histories[0]?.agentCode) return;
      const agent = await getAdminByCode(histories[0]?.agentCode);
      console.log(agent);

      setAgentDetails(agent);
      setPaymentHistories(
        histories?.filter(
          (historyDetails: any) => historyDetails.type === "payment"
        )
      );
    })();
  }, [histories]);

  return histories?.map((historyDetails: any) => (
    <AgentHistory historyDetails={historyDetails} />
  ));
}

export default PaymentAgentHistories;
