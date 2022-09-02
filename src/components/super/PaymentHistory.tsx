import { CheckIcon, PencilIcon } from "@heroicons/react/solid";
import React, { SetStateAction, useEffect, useRef, useState } from "react";
import { editPayment, getAdminByCode, getCustomer } from "../../services";
import { useAppSelector } from "../../store/hooks";
import { HistoryItem } from "../../utils";

interface Props {
  historyItem: HistoryItem;
  setSave?: (value: SetStateAction<boolean>) => void;
  index: number;
}

function PaymentHistory({ historyItem, setSave, index }: Props) {
  const user = useAppSelector((state) => state.users.user);
  const adminNameRef = useRef<any>(null!);
  const agentNameRef = useRef<any>(null!);
  const customerNameRef = useRef<any>(null!);
  const [editable, setEditable] = useState("");
  const [editingAmount, setEditingAmount] = useState(0);

  useEffect(() => {
    (async () => {
      let agentDetails;
      if (user?.roles.includes("SUPERADMIN")) {
        agentDetails = await getAdminByCode(historyItem.agentCode);
      } else {
        agentDetails = user;
      }
      console.log(historyItem);

      const customerDetails = await getCustomer(
        historyItem.customerId || historyItem.bellysave
      );
      historyItem.agentName = agentDetails.name;
      historyItem.customerName = customerDetails.name;
      if (agentNameRef && customerNameRef && adminNameRef) {
        adminNameRef.current.innerHTML = agentDetails.name;
        agentNameRef.current.innerHTML = customerDetails.agentName;
        customerNameRef.current.innerHTML = customerDetails.name;
      }
    })();
  }, [historyItem]);

  return (
    <tr className="border border-gray-500 text-sm">
      <td className="border border-gray-500 mx-1 px-1">{index}</td>
      <td className="border border-gray-500" ref={adminNameRef}>
        {historyItem.agentName}
      </td>
      <td className="border border-gray-500" ref={agentNameRef}></td>
      <td className="border border-gray-500">{historyItem.location}</td>
      <td className="border border-gray-500" ref={customerNameRef}>
        {historyItem.customerName}
      </td>
      <td className="py-3 border-collapse flex space-x-3 items-center">
        {editable === historyItem._id ? (
          <input
            type="text"
            className="w-12"
            defaultValue={historyItem.amountPaid}
            onChange={(e) => setEditingAmount(parseInt(e.target.value))}
          />
        ) : (
          <span>{historyItem.amountPaid}</span>
        )}
        {user?.roles.includes("SUPERADMIN") &&
          (editable === historyItem._id ? (
            <CheckIcon
              className="text-green-600 w-6 h-6 cursor-pointer"
              onClick={async () => {
                setEditable("");
                setEditingAmount(0);
                editPayment(historyItem._id, editingAmount);
                if (setSave) {
                  setSave((prev) => !prev);
                }
              }}
            />
          ) : (
            <PencilIcon
              className="text-gray-400 w-6 h-6 cursor-pointer"
              onClick={async () => {
                setEditable(historyItem._id);
              }}
            />
          ))}
      </td>
    </tr>
  );
}

export default PaymentHistory;
