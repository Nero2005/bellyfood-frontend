import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useAppSelector } from "../../store/hooks";
import { get, Payment } from "../../utils";

function Dashboard() {
  const ringRef = useRef<SVGCircleElement>(null!);
  const grayRef = useRef<SVGCircleElement>(null!);
  const textRef = useRef<HTMLSpanElement>(null!);
  const user = useAppSelector((state) => state.users.user);
  const [payments, setPayments] = useState<Payment[]>(null!);

  useEffect(() => {
    if (ringRef && textRef && grayRef) {
      console.log("Hello");
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
        const res = await get("users/payments");
        console.log(res.data);
        setPayments(res.data.payments);
        toast.success("Got payments!", {
          id: n,
        });
      } catch (err: any) {
        console.log(err);
        toast.error(`Error: ${err.msg}`, {
          id: n,
        });
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
        <div className="flex flex-1 justify-evenly items-center">
          <div className="text-lg">
            <p className="flex items-center">
              <FontAwesomeIcon
                icon={faCircle}
                className="w-4 h-4 mr-2 text-green-400"
              />
              {/* <InformationCircleIcon className="w-5 h-5 mr-2 text-green-400" />{" "} */}
              Total Price:
            </p>
            <p className="flex items-center">
              <FontAwesomeIcon
                icon={faCircle}
                className="w-4 h-4 mr-2 text-blue-300"
              />
              {/* <InformationCircleIcon className="w-5 h-5 mr-2 text-blue-300" />{" "} */}
              Amount paid:
            </p>
            <p className="flex items-center">
              <FontAwesomeIcon
                icon={faCircle}
                className="w-4 h-4 mr-2 text-red-400"
              />
              {/* <InformationCircleIcon className="w-5 h-5 mr-2 text-red-400" />{" "} */}
              Amount left:{" "}
            </p>
            <p className="flex items-center">
              <FontAwesomeIcon
                icon={faCircle}
                className="w-4 h-4 mr-2 text-orange-400"
              />
              Package Name
            </p>
            <p className="flex items-center">
              <FontAwesomeIcon
                icon={faCircle}
                className="w-4 h-4 mr-2 text-purple-400"
              />
              Delivered:{" "}
            </p>
          </div>
          <div className="font-semibold text-xl">
            <p>{user?.totalPrice}</p>
            <p>{user?.amountPaid}</p>
            <p>{user ? user?.totalPrice - user?.amountPaid : 0}</p>
            <p>{user?.packageNames?.map((p) => p)}</p>
            <p>{user?.delivered ? "Yes" : "No"}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col max-w-5xl mx-auto items-center mt-3 px-2 md:px-0">
        <h1 className="text-2xl">Payment History</h1>
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
    </div>
  );
}

export default Dashboard;
