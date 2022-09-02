import { CheckIcon, PencilIcon, TrashIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  changeAgentPassword,
  deleteAgent,
  editAgent,
  getAgents,
  postAgent,
} from "../../services";

interface FormData {
  name: string;
  password: string;
  phone: string;
}

function Agents() {
  const [agents, setAgents] = useState<any[]>([]);
  const [agent, setAgent] = useState("");
  const [editableAgent, setEditableAgent] = useState<any>("");
  const [editingAgent, setEditingAgent] = useState<any>("");
  const [errorMessage, setErrorMessage] = useState("");
  const [agentPassword, setAgentPassword] = useState<any>({});
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<FormData>();

  const loadAgents = async () => {
    try {
      const agents = await getAgents();
      setAgents(agents);
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    (async () => {
      await loadAgents();
    })();
  }, [agent, editingAgent]);

  const addAgent = handleSubmit(async (formData) => {
    try {
      let phone = watch("phone");
      if (phone.charAt(0) === "0") {
        phone = phone.slice(1);
      }
      const form = {
        name: formData.name,
        phone: `+234${phone}`,
        password: formData.name,
      };
      const data = await postAgent(form);
      const n = toast.success(data.msg);
    } catch (err: any) {
      const n = toast.error(err.msg);
      setErrorMessage(err.msg);
    } finally {
      reset();
    }
  });

  const changePassword = async (agentId: string) => {
    const n = toast.loading("Changing password");
    try {
      if (!agentPassword.password || agentPassword.password === "") {
        toast.error("Password required", { id: n });
        return;
      }
      console.log(agentPassword);

      await changeAgentPassword(agentPassword.agentId, agentPassword.password);
      toast.success("Password changed", { id: n });
    } catch (err: any) {
      toast.error("An error occurred: " + err.msg);
    } finally {
      setAgentPassword({});
    }
  };

  return (
    <div>
      <div className="my-7 w-full text-center p-4">
        <h1 className="text-xl py-2">New Agent?</h1>
        <form
          onSubmit={addAgent}
          className="max-w-2xl mx-auto flex flex-col justify-center items-center"
        >
          <label className="p-2">
            <span className="">Agent Name:</span>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Enter agent name"
              className="mt-1 block mb-4 border rounded form-input shadow ring-green-400 px-4 py-3 mx-3 outline-none focus:ring"
            />
          </label>
          <label className="p-2">
            <span>Phone:</span>
            <input
              type="tel"
              {...register("phone", { required: true })}
              placeholder="Enter agent phone"
              className="mt-1 block mb-4 border rounded form-input shadow ring-green-400 px-4 py-3 mx-3 outline-none focus:ring"
            />
          </label>
          {(Object.keys(errors).length > 0 || errorMessage) && (
            <div className="space-y-2 p-2 text-red-500">
              {errors.phone?.type === "required" && (
                <p> - Phone number is required</p>
              )}
              {errors.name?.type === "required" && <p> - Name is required</p>}
              {errorMessage && <p>- {errorMessage}</p>}
            </div>
          )}
          <input
            type="submit"
            value="Add Agent"
            className="bg-green-400 text-white px-3 py-2 cursor-pointer hover:px-5 hover:py-3 transform duration-300"
          />
        </form>
      </div>
      <div className="flex flex-col mt-4 items-center">
        <h1 className="text-xl py-2">Agents</h1>
        <table className="text-center">
          <thead>
            <tr>
              <th>Agent</th>
              <th>Actions</th>
              <th>Change Password</th>
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
                <td className="flex space-x-2 items-center py-2">
                  <input
                    id="password"
                    type="text"
                    placeholder="Enter new password"
                    value={
                      agentPassword.agentId === agent._id
                        ? agentPassword.password
                        : ""
                    }
                    onChange={(e) =>
                      setAgentPassword({
                        agentId: agent._id,
                        password: e.target.value,
                      })
                    }
                    className="px-1 py-1 focus:ring ring-green-400 rounded outline-none"
                  />
                  <button
                    type="button"
                    className="px-1 py-1 bg-green-300"
                    onClick={() => changePassword(agent._id)}
                  >
                    Change Password
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Agents;
