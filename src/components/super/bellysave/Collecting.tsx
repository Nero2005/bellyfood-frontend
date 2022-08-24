import {
  ArrowLeftIcon,
  ArrowRightIcon,
  RefreshIcon,
} from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getBellysaveCustomers, payBellysaveCustomer } from "../../../services";
import { LinkRoutes } from "../../../utils";

function Collecting() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [count, setCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);

  const navigate = useNavigate();

  const loadCollecting = async (page: number) => {
    const n = toast.loading("Getting customers");
    try {
      const data = await getBellysaveCustomers({ paying: true, page });
      setCustomers(data.users);
      setCount(data.count);
      toast.success("Got customers", { id: n });
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
    await loadCollecting(pageNumber - 1);
  };
  const incPage = async () => {
    if (pageNumber === Math.ceil(count / 10) - 1 || count === 0) return;
    setPageNumber((prev) => prev + 1);

    await loadCollecting(pageNumber + 1);
  };

  const pay = async (customerId: string) => {
    try {
      await payBellysaveCustomer(customerId);
      toast.success("Customer paid!");
    } catch (err: any) {
      console.log(err);
      const n = toast.error(`Error: ${err.msg}`);
    }
  };

  useEffect(() => {
    (async () => {
      await loadCollecting(pageNumber);
    })();
  }, []);

  return (
    <div className="flex-1 md:mt-1 px-2">
      <h1 className="text-center text-2xl mt-3">Bellysave Customers</h1>
      <RefreshIcon
        className="w-6 h-6 fixed top-44 z-50 right-10 cursor-pointer"
        onClick={async () => await loadCollecting(pageNumber)}
      />
      <div className="mt-10">
        {customers?.map((customer) => (
          <div
            key={customer._id}
            className="flex flex-col md:flex-row space-y-4 md:space-y-0 justify-center space-x-0 md:space-x-4 items-center"
          >
            <span>
              <span className="">Customer Name:</span>
              <br />
              <span className="text-semibold text-xl">{customer.name}</span>
            </span>
            <span>
              <span className="">Amount saved:</span>
              <br />
              <span className="text-semibold text-lg">
                {customer.amountPaid}
              </span>
            </span>
            <span>
              <span>Amount deducted:</span>
              <br />
              <span className="text-semibold text-lg">
                {customer.amountRemoved}
              </span>
            </span>
            <span>
              <span>Amount to be paid:</span>
              <br />
              <span className="text-semibold text-lg">
                {customer.amountPaid - customer.amountRemoved}
              </span>
            </span>
            <button
              onClick={() => pay(customer._id)}
              className="lg:px-6 lg:py-3 shadow-md text-white bg-green-400 px-3 py-2 hover:px-5 hover:py-3 transform duration-200"
            >
              Pay
            </button>
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

export default Collecting;
