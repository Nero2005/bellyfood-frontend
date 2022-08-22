import { TrashIcon } from "@heroicons/react/solid";
import React from "react";
import toast from "react-hot-toast";
import { deleteAdmin } from "../../services";
import { UserState } from "../../store/userReducer";

interface Props {
  admin: UserState;
  loadAdmins?: (page: number) => Promise<void>;
}

function Admin({ admin, loadAdmins }: Props) {
  const deleteAdminClick = async () => {
    toast.success("Admin deleted, click the refresh icon");
    const data = await deleteAdmin(admin.agentCode!);
  };
  return (
    <div className="flex flex-col cursor-pointer">
      <div className="flex space-x-8 md:space-x-32 justify-center py-3 items-center bg-white">
        <h1>{admin.name}</h1>
        <h2>{admin.phone}</h2>
        <TrashIcon
          className="w-6 h-6 cursor-pointer text-gray-500"
          onClick={async () => await deleteAdminClick()}
        />
      </div>
    </div>
  );
}

export default Admin;
