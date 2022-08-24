import React, { useEffect } from "react";
import Header from "../components/guest/Header";
// import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface Props {
  dashboard: () => string;
}

function Unauthorized({ dashboard }: Props) {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(dashboard());
  });

  return <div>Unauthorized</div>;
}

export default Unauthorized;
