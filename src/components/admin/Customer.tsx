import React, { SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  changePackage,
  deleteCustomerS,
  getCustomers,
  getPackages,
  postDelivery,
  postPayment,
  renewPackage,
} from "../../services";
import { useAppSelector } from "../../store/hooks";
import { PackageName, UserState } from "../../store/userReducer";
import { getWithQuery, LinkRoutes, post } from "../../utils";

interface Props {
  customer: UserState;
  setCustomers: (value: SetStateAction<UserState[]>) => void;
  loadFunc?: (page?: number) => Promise<void>;
}

interface CustomerDrop {
  [key: string]: any;
  PENDING_PAYMENTS: boolean;
  PENDING_APPROVAL: boolean;
  PENDING_DELIVERIES: boolean;
  COMPLETED_DELIVERIES: boolean;
}

function Customer({ customer, setCustomers, loadFunc }: Props) {
  const [open, setOpen] = useState<CustomerDrop>({
    PENDING_PAYMENTS: false,
    PENDING_APPROVAL: false,
    PENDING_DELIVERIES: false,
    COMPLETED_DELIVERIES: false,
  });
  const { user, page } = useAppSelector((state) => state.users);
  const [amount, setAmount] = useState<string | number>(0);
  const [packages, setPackages] = useState<any[]>([]);
  const [pkgChange, setPkgChange] = useState("");
  const navigate = useNavigate();

  const addPayment = async () => {
    try {
      const phone = customer.phone;
      if (!amount || amount == 0) {
        const n = toast.error("Amount required");
        return;
      }
      const d = await postPayment({
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

  const deliver = async () => {
    try {
      // const res = await post(`super/deliver?customerId=${customer._id}`);
      const data = await postDelivery(customer._id);
      const n = toast.success(data.msg);
      if (loadFunc) {
        await loadFunc();
      }
    } catch (err: any) {
      console.log(err);
      const n = toast.error(`Error: ${err.msg}`);
    }
  };

  const approve = async () => {
    try {
      const { data: data2 } = await post(
        `users/approve?customerId=${customer._id}&agentCode=${user?.agentCode}`
      );
      toast.success("Customer approved!");
      // const res = await getWithQuery("users/customers", { approved: false });
      const data = await getCustomers({ approved: false });
      console.log(data);
      setCustomers(data.users);
      if (loadFunc) {
        await loadFunc();
      }
    } catch (err: any) {
      console.log(err);
      const n = toast.error(`Error: ${err.msg}`);
    }
  };

  const renew = async () => {
    try {
      await renewPackage(customer._id);
      toast.success("Customer renewed!");
      if (loadFunc) {
        await loadFunc();
      }
    } catch (err: any) {
      console.log(err);
      const n = toast.error(`Error: ${err.msg}`);
    }
  };
  const change = async (customerId: string, newPkg: string) => {
    try {
      await changePackage(customerId, newPkg);
      toast.success("Customer package changed!");
      if (loadFunc) {
        await loadFunc();
      }
    } catch (err: any) {
      console.log(err);
      const n = toast.error(`Error: ${err.msg}`);
    }
  };
  const deleteCustomer = async () => {
    try {
      await deleteCustomerS(customer._id);
      toast.success("Customer deleted!");
      if (loadFunc) {
        await loadFunc();
      }
    } catch (err: any) {
      console.log(err);
      const n = toast.error(`Error: ${err.msg}`);
    }
  };

  useEffect(() => {
    (async () => {
      const pkgs = await getPackages();
      setPackages(pkgs);
      setPkgChange(pkgs[0]);
    })();
  }, []);

  /**
   * customer.approved && customer.paid && customer.delivered && 
customer.approved && customer.paid && customer.delivered && 
customer.approved && customer.paid && customer.delivered && 
   */

  return (
    <div className="flex flex-col cursor-pointer w-full">
      <div
        className="text-blue-500 flex flex-col md:flex-row md:space-x-2 space-y-2 lg:space-x-32 justify-center py-2 items-center bg-white"
        onClick={() => setOpen((open) => ({ ...open, [page]: !open[page] }))}
      >
        <h1 className="text-sm lg:text-base">{customer.name}</h1>
        <h2 className="text-sm lg:text-base">{customer.phone}</h2>
        {customer.approved && !customer.paid && (
          <button className="lg:px-6 lg:py-3 shadow-md text-white bg-green-400 px-3 py-2">
            Add Payment
          </button>
        )}
        {!customer.approved && (
          <button
            className="lg:px-6 lg:py-3 shadow-md text-white bg-green-400 px-3 py-2 hover:px-5 hover:py-3 transform duration-200"
            onClick={approve}
          >
            Approve
          </button>
        )}
        {customer.approved && customer.paid && !customer.delivered && (
          <button
            className="lg:px-6 lg:py-3 shadow-md text-white bg-green-400 px-3 py-2 hover:px-5 hover:py-3 transform duration-200"
            onClick={deliver}
          >
            Deliver
          </button>
        )}
        {customer.approved && customer.paid && customer.delivered && (
          <button
            className="lg:px-6 lg:py-3 shadow-md text-white bg-green-400 px-3 py-2 hover:px-5 hover:py-3 transform duration-200"
            onClick={renew}
          >
            Renew
          </button>
        )}
        {customer.approved && customer.paid && customer.delivered && (
          <button
            className="lg:px-6 lg:py-3 shadow-md text-white bg-green-400 px-3 py-2 hover:px-5 hover:py-3 transform duration-200"
            onClick={() => change(customer._id, pkgChange)}
          >
            Change
          </button>
        )}
        {customer.approved && customer.paid && customer.delivered && (
          <select onChange={(e) => setPkgChange(e.target.value)}>
            {packages?.map((pkgName) => (
              <option key={pkgName.name} value={pkgName.name}>
                {pkgName.name}
              </option>
            ))}
          </select>
        )}
        {customer.approved && customer.paid && customer.delivered && (
          <button
            className="lg:px-6 lg:py-3 shadow-md text-white bg-green-400 px-3 py-2 hover:px-5 hover:py-3 transform duration-200"
            onClick={deleteCustomer}
          >
            Delete
          </button>
        )}
      </div>
      <div
        className={`${
          open.PENDING_PAYMENTS ? "flex" : "hidden"
        } justify-center py-2 px-2 items-center bg-white`}
      >
        <label className="p-2 flex items-center justify-between space-x-5">
          <span>Amount: </span>
          <input
            value={amount}
            onClick={() => setAmount("")}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            required={true}
            placeholder="100"
            className="border rounded form-input shadow ring-green-400 px-4 py-3 w-full mt-1 outline-none focus:ring"
          />
        </label>
        <input
          type="submit"
          value="Add"
          className="border rounded py-2 px-5 mt-1 bg-green-400 text-white cursor-pointer hover:px-7 hover:py-3 transform duration-200"
          onClick={addPayment}
        />
      </div>
      <div
        className={`${
          open.PENDING_APPROVAL || open.PENDING_DELIVERIES ? "flex" : "hidden"
        } justify-between py-2 px-2 items-center bg-white w-full flex-col sm:flex-row`}
      >
        <p>Phone: {customer.phone}</p>
        <p>Package(s) Ordered: {customer.packageNames?.map((p) => p)}</p>
        <p>Price: {customer.totalPrice}</p>
      </div>
      <div
        className={`${
          open.COMPLETED_DELIVERIES ? "flex" : "hidden"
        } justify-between py-2 px-2 items-center bg-white w-full flex-col sm:flex-row`}
      >
        <p>Completed</p>
      </div>
    </div>
  );
}

export default Customer;
