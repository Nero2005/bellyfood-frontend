import { SearchIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getCustomers, getLocations } from "../../services";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { UserState } from "../../store/userReducer";
import { getWithQuery, LinkRoutes } from "../../utils";
import Customer from "../admin/Customer";
import DeliveryLocation from "./DeliveryLocation";

function PendingDeliveries() {
  const user = useAppSelector((state) => state.users.user);
  // eslint-disable-next-line
  const dispatch = useAppDispatch();

  const [customers, setCustomers] = useState<UserState[]>(null!);
  const [locations, setLocations] = useState<string[]>(null!);
  const [searchName, setSearchName] = useState("");
  const navigate = useNavigate();

  const loadPendingDeliveries = async () => {
    // const n = toast.loading("Getting customers");
    try {
      setLocations(await getLocations());
      const data = await getCustomers({
        approved: true,
        paid: true,
        delivered: false,
      });
      setCustomers(data.users);
      // toast.success("Got customers!", {
      //   id: n,
      // });
    } catch (err: any) {
      console.log(err);
      if (err === "Unauthorized") {
        navigate(LinkRoutes.LOGIN);
        window.location.reload();
      }
      // toast.error("An error occurred", { id: n });
    }
  };

  useEffect(() => {
    (async () => {
      await loadPendingDeliveries();
    })();
    // eslint-disable-next-line
  }, []);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setSearchName(e.target.value);
      const data = await getCustomers({
        approved: true,
        paid: true,
        delivered: false,
        name: e.target.value,
      });
      setCustomers(data.users);
    } catch (err: any) {
      console.log(err);
      toast.error(`Error: ${err.msg}`);
    }
  };

  return (
    <div className="flex-1 md:mt-1 px-2">
      <h1 className="text-2xl font-semibold text-center my-2">
        Your Pending Deliveries
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
      <div className="flex flex-col space-y-5 my-2 items-center w-full">
        {locations?.map((location) => (
          <DeliveryLocation key={location} location={location} />
        ))}
        {/* {customers?.map((customer) => (
          <Customer
            setCustomers={setCustomers}
            key={customer._id}
            customer={customer}
          />
        ))} */}
      </div>
    </div>
  );
}

export default PendingDeliveries;
