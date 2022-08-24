import React, { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getCustomers } from "../../services";
import { useAppSelector } from "../../store/hooks";
import { getWithQuery, LinkRoutes } from "../../utils";

function Dashboard() {
  const user = useAppSelector((state) => state.users.user);
  const countRef = useRef<HTMLSpanElement>(null!);
  const navigate = useNavigate();

  useEffect(() => {
    countRef.current.innerHTML = `${0}`;
    const n = toast.loading("Loading");
    (async () => {
      try {
        const data = await getCustomers({ approved: false });
        if (countRef) {
          countRef.current.innerHTML = data.count;
          toast.success("Success", { id: n });
        }
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
    <div className="flex flex-col flex-1 items-center">
      <h1 className="font-bold text-2xl lg:text-3xl text-center py-2">
        Welcome, {user?.name}
      </h1>
      <p className="text-xl">Click the buttons to switch navigation</p>
      <p>
        There are <span ref={countRef}></span> customers pending approval
      </p>
    </div>
  );
}

export default Dashboard;
