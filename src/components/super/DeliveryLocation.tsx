import React, { useEffect, useState } from "react";
import { getCustomers } from "../../services";
import { UserState } from "../../store/userReducer";
import Customer from "../admin/Customer";

function DeliveryLocation({ location }: { location: string }) {
  const [customers, setCustomers] = useState<UserState[]>(null!);

  useEffect(() => {
    (async () => {
      setCustomers(
        await getCustomers({
          approved: true,
          paid: true,
          delivered: false,
          location,
        })
      );
    })();
  }, []);

  return (
    <div className="flex flex-col items-center w-full space-y-3">
      {customers?.length > 0 && (
        <h1 className="text-2xl font-semibold">{location}</h1>
      )}
      {customers?.map((customer) => (
        <Customer
          setCustomers={setCustomers}
          key={customer._id}
          customer={customer}
        />
      ))}
    </div>
  );
}

export default DeliveryLocation;
