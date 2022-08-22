import { TrashIcon } from "@heroicons/react/solid";
import React from "react";
import { UserState } from "../../store/userReducer";

interface Props {
  customer: UserState;
  loadCustomers?: (page: number) => Promise<void>;
}

function SuperCustomer({ customer, loadCustomers }: Props) {
  return (
    <div className="flex flex-col cursor-pointer">
      <div className="flex flex-col md:flex-row md:space-x-10 justify-center py-3 items-center bg-white">
        <h1>{customer.name}</h1>
        <h2>{customer.phone}</h2>
        <h3>{new Date(customer.date!).toDateString()}</h3>
        <h3>{customer.packageNames?.map((p) => p)}</h3>
        <h3>{customer.amountPaid}</h3>
        <h3>{customer.totalPrice - customer.amountPaid}</h3>
        {/* <TrashIcon
          className="w-6 h-6 cursor-pointer text-gray-500"
          onClick={async () => await deleteCustomerClick()}
        /> */}
      </div>
    </div>
  );
}

export default SuperCustomer;
