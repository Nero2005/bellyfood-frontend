import React, { useEffect } from "react";
import { useAppSelector } from "../../store/hooks";
import { HistoryItem } from "../../utils";

interface Props {
  history: HistoryItem;
}

function Delivery({ history }: Props) {
  const { user } = useAppSelector((state) => state.users);
  useEffect(() => {}, []);

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
