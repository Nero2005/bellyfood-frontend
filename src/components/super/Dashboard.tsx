import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useAppSelector } from "../../store/hooks";
import { getWithQuery, post } from "../../utils";

function Dashboard() {
  const user = useAppSelector((state) => state.users.user);
  const countRef = useRef<HTMLSpanElement>(null!);
  const [location, setLocation] = useState("");

  useEffect(() => {
    countRef.current.innerHTML = `${0}`;
    console.log(location);
    (async () => {
      try {
        const res = await getWithQuery("users/customers", {
          approved: true,
          paid: true,
          delivered: false,
        });
        console.log(res.data.count);
        if (countRef) {
          countRef.current.innerHTML = res.data.count;
        }
      } catch (err: any) {
        console.log(err);
      }
    })();
  }, [location]);

  const addLocation = async () => {
    try {
      const res = await post("users/locations", { location });
      console.log(res.data);
      const n = toast.success(res.data.msg);
    } catch (err: any) {
      const n = toast.error(err.msg);
    } finally {
      setLocation("");
    }
  };

  return (
    <div className="flex flex-col flex-1 items-center">
      <h1 className="font-bold text-2xl lg:text-3xl text-center py-2">
        Welcome, {user?.name}
      </h1>
      <p className="text-xl">Click the buttons to switch navigation</p>
      <p>
        There are <span ref={countRef}></span> pending deliveries
      </p>
      <div className="my-7 w-full text-center p-4">
        <h1 className="text-xl py-2">New Location?</h1>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border rounded form-input shadow ring-green-400 px-4 py-3 mx-3 outline-none focus:ring"
        />
        <input
          type="submit"
          value="Add Location"
          onClick={() => addLocation()}
          className="bg-green-400 text-white px-3 py-2 cursor-pointer hover:px-5 hover:py-3 transform duration-200"
        />
      </div>
    </div>
  );
}

export default Dashboard;
