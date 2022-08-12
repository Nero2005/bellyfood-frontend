import React, { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// import { useCookies } from "react-cookie";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { setUser } from "./store/userReducer";
import { get } from "./utils/api";
import { LinkRoutes } from "./utils";
import Login from "./pages/Login";
import Customer from "./pages/customer";
import Admin from "./pages/admin";
import Unauthorized from "./pages/Unauthorized";
import Super from "./pages/super";
import { Toaster } from "react-hot-toast";
import ErrorBoundary from "./ErrorBoundary";
// import logo from "./logo.svg";
// import "./index.css";

function App() {
  // const [cookies] = useCookies();
  const user = useAppSelector((state) => state.users.user);
  const dispatch = useAppDispatch();

  const updateUser = async () => {
    try {
      const res = await get("users/me");
      console.log(res.data);
      // console.log(res.data.msg);
      // const { date, lastLogin, lastPayment } = res.data.user;

      dispatch(setUser(res.data.user));
      console.log(isAuthenticated());
      return true;
    } catch (err: any) {
      console.log(err.message);
      console.log(err.status);
      console.log(err.msg);
      console.log(err);
      return false;
    }
  };
  useEffect(() => {
    updateUser().then().catch();
    // eslint-disable-next-line
  }, []);
  const isAuthenticated = () => {
    return user ? true : false;
  };

  const isCustomer = () => {
    return user?.roles.every((r: string) => r === "CUSTOMER");
  };

  const isAdmin = () => {
    return user?.roles.every((r: string) => r === "ADMIN");
  };

  const isSuperAdmin = () => {
    return user?.roles.includes("SUPERADMIN");
  };

  const dashboard = (): string => {
    if (!user) return LinkRoutes.LOGIN;
    if (isCustomer()) {
      console.log("customer");
      return LinkRoutes.CUSTOMER;
    } else if (isAdmin()) return LinkRoutes.ADMIN;
    else if (isSuperAdmin()) return LinkRoutes.SUPER;
    return LinkRoutes.LOGIN;
  };

  const authorize = (authorizeMethod: any, Component: any) => {
    if (isAuthenticated()) {
      if (authorizeMethod()) {
        console.log("Authorized");
        return <Component dashboard={dashboard} />;
      } else {
        return <Navigate to={LinkRoutes.UNAUTHORIZED} />;
      }
    } else {
      console.log("Login");
      return <Navigate to={LinkRoutes.LOGIN} />;
    }
  };

  return (
    <ErrorBoundary dashboard={dashboard}>
      <div className="App bg-slate-100 h-screen overflow-y-scroll">
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route
              path={LinkRoutes.BASE}
              element={<Navigate to={LinkRoutes.HOME} />}
            />
            <Route
              path={LinkRoutes.HOME}
              element={
                <Home isAuthenticated={isAuthenticated} dashboard={dashboard} />
              }
            />
            <Route
              path={LinkRoutes.LOGIN}
              element={
                !isAuthenticated() ? (
                  <Login dashboard={dashboard} />
                ) : (
                  <Navigate to={dashboard()} />
                )
              }
            />
            <Route
              path={LinkRoutes.DASHBOARD}
              element={<Navigate to={dashboard()} />}
            />
            <Route
              path={LinkRoutes.CUSTOMER}
              element={authorize(isCustomer, Customer)}
            />
            <Route
              path={LinkRoutes.ADMIN}
              element={authorize(isAdmin, Admin)}
            />
            <Route
              path={LinkRoutes.SUPER}
              element={authorize(isSuperAdmin, Super)}
            />
            <Route
              path="/unauthorized"
              element={<Unauthorized dashboard={dashboard} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ErrorBoundary>
  );
}

export default App;
