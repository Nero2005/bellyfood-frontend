import React, { SetStateAction, useEffect, useState } from "react";
import { getAdminByCode, getSuperDailyHistory } from "../../services";
import { Agent, HistoryDetails } from "../../utils";
import DailyHistory from "./DailyHistory";

function Histories() {
  const [day, setDay] = useState(new Date().toISOString().split("T")[0]);
  const [save, setSave] = useState(false);
  const [bellysaveH, setBellysaveH] = useState<any>(null!);
  const [historyDetails, setHistoryDetails] = useState<HistoryDetails>(null!);

  useEffect(() => {
    (async () => {
      const h = await getSuperDailyHistory(day.split("T")[0], "bellyfood");
      const b = await getSuperDailyHistory(day.split("T")[0], "bellysave");
      console.log(h);

      setHistoryDetails(h);
      setBellysaveH(b);
    })();
  }, [day, save]);

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
        setSave={setSave}
        day={day}
        historyDetails={historyDetails}
        bellysaveH={bellysaveH}
      />
    </div>
  );
}

export default Histories;
