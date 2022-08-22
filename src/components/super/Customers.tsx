import {
  ArrowLeftIcon,
  ArrowRightIcon,
  RefreshIcon,
  SearchIcon,
} from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getCustomers } from "../../services";
import { UserState } from "../../store/userReducer";
import SuperCustomer from "./SuperCustomer";

function Customers() {
  const [customers, setCustomers] = useState<UserState[]>(null!);
  const [searchName, setSearchName] = useState("");
  const [count, setCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);

  const loadCustomers = async (page: number) => {
    const n = toast.loading("Getting customers");
    try {
      // const res = await get("super/admins");
      const data = await getCustomers({ page });
      console.log(data);
      setCustomers(data.users);
      setCount(data.count);
      toast.success("Got customers!", {
        id: n,
      });
    } catch (err: any) {
      console.log(err);
      toast.error(`Error: ${err.msg}`, {
        id: n,
      });
    }
  };

  const decPage = async () => {
    if (pageNumber == 0) return;
    setPageNumber((prev) => prev - 1);
    await loadCustomers(pageNumber - 1);
  };
  const incPage = async () => {
    console.log(count / 10);

    if (pageNumber === Math.ceil(count / 10) - 1) return;
    setPageNumber((prev) => prev + 1);

    await loadCustomers(pageNumber + 1);
  };

  useEffect(() => {
    (async () => {
      await loadCustomers(0);
    })();
  }, []);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      console.log(e.target.value);
      setSearchName(e.target.value);
      // const res = await getWithQuery("super/admins", { name: e.target.value });
      const data = await getCustomers({ name: e.target.value });
      console.log(data);
      setCustomers(data.users);
    } catch (err: any) {
      console.log(err);
      toast.error(`Error: ${err.msg}`);
    }
  };

  return (
    <div className="flex-1 md:mt-1 px-2">
      <h1 className="text-2xl font-semibold text-center my-2">
        Your Customers
      </h1>
      <RefreshIcon
        className="w-6 h-6 fixed top-44 z-50 right-10 cursor-pointer"
        onClick={async () => await loadCustomers(pageNumber)}
      />
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
        {customers?.map((customer) => (
          <SuperCustomer
            customer={customer}
            loadCustomers={loadCustomers}
            key={customer._id}
          />
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
            pageNumber === Math.ceil(count / 10) - 1 && "text-gray-300"
          }`}
          onClick={() => incPage()}
        />
      </div>
    </div>
  );
}

export default Customers;
