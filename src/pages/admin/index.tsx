import React, { useEffect } from "react";
import AdminMenu from "../../components/admin/AdminMenu";
import Dashboard from "../../components/admin/Dashboard";
import PendingApproval from "../../components/admin/PendingApproval";
import PendingPayments from "../../components/admin/PendingPayments";
import Header from "../../components/guest/Header";
import { useAppSelector } from "../../store/hooks";

interface Props {
  dashboard: () => string;
}

export type Page = "PENDING_PAYMENTS" | "PENDING_APPROVAL" | "DASHBOARD";

function Admin({ dashboard }: Props) {
  const page = useAppSelector((state) => state.users.page);
  // const dispatch = useAppDispatch();
  // const [page, setPage] = useState<Page>("PENDING_PAYMENTS");
  const loadPage = () => {
    switch (page) {
      case "PENDING_PAYMENTS":
        return <PendingPayments />;
      case "PENDING_APPROVAL":
        return <PendingApproval />;
      case "DASHBOARD":
        return <Dashboard />;
    }
  };

  useEffect(() => {}, [page]);
  return (
    <div>
      <Header isAuthenticated={() => true} dashboard={dashboard} />
      <div className="flex flex-col md:flex-row space-y-10 md:space-x-2 h-screen">
        <AdminMenu />

        {loadPage()}
      </div>
    </div>
  );
}

export default Admin;
