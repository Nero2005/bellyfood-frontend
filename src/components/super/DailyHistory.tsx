import React, { useEffect, useState } from "react";
import { getSuperDailyHistory } from "../../services";
import { History, HistoryDetails } from "../../utils";

interface Props {
  day: string;
  historyDetails: HistoryDetails
}

function DailyHistory({ day, historyDetails }: Props) {
  //const [historyDetails, setHistoryDetails] = useState<HistoryDetails>(null!);

  /*useEffect(() => {
    (async () => {
      const h = await getSuperDailyHistory(day.split("T")[0]);
      console.log(h);
      setHistoryDetails(h);
    })();
  }, []);*/

  return (
    <div className="flex flex-col flex-1 items-center space-y-2">
      <h1 className="text-2xl font-bold">Daily History</h1>
      <p className="flex space-x-6">
        <span>Total revenue on {new Date(day).toDateString()}:</span>
        <span> ₦{historyDetails?.totalAmount}</span>
      </p>
      <p className="flex space-x-6">
        <span>Total customers added on {new Date(day).toDateString()}:</span>
        <span> {historyDetails?.numNewCustomer}</span>
      </p>
      <p className="flex space-x-6">
        <span>Total deliveries made on {new Date(day).toDateString()}:</span>
        <span> {historyDetails?.numNewDelivery}</span>
      </p>
    </div>
  );
}

export default DailyHistory;
