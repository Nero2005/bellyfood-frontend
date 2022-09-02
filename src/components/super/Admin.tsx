import { TrashIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  changeAdminPassword,
  deleteAdmin,
  disableAdmin,
  enableAdmin,
} from "../../services";
import { UserState } from "../../store/userReducer";

interface Props {
  admin: UserState;
  loadAdmins?: (page: number) => Promise<void>;
}

function Admin({ admin, loadAdmins }: Props) {
  const [adminPassword, setAdminPassword] = useState<any>({});
  const deleteAdminClick = async () => {
    toast.success("Admin deleted, click the refresh icon");
    const data = await deleteAdmin(admin.agentCode!);
  };
  const changePassword = async (agentId: string) => {
    const n = toast.loading("Changing password");
    try {
      if (!adminPassword.password || adminPassword.password === "") {
        toast.error("Password required", { id: n });
        return;
      }
      console.log(adminPassword);

      await changeAdminPassword(adminPassword.agentId, adminPassword.password);
      toast.success("Password changed", { id: n });
    } catch (err: any) {
      toast.error("An error occurred: " + err.msg);
    } finally {
      setAdminPassword({});
    }
  };
  return (
    <div className="flex flex-col cursor-pointer bg-white">
      <div className="flex space-x-8 md:space-x-32 justify-center py-3 items-center">
        <h1>{admin.name}</h1>
        <h2>{admin.phone}</h2>
        {admin.approved ? (
          <button
            className="bg-green-400 px-2 py-2 text-white"
            onClick={async () => {
              await disableAdmin(admin._id);
              toast.success("Admin disabled");
            }}
          >
            Disable
          </button>
        ) : (
          <button
            className="bg-green-400 px-2 py-2 text-white"
            onClick={async () => {
              await enableAdmin(admin._id);
              toast.success("Admin enabled");
            }}
          >
            Enable
          </button>
        )}
        <TrashIcon
          className="w-6 h-6 cursor-pointer text-gray-500"
          onClick={async () => await deleteAdminClick()}
        />
      </div>
      <div className="flex space-x-2 items-center py-2 justify-center">
        <input
          id="password"
          type="text"
          placeholder="Enter new password"
          value={
            adminPassword.adminId === admin._id ? adminPassword.password : ""
          }
          onChange={(e) =>
            setAdminPassword({
              adminId: admin._id,
              password: e.target.value,
            })
          }
          className="px-1 py-1 focus:ring ring-green-400 rounded outline-none bg-gray-200"
        />
        <button
          type="button"
          className="px-1 py-1 bg-green-300"
          onClick={() => changePassword(admin._id)}
        >
          Change Password
        </button>
      </div>
    </div>
  );
}

export default Admin;
