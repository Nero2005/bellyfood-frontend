import {
  ArrowLeftIcon,
  ArrowRightIcon,
  RefreshIcon,
  SearchIcon,
} from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getAdmins, getAdminsByName } from "../../services";
import { UserState } from "../../store/userReducer";
import { get, getWithQuery, LinkRoutes } from "../../utils";
import Admin from "./Admin";

function Admins() {
  const [admins, setAdmins] = useState<UserState[]>(null!);
  const [searchName, setSearchName] = useState("");
  const [count, setCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const navigate = useNavigate();

  const loadAdmins = async (page: number) => {
    const n = toast.loading("Getting admins");
    try {
      const data = await getAdmins({ page });
      setAdmins(data.users);
      setCount(data.count);
      toast.success("Got admins!", {
        id: n,
      });
    } catch (err: any) {
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
    await loadAdmins(pageNumber - 1);
  };
  const incPage = async () => {
    if (pageNumber === Math.ceil(count / 10) - 1 || count === 0) return;
    setPageNumber((prev) => prev + 1);

    await loadAdmins(pageNumber + 1);
  };

  useEffect(() => {
    (async () => {
      await loadAdmins(0);
    })();
  }, []);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setSearchName(e.target.value);
      // const res = await getWithQuery("super/admins", { name: e.target.value });
      const data = await getAdminsByName(e.target.value);
      setAdmins(data.users);
    } catch (err: any) {
      console.log(err);
      toast.error(`Error: ${err.msg}`);
    }
  };

  return (
    <div className="flex-1 md:mt-1 px-2">
      <h1 className="text-2xl font-semibold text-center my-2">
        Your Employees
      </h1>
      <RefreshIcon
        className="w-6 h-6 fixed top-44 z-50 right-10 cursor-pointer"
        onClick={async () => await loadAdmins(pageNumber)}
      />
      <div className="flex items-center bg-white sticky top-32 px-3">
        <SearchIcon className="w-6 h-6" />
        <input
          onChange={(e) => handleChange(e)}
          type="text"
          value={searchName}
          placeholder="Enter admin name"
          className="flex-1 py-2 my-2 px-3 outline-none bg-transparent"
        />
      </div>
      <div className="flex flex-col space-y-5 my-3">
        {admins?.map((admin) => (
          <Admin loadAdmins={loadAdmins} key={admin._id} admin={admin} />
        ))}
      </div>
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

export default Admins;
