import React, { useEffect, useState } from "react";
import { getAdminByCode, getSuperDailyHistory } from "../../services";
import { Agent, HistoryDetails } from "../../utils";
import DailyHistory from "./DailyHistory";

function Histories() {
  const [day, setDay] = useState(new Date().toISOString().split("T")[0]);
  const [historyDetails, setHistoryDetails] = useState<HistoryDetails>(null!);
  const [agentWorks, setAgentWorks] = useState<any[]>(null!);

  useEffect(() => {
    console.log(day);
    (async () => {
      const h = await getSuperDailyHistory(day.split("T")[0]);
      h?.agentWork?.forEach(
        async (agent: any, index: number, agentArr: any[]) => {
          const agentDetails = await getAdminByCode(agent.agentCode);
          agentArr[index] = { ...agent, name: agentDetails.name };
        }
      );
      console.log(h);
      console.log(h?.agentWork);

      setAgentWorks(h?.agentWork);
      setHistoryDetails(h);
    })();
  }, [day]);

  // const showModal = () => {}

  return (
    <div className="flex flex-col items-center space-y-2">
      <div>
        <input
          type="date"
          className="px-2 py-1"
          defaultValue={day}
          max={new Date().toISOString().split("T")[0]}
          onChange={(e) => setDay(e.target.value)}
        />
      </div>
      <DailyHistory
        day={day}
        historyDetails={historyDetails}
        agentWorks={agentWorks}
      />
    </div>
  );
}

export default Histories;
