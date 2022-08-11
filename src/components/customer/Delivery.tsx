import React, { useEffect } from "react";
import { useAppSelector } from "../../store/hooks";
import { History } from "../../utils";

interface Props {
  history: History;
}

function Delivery({ history }: Props) {
  const { user } = useAppSelector((state) => state.users);
  useEffect(() => {
    // (async () => {
    // })()
  }, []);

  return (
    <div className="flex space-x-10 w-full">
      <div className="">
        <p>Package(s) Ordered: </p>
        <p>Total Price</p>
      </div>
      <div>
        <p>{user?.packageNames?.map((p) => p)}</p>
        <p>{user?.totalPrice}</p>
      </div>
    </div>
  );
}

export default Delivery;
