import React from "react";
import CompletedDeliveries from "../../components/admin/CompletedDeliveries";
import CreateCustomer from "../../components/admin/CreateCustomer";
import PendingApproval from "../../components/admin/PendingApproval";
import Header from "../../components/guest/Header";
import Admins from "../../components/super/Admins";
import CreateAdmin from "../../components/super/CreateAdmin";
import Dashboard from "../../components/super/Dashboard";
import PendingDeliveries from "../../components/super/PendingDeliveries";
import SuperMenu from "../../components/super/SuperMenu";
import { useAppSelector } from "../../store/hooks";
import DailyHistory from "../../components/super/DailyHistory";
import Histories from "../../components/super/Histories";

interface Props {
  dashboard: () => string;
}

function Super({ dashboard }: Props) {
  const page = useAppSelector((state) => state.users.page);

  const loadPage = () => {
    switch (page) {
      case "DASHBOARD":
        return <Dashboard />;
      case "PENDING_APPROVAL":
        return <PendingApproval />;
      case "ADMINS":
        return <Admins />;
      case "PENDING_DELIVERIES":
        return <PendingDeliveries />;
      case "COMPLETED_DELIVERIES":
        return <CompletedDeliveries />;
      case "CREATE_ADMIN":
        return <CreateAdmin />;
      case "CREATE_CUSTOMER":
        return <CreateCustomer isAdmin />;
      case "HISTORY":
        return <Histories />;
    }
  };

  return (
    <div>
      <Header isAuthenticated={() => true} dashboard={dashboard} />

      <div className="flex flex-col space-y-7 max-w-5xl mx-auto">
        <SuperMenu />

        {loadPage()}
      </div>
    </div>
  );
}

export default Super;
