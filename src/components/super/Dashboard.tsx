import { CheckIcon, PencilIcon, TrashIcon } from "@heroicons/react/solid";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  deleteAgent,
  deleteLocation,
  editAgent,
  editLocation,
  getAgents,
  getCustomers,
  getLocations,
  postAgent,
  postLocation,
} from "../../services";
import { useAppSelector } from "../../store/hooks";
import { getWithQuery, post } from "../../utils";

function Dashboard() {
  const user = useAppSelector((state) => state.users.user);
  const countRef = useRef<HTMLSpanElement>(null!);
  const [location, setLocation] = useState("");
  const [locations, setLocations] = useState<string[]>(null!);
  const [agents, setAgents] = useState<any[]>([]);
  const [agent, setAgent] = useState("");
  const [editable, setEditable] = useState<any>("");
  const [editableAgent, setEditableAgent] = useState<any>("");
  const [editingLoc, setEditingLoc] = useState<any>("");
  const [editingAgent, setEditingAgent] = useState<any>("");

  const loadLocations = async () => {
    try {
      const data = await getCustomers({
        approved: true,
        paid: true,
        delivered: false,
      });
      const locations = await getLocations();
      setLocations(locations);
      if (countRef) {
        countRef.current.innerHTML = data.count;
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  const loadAgents = async () => {
    try {
      const agents = await getAgents();
      setAgents(agents);
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    countRef.current.innerHTML = `${0}`;

    (async () => {
      await loadLocations();
    })();
  }, [location, editingLoc]);

  useEffect(() => {
    (async () => {
      await loadAgents();
    })();
  }, [agent, editingAgent]);

  const addLocation = async () => {
    try {
      if (!location || location == "") {
        const n = toast.error("Location required");
        return;
      }
      const data = await postLocation(location);
      const n = toast.success(data.msg);
    } catch (err: any) {
      const n = toast.error(err.msg);
    } finally {
      setLocation("");
    }
  };

  const addAgent = async () => {
    try {
      if (!agent || agent == "") {
        const n = toast.error("Agent name required");
        return;
      }
      const data = await postAgent(agent);
      const n = toast.success(data.msg);
    } catch (err: any) {
      const n = toast.error(err.msg);
    } finally {
      setAgent("");
    }
  };

  return (
    <div className="flex flex-col flex-1 items-center">
      <h1 className="font-bold text-2xl lg:text-3xl text-center py-2">
        Welcome, {user?.name}
      </h1>
      <p className="text-xl flex justify-center px-2 text-center">
        Click the buttons to switch navigation
      </p>
      <p>
        There are <span ref={countRef}></span> pending deliveries
      </p>
      <div className="flex flex-col mt-4 items-center">
        <h1 className="text-xl py-2">Available Locations</h1>
        <table className="text-center">
          <thead>
            <tr>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {locations?.map((location) => (
              <tr key={location}>
                <td>
                  {editable === location ? (
                    <input
                      type="text"
                      defaultValue={location}
                      onChange={(e) => setEditingLoc(e.target.value)}
                    />
                  ) : (
                    <span>{location}</span>
                  )}
                </td>
                <td>
                  {editable === location ? (
                    <CheckIcon
                      className="text-green-600 w-6 h-6 cursor-pointer"
                      onClick={async () => {
                        setEditable("");
                        await editLocation(location, editingLoc);
                        setEditingLoc("");
                      }}
                    />
                  ) : (
                    <PencilIcon
                      className="text-gray-400 w-6 h-6 cursor-pointer"
                      onClick={async () => {
                        setEditable(location);
                      }}
                    />
                  )}
                  <TrashIcon
                    className="text-gray-700 w-6 h-6 cursor-pointer"
                    onClick={async () => {
                      await deleteLocation(location);
                      await loadLocations();
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="my-7 w-full text-center p-4">
        <h1 className="text-xl py-2">New Location?</h1>
        <input
          type="text"
          value={location}
          placeholder="Enter location"
          onChange={(e) => setLocation(e.target.value)}
          className="mb-4 border rounded form-input shadow ring-green-400 px-4 py-3 mx-3 outline-none focus:ring"
        />
        <input
          type="submit"
          value="Add Location"
          onClick={() => addLocation()}
          className="bg-green-400 text-white px-3 py-2 cursor-pointer hover:px-5 hover:py-3 transform duration-200"
        />
      </div>

      {/* Agents */}

      <div className="flex flex-col mt-4 items-center">
        <h1 className="text-xl py-2">Agents</h1>
        <table className="text-center">
          <thead>
            <tr>
              <th>Agent</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {agents?.map((agent) => (
              <tr key={agent._id}>
                <td>
                  {editableAgent === agent._id ? (
                    <input
                      type="text"
                      defaultValue={agent.name}
                      onChange={(e) => setEditingAgent(e.target.value)}
                    />
                  ) : (
                    <span>{agent.name}</span>
                  )}
                </td>
                <td>
                  {editableAgent === agent._id ? (
                    <CheckIcon
                      className="text-green-600 w-6 h-6 cursor-pointer"
                      onClick={async () => {
                        setEditableAgent("");
                        editAgent(agent._id, editingAgent);
                        setEditingAgent("");
                      }}
                    />
                  ) : (
                    <PencilIcon
                      className="text-gray-400 w-6 h-6 cursor-pointer"
                      onClick={async () => {
                        setEditableAgent(agent._id);
                      }}
                    />
                  )}
                  <TrashIcon
                    className="text-gray-700 w-6 h-6 cursor-pointer"
                    onClick={async () => {
                      // await deleteLocation(location);
                      await deleteAgent(agent._id);
                      await loadAgents();
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="my-7 w-full text-center p-4">
        <h1 className="text-xl py-2">New Agent?</h1>
        <input
          type="text"
          value={agent}
          placeholder="Enter agent"
          onChange={(e) => setAgent(e.target.value)}
          className="mb-4 border rounded form-input shadow ring-green-400 px-4 py-3 mx-3 outline-none focus:ring"
        />
        <input
          type="submit"
          value="Add Agent"
          onClick={() => addAgent()}
          className="bg-green-400 text-white px-3 py-2 cursor-pointer hover:px-5 hover:py-3 transform duration-200"
        />
      </div>
    </div>
  );
}

export default Dashboard;
