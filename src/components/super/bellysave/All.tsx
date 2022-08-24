import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  PencilIcon,
  RefreshIcon,
} from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  editBellysaveCustomer,
  getBellysaveCustomers,
} from "../../../services";
import { LinkRoutes } from "../../../utils";

function All() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [count, setCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [editable, setEditable] = useState("");
  const [editingCustomer, setEditingCustomer] = useState<any>({});
  const [save, setSave] = useState(false);

  const navigate = useNavigate();

  const loadAll = async (page: number) => {
    const n = toast.loading("Getting customers");
    try {
      const data = await getBellysaveCustomers({ page });
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
    await loadAll(pageNumber - 1);
  };
  const incPage = async () => {
    if (pageNumber === Math.ceil(count / 10) - 1 || count === 0) return;
    setPageNumber((prev) => prev + 1);

    await loadAll(pageNumber + 1);
  };

  useEffect(() => {
    (async () => {
      await loadAll(pageNumber);
    })();
  }, [save]);
  return (
    <div className="flex-1 md:mt-1 px-2">
      <h1 className="text-center text-2xl mt-3">Bellysave Customers</h1>
      <RefreshIcon
        className="w-6 h-6 fixed top-44 z-50 right-10 cursor-pointer"
        onClick={async () => await loadAll(pageNumber)}
      />
      {customers?.length > 0 && (
        <div className="mt-10 mx-auto max-w-sm sm:max-w-xl md:max-w-3xl overflow-scroll scrollbar-hide">
          <table className="mx-auto text-center border border-gray-500">
            <thead>
              <tr className="border border-gray-500">
                <th className="border border-gray-500 px-0">S/N</th>
                <th className="border border-gray-500">Customer Name</th>
                <th className="border border-gray-500">Phone</th>
                <th className="border border-gray-500">Account Number</th>
                <th className="border border-gray-500">Bank Name</th>
                <th className="border border-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers?.map((customer: any, index) => (
                <tr key={customer._id} className="border border-gray-500">
                  <td className="border border-gray-500 px-1 mx-1">
                    {index + 1}
                  </td>
                  <td className="border border-gray-500">
                    {editable === customer._id ? (
                      <input
                        type="text"
                        className="py-2 px-2"
                        defaultValue={customer.name}
                        onChange={(e) =>
                          setEditingCustomer((prev: any) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                      />
                    ) : (
                      <span>{customer.name}</span>
                    )}
                  </td>
                  <td className="border border-gray-500">
                    {editable === customer._id ? (
                      <input
                        type="text"
                        className="py-2 px-2"
                        defaultValue={customer.phone}
                        onChange={(e) =>
                          setEditingCustomer((prev: any) => ({
                            ...prev,
                            phone: e.target.value,
                          }))
                        }
                      />
                    ) : (
                      <span>{customer.phone}</span>
                    )}
                  </td>
                  <td className="border border-gray-500">
                    {editable === customer._id ? (
                      <input
                        type="text"
                        className="py-2 px-2"
                        defaultValue={customer.accountNumber}
                        onChange={(e) =>
                          setEditingCustomer((prev: any) => ({
                            ...prev,
                            accountNumber: e.target.value,
                          }))
                        }
                      />
                    ) : (
                      <span>{customer.accountNumber}</span>
                    )}
                  </td>
                  <td className="border border-gray-500">
                    {editable === customer._id ? (
                      <input
                        type="text"
                        className="py-2 px-2"
                        defaultValue={customer.bankName}
                        onChange={(e) =>
                          setEditingCustomer((prev: any) => ({
                            ...prev,
                            bankName: e.target.value,
                          }))
                        }
                      />
                    ) : (
                      <span>{customer.bankName}</span>
                    )}
                  </td>
                  <td className="border border-gray-500">
                    {editable === customer._id ? (
                      <CheckIcon
                        className="text-green-600 w-6 h-6 cursor-pointer"
                        onClick={async () => {
                          setEditable("");
                          const updated = {
                            name: editingCustomer.name || customer.name,
                            bankName:
                              editingCustomer.bankName || customer.bankName,
                            accountNumber:
                              editingCustomer.accountNumber ||
                              customer.accountNumber,
                          };
                          editBellysaveCustomer(customer._id, updated);
                          setEditingCustomer({});
                          setSave((prev) => !prev);
                        }}
                      />
                    ) : (
                      <PencilIcon
                        className="text-gray-400 w-6 h-6 cursor-pointer"
                        onClick={async () => {
                          setEditable(customer._id);
                        }}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {customers?.map((customer: any) => (
            <div
              key={customer._id}
              className="justify-center flex flex-col lg:flex-row space-y-3 space-x-4 items-center"
            ></div>
          ))}
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

export default All;
