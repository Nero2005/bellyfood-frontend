import {
  ArrowLeftIcon,
  ArrowRightIcon,
  RefreshIcon,
} from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  getBellysaveCustomers,
  postBellysaveCustomer,
  postBellysavePayment,
} from "../../../services";
import { LinkRoutes } from "../../../utils";

function Paying() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [count, setCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [amount, setAmount] = useState<string | number>(0);

  const navigate = useNavigate();

  const loadPaying = async (page: number) => {
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
    await loadPaying(pageNumber - 1);
  };
  const incPage = async () => {
    if (pageNumber === Math.ceil(count / 10) - 1 || count === 0) return;
    setPageNumber((prev) => prev + 1);

    await loadPaying(pageNumber + 1);
  };

  const addPayment = async (e: any, phone: string) => {
    e.preventDefault();
    try {
      if (!amount || amount == 0) {
        const n = toast.error("Amount required");
        return;
      }
      console.log(phone, amount);

      const d = await postBellysavePayment({
        phone,
        amount: parseInt(amount as string),
      });
      const n = toast.success(d.msg);
      setAmount(0);
    } catch (err: any) {
      console.log(err);
      if (err === "Unauthorized") {
        navigate(LinkRoutes.LOGIN);
        window.location.reload();
      }
      toast.error("An error occurred");
    }
  };

  useEffect(() => {
    (async () => {
      await loadPaying(pageNumber);
    })();
  }, []);

  return (
    <div className="flex-1 md:mt-1 px-2">
      <h1 className="text-center text-2xl mt-3">Bellysave Customers</h1>
      <RefreshIcon
        className="w-6 h-6 fixed top-44 z-50 right-10 cursor-pointer"
        onClick={async () => await loadPaying(pageNumber)}
      />
      <div className="mt-10">
        {customers?.map((customer) => (
          <div key={customer._id} className="flex space-x-4 items-center">
            <span>{customer.name}</span>
            <span>{customer.bankName}</span>
            <span>{customer.accountNumber}</span>
            <form className="flex-1 flex items-center space-x-3">
              <input
                value={amount}
                onClick={() => setAmount("")}
                onChange={(e) => setAmount(e.target.value)}
                type="number"
                required={true}
                placeholder="Amount paid"
                className="flex-1 border rounded form-input shadow ring-green-400 px-4 py-3 mt-1 outline-none focus:ring"
              />
              <input
                type="submit"
                value="Add"
                onClick={(e) => addPayment(e, customer.phone)}
                className="border rounded py-2 px-5 mt-1 bg-green-400 text-white cursor-pointer hover:px-7 hover:py-3 transform duration-200"
              />
            </form>
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

export default Paying;
