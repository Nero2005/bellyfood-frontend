import {
  ArrowLeftIcon,
  ArrowRightIcon,
  RefreshIcon,
  SearchIcon,
} from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getCustomers } from "../../services";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { UserState } from "../../store/userReducer";
import { getWithQuery, LinkRoutes } from "../../utils";
import Customer from "./Customer";

function PendingApproval() {
  // eslint-disable-next-line
  const page = useAppSelector((state) => state.users.page);
  // eslint-disable-next-line
  const dispatch = useAppDispatch();

  const [customers, setCustomers] = useState<UserState[]>(null!);
  const [searchName, setSearchName] = useState("");
  const [count, setCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const navigate = useNavigate();

  const loadPendingApprovals = async (page?: number) => {
    const n = toast.loading("Getting customers");
    try {
      // const res = await getWithQuery("users/customers", { approved: false });
      const data = await getCustomers({ approved: false, page });
      setCustomers(data.users);
      setCount(data.count);
      toast.success("Got customers!", {
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
    await loadPendingApprovals(pageNumber - 1);
  };
  const incPage = async () => {
    if (pageNumber === Math.ceil(count / 10) - 1 || count === 0) return;
    setPageNumber((prev) => prev + 1);

    await loadPendingApprovals(pageNumber + 1);
  };

  useEffect(() => {
    (async () => {
      await loadPendingApprovals(0);
    })();
  }, []);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value);
    // const res = await getWithQuery("users/customers", {
    //   approved: false,
    //   name: e.target.value,
    // });
    const data = await getCustomers({
      approved: false,
      name: e.target.value,
    });
    setCustomers(data.users);
  };

  return (
    <div className="flex-1 md:mt-1 pr-2 pl-2 md:pl-0">
      <h1 className="text-2xl font-semibold text-center my-2">
        Your Pending Approvals
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
        onClick={async () => await loadPendingApprovals(pageNumber)}
      />
      <div className="flex flex-col space-y-5 my-2">
        {customers?.map((customer) => (
          <Customer
            loadFunc={loadPendingApprovals}
            setCustomers={setCustomers}
            key={customer._id}
            customer={customer}
          />
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

export default PendingApproval;
