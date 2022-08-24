import {
  ArrowLeftIcon,
  ArrowRightIcon,
  RefreshIcon,
  SearchIcon,
} from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getCustomers, getLocations } from "../../services";
import { UserState } from "../../store/userReducer";
import SuperCustomer from "./SuperCustomer";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { LinkRoutes } from "../../utils";
import { useNavigate } from "react-router-dom";

TimeAgo.addLocale(en);
function Customers() {
  const timeAgo = new TimeAgo("en-US");
  const [customers, setCustomers] = useState<UserState[]>(null!);
  const [searchName, setSearchName] = useState("");
  const [locations, setLocations] = useState<string[]>(null!);
  const [count, setCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [filter, setFilter] = useState<any>({});
  const navigate = useNavigate();

  const loadCustomers = async (page: number) => {
    const n = toast.loading("Getting customers");
    try {
      // const res = await get("super/admins");
      const data = await getCustomers({ page, ...filter });
      setCustomers(data.users);
      setCount(data.count);
      setLocations(await getLocations());
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
    await loadCustomers(pageNumber - 1);
  };
  const incPage = async () => {
    if (pageNumber === Math.ceil(count / 10) - 1 || count === 0) return;
    setPageNumber((prev) => prev + 1);

    await loadCustomers(pageNumber + 1);
  };

  useEffect(() => {
    (async () => {
      await loadCustomers(pageNumber);
    })();
  }, [filter]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setSearchName(e.target.value);
      // const res = await getWithQuery("super/admins", { name: e.target.value });
      const data = await getCustomers({ name: e.target.value });
      setCustomers(data.users);
    } catch (err: any) {
      console.log(err);
      toast.error(`Error: ${err.msg}`);
    }
  };

  const getActiveCustomers = () => {
    try {
      setCustomers(
        customers.filter(
          (customer) => customer.paid === false && customer.approved === true
        )
      );
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
      <div className="flex space-x-3 items-center sticky mb-3">
        <select
          className="flex-1 py-2 px-2 rounded-md"
          onChange={async (e) => {
            if (e.target.value === "Select Location") {
              setFilter((prev: any) => ({ ...prev, location: "" }));
              return;
            }
            setFilter((prev: any) => ({ ...prev, location: e.target.value }));
          }}
        >
          <option value={"Select Location"}>Select Location</option>
          {locations?.map((location, index) => (
            <option key={index + 1} value={location}>
              {location}
            </option>
          ))}
        </select>
        <select
          className="flex-1 py-2 px-2 rounded-md"
          onChange={async (e) => {
            if (e.target.value === "Select Customer Status") {
              setFilter((prev: any) => ({
                ...prev,
                paid: undefined,
                approved: undefined,
              }));
              return;
            }
            if (e.target.value === "Active") {
              setFilter((prev: any) => ({
                ...prev,
                paid: false,
                approved: true,
                inactive: undefined,
              }));
            } else if (e.target.value === "Inactive") {
              setFilter((prev: any) => ({
                ...prev,
                paid: undefined,
                approved: undefined,
                inactive: true,
              }));
            }
          }}
        >
          <option value={"Select Customer Status"}>
            Select Customer Status
          </option>
          <option value={"Active"}>Active</option>
          <option value={"Inactive"}>Inactive</option>
        </select>
      </div>
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
      {customers?.length > 0 && (
        <div className="mx-auto mt-2 overflow-scroll max-w-sm sm:max-w-2xl md:max-w-3xl lg:max-w-5xl scrollbar-hide border">
          <table className="text-center mx-auto border border-gray-500">
            <thead>
              <tr className="py-3 border border-gray-500">
                <th className="border border-gray-500 px-0">S/N</th>
                <th className="border border-gray-500">Customer Name</th>
                <th className="border border-gray-500">Phone</th>
                <th className="border border-gray-500">Date</th>
                <th className="border border-gray-500">Package Name</th>
                <th className="border border-gray-500">Amount Paid</th>
                <th className="border border-gray-500">Amount left</th>
              </tr>
            </thead>
            <tbody>
              {customers?.map((customer, index) => (
                <SuperCustomer
                  index={index + 1}
                  timeAgo={timeAgo}
                  customer={customer}
                  loadCustomers={loadCustomers}
                  key={customer._id}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

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

export default Customers;
