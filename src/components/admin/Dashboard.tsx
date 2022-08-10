import React, { useEffect, useRef } from "react";
import { useAppSelector } from "../../store/hooks";
import { getWithQuery } from "../../utils";

function Dashboard() {
  const user = useAppSelector((state) => state.users.user);
  const countRef = useRef<HTMLSpanElement>(null!);

  useEffect(() => {
    (async () => {
      try {
        const res = await getWithQuery("users/customers", { approved: false });
        console.log(res.data.count);
        if (countRef) {
          countRef.current.innerHTML = res.data.count;
        }
      } catch (err: any) {
        console.log(err);
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
