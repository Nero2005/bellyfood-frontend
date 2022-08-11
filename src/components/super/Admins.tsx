import { SearchIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { UserState } from "../../store/userReducer";
import { get, getWithQuery } from "../../utils";
import Admin from "./Admin";

function Admins() {
  const [admins, setAdmins] = useState<UserState[]>(null!);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    (async () => {
      const n = toast.loading("Getting admins");
      try {
        const res = await get("super/admins");
        console.log(res.data);
        setAdmins(res.data.users);
        toast.success("Got admins!", {
          id: n,
        });
      } catch (err: any) {
        console.log(err);
        toast.error(`Error: ${err.msg}`, {
          id: n,
        });
      }
    })();
  }, []);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      console.log(e.target.value);
      setSearchName(e.target.value);
      const res = await getWithQuery("super/admins", { name: e.target.value });
      console.log(res.data);
      setAdmins(res.data.users);
    } catch (err: any) {
      console.log(err);
      const n = toast.error(`Error: ${err.msg}`);
    }
  };

  return (
    <div className="flex-1 md:mt-1 px-2">
      <h1 className="text-2xl font-semibold text-center my-2">
        Your Employees
      </h1>
      <div className="flex items-center bg-white sticky top-32 px-3">
        <SearchIcon className="w-6 h-6" />
        <input
          onChange={(e) => handleChange(e)}
          type="text"
          value={searchName}
          placeholder="Enter customer name"
          className="flex-1 py-2 my-2 px-3 outline-none bg-transparent"
        />
      </div>
      <div className="flex flex-col space-y-5 my-3">
        {admins?.map((admin) => (
          <Admin admin={admin} />
        ))}
      </div>
    </div>
  );
}

export default Admins;
