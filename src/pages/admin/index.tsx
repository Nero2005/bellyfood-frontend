import React, { useEffect } from "react";
import AdminHistory from "../../components/admin/AdminHistory";
import AdminMenu from "../../components/admin/AdminMenu";
import BellysaveCustomers from "../../components/admin/bellysave/BellysaveCustomers";
import CompletedDeliveries from "../../components/admin/CompletedDeliveries";
import CreateCustomer from "../../components/admin/CreateCustomer";
import Dashboard from "../../components/admin/Dashboard";
import PendingApproval from "../../components/admin/PendingApproval";
import PendingPayments from "../../components/admin/PendingPayments";
import { useAppSelector } from "../../store/hooks";

interface Props {
  dashboard: () => string;
}

function Admin({ dashboard }: Props) {
  const page = useAppSelector((state) => state.users.page);
  const loadPage = () => {
    switch (page) {
      case "PENDING_PAYMENTS":
        return <PendingPayments />;
      case "PENDING_APPROVAL":
        return <PendingApproval />;
      case "COMPLETED_DELIVERIES":
        return <CompletedDeliveries />;
      case "DASHBOARD":
        return <Dashboard />;
      case "CREATE_CUSTOMER":
        return <CreateCustomer isAdmin />;
      case "ADMIN_HISTORY":
        return <AdminHistory />;
      case "BELLYSAVE_ADMIN":
        return <BellysaveCustomers />;
    }
  };

  useEffect(() => {}, [page]);
  return (
    <div>
      <div className="flex flex-col space-y-7 max-w-5xl mx-auto">
        <AdminMenu />

        {loadPage()}
      </div>
    </div>
  );
}

export default Admin;
