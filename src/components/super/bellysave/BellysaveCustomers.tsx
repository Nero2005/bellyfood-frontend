import React, { useState } from "react";
import Collected from "../../admin/bellysave/Collected";
import Paying from "../../admin/bellysave/Paying";
import All from "./All";
import Collecting from "./Collecting";

function BellysaveCustomers() {
  const [filter, setFilter] = useState("All");

  return (
    <div className="flex flex-col px-2">
      <div className="flex">
        <select
          className="flex-1 py-2 px-2 rounded-md"
          defaultValue={filter}
          onChange={async (e) => {
            setFilter(e.target.value);
          }}
        >
          <option value={"All"}>All</option>
          <option value={"Paying"}>Paying</option>
          <option value={"Collecting"}>Collecting</option>
          <option value={"Collected"}>Collected</option>
        </select>
      </div>
      <div>{filter === "All" && <All />}</div>
      <div>{filter === "Paying" && <Paying />}</div>
      <div>{filter === "Collected" && <Collected />}</div>
      <div>{filter === "Collecting" && <Collecting />}</div>
    </div>
  );
}

export default BellysaveCustomers;
