import React, { useEffect, useState } from "react";
import { UserState } from "../../store/userReducer";

interface Props {
  customer: UserState;
}

function Customer({ customer }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log(open);
  }, [open]);

  return (
    <div className="flex flex-col">
      <div className="flex space-x-8 md:space-x-32 justify-center py-2 items-center bg-white">
        <h1>{customer.name}</h1>
        {customer.approved && (
          <button
            className="px-6 py-3 shadow-md text-white bg-green-400"
            onClick={() => setOpen((open) => !open)}
          >
            Add Payment
          </button>
        )}
        {!customer.approved && (
          <button className="px-6 py-3 shadow-md text-white bg-green-400">
            Approve
          </button>
        )}
      </div>
      <div
        className={`${
          open ? "flex" : "hidden"
        } justify-center py-2 px-2 items-center bg-white`}
      >
        <label className="p-2 flex items-center justify-between space-x-5">
          <span>Amount: </span>
          <input
            type="number"
            placeholder="100"
            className="border rounded form-input shadow ring-green-400 px-4 py-3 w-full mt-1 outline-none focus:ring"
          />
        </label>
        <input
          type="submit"
          value="Add"
          className="border rounded py-2 px-5 mt-1 bg-green-400 text-white cursor-pointer"
        />
      </div>
    </div>
  );
}

export default Customer;
