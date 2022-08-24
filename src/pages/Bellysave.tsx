import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getBellysaveCollections, getBellysavePayments } from "../services";
import { useAppSelector } from "../store/hooks";
import { LinkRoutes, Payment } from "../utils";

function Bellysave() {
  const [payments, setPayments] = useState<Payment[]>(null!);
  const [sum, setSum] = useState(0);
  const [histories, setHistories] = useState<any[]>(null!);
  const user = useAppSelector((state) => state.users.user);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const n = toast.loading("Getting payments");
      try {
        const data = await getBellysavePayments();
        console.log(data);
        setPayments(data.payments);
        setSum(
          data.payments.reduce(
            (total: number, curr: any) => total + curr.amount,
            0
          )
        );

        const data2 = await getBellysaveCollections();
        console.log(data2);
        setHistories(data.histories);
        toast.success("Got payments!", {
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
    })();
  }, []);

  return (
    <div>
      <h1 className="font-bold text-2xl lg:text-3xl text-center py-2 mt-5">
        Welcome, {user?.name}
      </h1>
      <div className="mb-8 flex flex-col max-w-5xl mx-auto items-center mt-3 px-2 md:px-0">
        <h1 className="text-2xl">Bellysave Payment History</h1>
        <div className="mt-2">
          <p>Total amount saved: {sum}</p>
          <p>Bank Name: {user?.bankName}</p>
          <p>Account Number: {user?.accountNumber}</p>
        </div>
        <table className="text-center mx-auto mt-5">
          <thead>
            <tr className="">
              <th className="bg-green-400 px-2 py-2 sm:px-6">Amount Paid</th>
              <th className="bg-green-400 px-2 md:px-6">Date</th>
            </tr>
          </thead>
          <tbody>
            {payments?.map((payment) => (
              <tr key={payment._id}>
                <td>{payment.amount}</td>
                <td className="py-1">
                  {new Date(payment.createdAt).toDateString()}{" "}
                  {new Date(payment.createdAt).toLocaleTimeString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col max-w-5xl mx-auto items-center mt-3 px-2 md:px-0">
        <h1 className="text-2xl">Collection History</h1>
        <table className="text-center mx-auto mt-5">
          <thead>
            <tr className="">
              <th className="bg-green-400 px-2 py-2 sm:px-6">
                Amount Collected
              </th>
              <th className="bg-green-400 px-2 md:px-6">Date</th>
            </tr>
          </thead>
          <tbody>
            {histories?.map((collection) => (
              <tr key={collection._id}>
                <td>{collection.amountPaid}</td>
                <td className="py-1">
                  {new Date(collection.date).toDateString()}{" "}
                  {new Date(collection.date).toLocaleTimeString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Bellysave;
