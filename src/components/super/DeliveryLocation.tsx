import { RefreshIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import { getCustomers } from "../../services";
import { UserState } from "../../store/userReducer";
import Customer from "../admin/Customer";

function DeliveryLocation({ location }: { location: string }) {
  const [customers, setCustomers] = useState<UserState[]>(null!);
  const loadDeliveryLocation = async () => {
    const data = await getCustomers({
      approved: true,
      paid: true,
      delivered: false,
      location,
    });
    setCustomers(data.users);
  };

  useEffect(() => {
    (async () => {
      await loadDeliveryLocation();
    })();
  }, []);

  return (
    <div className="flex flex-col items-center w-full space-y-3">
      {customers?.length > 0 && (
        <h1 className="text-2xl font-semibold">{location}</h1>
      )}
      <RefreshIcon
        className="w-6 h-6 fixed top-44 z-50 right-10 cursor-pointer"
        onClick={async () => await loadDeliveryLocation()}
      />
      {customers?.map((customer) => (
        <Customer
          loadFunc={loadDeliveryLocation}
          setCustomers={setCustomers}
          key={customer._id}
          customer={customer}
        />
      ))}
    </div>
  );
}

export default DeliveryLocation;
