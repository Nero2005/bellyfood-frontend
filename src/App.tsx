import React, { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// import { useCookies } from "react-cookie";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { setUser, UserState } from "./store/userReducer";
import { get } from "./utils/api";
import { LinkRoutes } from "./utils";
import Login from "./pages/Login";
import Customer from "./pages/customer";
import Admin from "./pages/admin";
import Unauthorized from "./pages/Unauthorized";
import Super from "./pages/super";
// import logo from "./logo.svg";
// import "./index.css";

function App() {
  // const [cookies] = useCookies();
  const user = useAppSelector((state) => state.users.user);
  const dispatch = useAppDispatch();

  const updateUser = async () => {
    try {
      const res = await get("users/me");
      console.log(res.data.user);
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
    if (isCustomer()) return LinkRoutes.CUSTOMER;
    else if (isAdmin()) return LinkRoutes.ADMIN;
    else if (isSuperAdmin()) return LinkRoutes.SUPER;
    return LinkRoutes.LOGIN;
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path={LinkRoutes.BASE}
            element={<Navigate to={LinkRoutes.HOME} />}
          />
          <Route
            path={LinkRoutes.HOME}
            element={<Home isAuthenticated={isAuthenticated} />}
          />
          <Route
            path={LinkRoutes.LOGIN}
            element={
              !isAuthenticated() ? <Login /> : <Navigate to={dashboard()} />
            }
          />
          <Route
            path={LinkRoutes.DASHBOARD}
            element={<Navigate to={dashboard()} />}
          />
          <Route
            path={LinkRoutes.CUSTOMER}
            element={
              isAuthenticated() ? (
                isCustomer() ? (
                  <Customer />
                ) : (
                  <Navigate to={LinkRoutes.UNAUTHORIZED} />
                )
              ) : (
                <Navigate to={LinkRoutes.LOGIN} />
              )
            }
          />
          <Route
            path={LinkRoutes.ADMIN}
            element={
              isAuthenticated() ? (
                isAdmin() ? (
                  <Admin />
                ) : (
                  <Navigate to={LinkRoutes.UNAUTHORIZED} />
                )
              ) : (
                <Navigate to={LinkRoutes.LOGIN} />
              )
            }
          />
          <Route
            path={LinkRoutes.SUPER}
            element={
              isAuthenticated() ? (
                isSuperAdmin() ? (
                  <Super />
                ) : (
                  <Navigate to={LinkRoutes.UNAUTHORIZED} />
                )
              ) : (
                <Navigate to={LinkRoutes.LOGIN} />
              )
            }
          />
          <Route
            path="/unauthorized"
            element={<Unauthorized dashboard={dashboard} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
