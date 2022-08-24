import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getPayments } from "../../services";
import { useAppSelector } from "../../store/hooks";
import { get, LinkRoutes, Payment } from "../../utils";

function Dashboard() {
  const ringRef = useRef<SVGCircleElement>(null!);
  const grayRef = useRef<SVGCircleElement>(null!);
  const textRef = useRef<HTMLSpanElement>(null!);
  const user = useAppSelector((state) => state.users.user);
  const [payments, setPayments] = useState<Payment[]>(null!);
  const navigate = useNavigate();

  useEffect(() => {
    if (ringRef && textRef && grayRef) {
      const circle = ringRef.current;
      const radius = circle.r.baseVal.value;
      const circumference = radius * 2 * Math.PI;
      circle.style.strokeDasharray = `${circumference} ${circumference}`;
      circle.style.strokeDashoffset = `${circumference}`;
      circle.style.strokeWidth = "4";
      const setProgress = (percent: number) => {
        const offset = circumference - (percent / 100) * circumference;
        circle.style.strokeDashoffset = `${offset}`;
      };
      const total = user!.totalPrice;
      const amount = user!.amountPaid;
      const per = Math.round((amount / total) * 100);
      setProgress(per);
      textRef.current.innerHTML = `${per}%`;
    }
    (async () => {
      const n = toast.loading("Getting payments");
      try {
        const data = await getPayments();
        setPayments(data.payments);
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
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h1 className="font-bold text-2xl lg:text-3xl text-center py-2 mt-5">
        Welcome, {user?.name}
      </h1>
      <div className="flex items-center md:space-x-5">
        <div className="relative text-center inline-flex justify-center py-3 px-2">
          <svg className="progress-ring" height="120" width="120">
            <circle
              ref={grayRef}
              className="text-gray-300"
              stroke-width="4"
              stroke="currentColor"
              fill="transparent"
              r="52"
              cx="60"
              cy="60"
            />
            <circle
              ref={ringRef}
              className="progress-ring__circle"
              stroke="blue"
              stroke-width="4"
              fill="transparent"
              r="52"
              cx="60"
              cy="60"
            />
          </svg>
          <span
            ref={textRef}
            className="absolute text-xl text-blue-900"
            style={{ left: "37%", top: "37%" }}
          ></span>
        </div>
        <div className="flex flex-1 justify-evenly items-center pr-4">
          <div className="text-md">
            <div className="flex items-center space-x-3">
              <div>
                <FontAwesomeIcon
                  icon={faCircle}
                  className="w-4 h-4 mr-2 text-green-400"
                />
                <span>Total Price:</span>
              </div>
              <p className="font-semibold">{user?.totalPrice}</p>
            </div>
            <div className="flex items-center space-x-3">
              <div>
                <FontAwesomeIcon
                  icon={faCircle}
                  className="w-4 h-4 mr-2 text-blue-700"
                />
                <span>Amount paid:</span>
              </div>
              <p className="font-semibold">{user?.amountPaid}</p>
            </div>
            <div className="flex items-center space-x-3">
              <div>
                <FontAwesomeIcon
                  icon={faCircle}
                  className="w-4 h-4 mr-2 text-gray-300"
                />
                <span>Amount left:</span>
              </div>
              <p className="font-semibold">
                {user ? user?.totalPrice - user?.amountPaid : 0}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div>
                <FontAwesomeIcon
                  icon={faCircle}
                  className="w-4 h-4 mr-2 text-orange-400"
                />
                <span>Package Name:</span>
              </div>
              <p className="font-semibold">
                {user?.packageNames?.map((p) => p)}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div>
                <FontAwesomeIcon
                  icon={faCircle}
                  className="w-4 h-4 mr-2 text-purple-400"
                />
                <span>Delivered:</span>
              </div>
              <p className="font-semibold">{user?.delivered ? "Yes" : "No"}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col max-w-5xl mx-auto items-center mt-3 px-2 md:px-0">
        <h1 className="text-2xl">Payment History</h1>
        <table className="text-center mx-auto mt-5 border border-gray-500">
          <thead>
            <tr className="">
              <th className="bg-green-400 px-2 py-2 sm:px-6 border border-gray-500">
                Amount Paid
              </th>
              <th className="bg-green-400 px-2 md:px-6 border border-gray-500">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {payments?.map((payment) => (
              <tr key={payment._id} className="border border-gray-500">
                <td className="border border-gray-500">{payment.amount}</td>
                <td className="py-1 border border-gray-500">
                  {new Date(payment.createdAt).toDateString()}{" "}
                  {new Date(payment.createdAt).toLocaleTimeString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
