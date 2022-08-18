import { RefreshIcon, SearchIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getCustomers } from "../../services";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { UserState } from "../../store/userReducer";
import { getWithQuery } from "../../utils";
import Customer from "./Customer";

function PendingPayments() {
  const user = useAppSelector((state) => state.users.user);
  // eslint-disable-next-line
  const dispatch = useAppDispatch();

  const [customers, setCustomers] = useState<UserState[]>(null!);
  const [searchName, setSearchName] = useState("");

  const loadPendingPayments = async () => {
    // const n = toast.loading("Getting customers");
    const n = toast.loading("Getting customers");
    try {
      // const res = await getWithQuery("users/customers", {
      //   approved: true,
      //   paid: false,
      //   agentCode: user?.agentCode,
      // });
      const data = await getCustomers({
        approved: true,
        paid: false,
        agentCode: user?.agentCode,
      });
      console.log(data);
      setCustomers(data.users);
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

  useEffect(() => {
    (async () => {
      await loadPendingPayments();
    })();
    // eslint-disable-next-line
  }, []);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      console.log(e.target.value);
      setSearchName(e.target.value);
      // const res = await getWithQuery("users/customers", {
      //   approved: true,
      //   paid: false,
      //   name: e.target.value,
      //   agentCode: user?.agentCode,
      // });
      const data = await getCustomers({
        approved: true,
        paid: false,
        name: e.target.value,
        agentCode: user?.agentCode,
      });
      setCustomers(data.users);
    } catch (err: any) {
      console.log(err);
      const n = toast.error(`Error: ${err.msg}`);
    }
  };

  return (
    <div className="flex-1 md:mt-1 px-2">
      <h1 className="text-2xl font-semibold text-center my-2">
        Your Pending Payments
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
      <RefreshIcon
        className="w-6 h-6 fixed top-44 z-50 right-10 cursor-pointer"
        onClick={async () => await loadPendingPayments()}
      />
      <div className="flex flex-col space-y-5 my-2">
        {customers?.map((customer) => (
          <Customer
            loadFunc={loadPendingPayments}
            setCustomers={setCustomers}
            key={customer._id}
            customer={customer}
          />
        ))}
      </div>
    </div>
  );
}

export default PendingPayments;
