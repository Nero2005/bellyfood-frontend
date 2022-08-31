import { CheckIcon, PencilIcon, TrashIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import { editCustomer } from "../../services";
import { UserState } from "../../store/userReducer";

interface Props {
  customer: UserState;
  loadCustomers?: (page: number, filter: any) => Promise<void>;
  timeAgo: any;
  index: number;
}

function SuperCustomer({ customer, loadCustomers, timeAgo, index }: Props) {
  const [editableN, setEditableN] = useState("");
  const [editableP, setEditableP] = useState("");
  const [editingName, setEditingName] = useState("");
  const [editingPhone, setEditingPhone] = useState("");
  useEffect(() => {}, []);

  return (
    <tr className="border border-gray-500">
      <td className="border border-gray-500 mx-1 px-1">{index}</td>
      <td className="border border-gray-500">
        {editableN === customer.name ? (
          <input
            type="text"
            className="w-40"
            defaultValue={customer.name}
            onChange={(e) => setEditingName(e.target.value)}
          />
        ) : (
          <span>{customer.name}</span>
        )}

        {editableN === customer.name ? (
          <CheckIcon
            className="text-green-600 w-6 h-6 cursor-pointer"
            onClick={async () => {
              setEditableN("");
              editCustomer(customer._id, {
                name: editingName || customer.name,
              });
              setEditingName("");
            }}
          />
        ) : (
          <PencilIcon
            className="text-gray-400 w-6 h-6 cursor-pointer"
            onClick={async () => {
              setEditableN(customer.name);
            }}
          />
        )}
      </td>

      <td className="border border-gray-500">
        {editableP === customer.phone ? (
          <input
            type="text"
            className="w-36"
            defaultValue={customer.phone}
            onChange={(e) => setEditingPhone(e.target.value)}
          />
        ) : (
          <span>{customer.phone}</span>
        )}

        {editableP === customer.phone ? (
          <CheckIcon
            className="text-green-600 w-6 h-6 cursor-pointer"
            onClick={async () => {
              setEditableP("");
              editCustomer(customer._id, {
                phone: editingPhone || customer.phone,
              });
              setEditingPhone("");
            }}
          />
        ) : (
          <PencilIcon
            className="text-gray-400 w-6 h-6 cursor-pointer"
            onClick={async () => {
              setEditableP(customer.phone);
            }}
          />
        )}
      </td>
      <td className="border border-gray-500">
        {new Date(customer.date!).toLocaleDateString()}
      </td>
      <td className="border border-gray-500">
        {customer.packageNames?.map((p) => p)}
      </td>
      <td className="border border-gray-500">{customer.amountPaid}</td>
      <td className="border border-gray-500">
        {customer.totalPrice - customer.amountPaid}
      </td>
    </tr>
  );
}

export default SuperCustomer;
