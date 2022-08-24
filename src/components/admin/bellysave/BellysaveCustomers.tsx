import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getBellysaveCustomers } from "../../../services";
import { LinkRoutes } from "../../../utils";
import Collected from "./Collected";
import Paying from "./Paying";

function BellysaveCustomers() {
  const [filtering, setFiltering] = useState({ paying: true });
  const navigate = useNavigate();

  useEffect(() => {}, []);
  return (
    <div className="flex flex-col px-2">
      <div className="flex">
        <select
          className="flex-1 py-2 px-2 rounded-md"
          defaultValue={"Paying"}
          onChange={async (e) => {
            switch (e.target.value) {
              case "Paying":
                setFiltering({ paying: true });
                break;
              case "Collected":
                setFiltering({ paying: false });
            }
          }}
        >
          <option value={"Paying"}>Paying</option>
          <option value="Collected">Collected</option>
        </select>
      </div>
      <div>{filtering.paying ? <Paying /> : <Collected />}</div>
    </div>
  );
}

export default BellysaveCustomers;
