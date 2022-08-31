import {
  ArrowLeftIcon,
  ArrowRightIcon,
  RefreshIcon,
} from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getAgents, getReports } from "../../services";
import { AddReport, LinkRoutes, Report } from "../../utils";

function Reports() {
  const [reports, setReports] = useState<Report[]>([]);
  const [agent, setAgent] = useState<any>("");
  const [agents, setAgents] = useState<any[]>([]);
  const [count, setCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);

  const navigate = useNavigate();

  const loadReports = async (page: number, agentName: string) => {
    const n = toast.loading("Getting reports");
    try {
      //
      if (agentName === "Select Agent") {
        agentName = "";
      }
      const data = await getReports({ page, agentName });
      console.log(data);

      setReports(data.reports);
      setCount(data.count);
      setAgents(await getAgents());
      toast.success("Reports found", { id: n });
    } catch (err) {
      console.log(err);
      if (err === "Unauthorized") {
        navigate(LinkRoutes.LOGIN);
        window.location.reload();
      }
      toast.error("An error occurred", { id: n });
    }
  };

  const decPage = async () => {
    if (pageNumber == 0) return;
    setPageNumber((prev) => prev - 1);
    await loadReports(pageNumber - 1, agent);
  };
  const incPage = async () => {
    if (pageNumber === Math.ceil(count / 10) - 1 || count === 0) return;
    setPageNumber((prev) => prev + 1);

    await loadReports(pageNumber + 1, agent);
  };

  useEffect(() => {
    (async () => {
      await loadReports(pageNumber, agent === "Select Agent" ? "" : agent);
    })();
  }, [agent]);

  return (
    <div className="flex-1 md:mt-1 px-2">
      <h1 className="text-2xl font-semibold text-center my-2">Agent Reports</h1>
      <RefreshIcon
        className="w-6 h-6 fixed top-44 z-50 right-10 cursor-pointer"
        onClick={async () => await loadReports(pageNumber, agent)}
      />
      <div className="flex space-x-3 items-center sticky mb-3">
        <select
          className="flex-1 py-2 px-2 rounded-md"
          onChange={(e) => setAgent(e.target.value)}
        >
          <option value={"Select Agent"}>Select Agent</option>
          {agents?.map((agent) => (
            <option key={agent._id} value={agent.name}>
              {agent.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col">
        {reports?.map((report) => (
          <div
            key={report._id}
            className="flex flex-col space-y-2 items-center"
          >
            <h2 className="text-xl">{report.customerId.name}</h2>
            <span>{report.details}</span>
          </div>
        ))}
      </div>
      <div className="h-10"></div>
      <div className="fixed bottom-4 items-center flex w-full justify-evenly z-50">
        <ArrowLeftIcon
          className={`w-6 cursor-pointer ${
            pageNumber === 0 && "text-gray-300"
          }`}
          onClick={() => decPage()}
        />
        <span>Page: {pageNumber + 1}</span>
        <ArrowRightIcon
          className={`w-6 cursor-pointer ${
            (pageNumber === Math.ceil(count / 10) - 1 || count === 0) &&
            "text-gray-300"
          }`}
          onClick={() => incPage()}
        />
      </div>
    </div>
  );
}

export default Reports;
