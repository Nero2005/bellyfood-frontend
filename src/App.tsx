import React, { useEffect, useState } from "react";
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
import ReactPWAInstallProvider, { useReactPWAInstall } from "react-pwa-install";
import logo from "./logo.svg";
import Header from "./components/guest/Header";
import Bellysave from "./pages/Bellysave";
// import "./index.css";

function App() {
  // const [cookies] = useCookies();
  const user = useAppSelector((state) => state.users.user);
  const dispatch = useAppDispatch();
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState<any>(null);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      console.log("we are being triggered :D");
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("transitionend", handler);
  }, []);

  const handleClick = (e: any) => {
    e.preventDefault();
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
  };

  const updateUser = async () => {
    try {
      const res = await get("users/me");
      dispatch(setUser(res.data.user));
      return true;
    } catch (err: any) {
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
    if (user?.roles === undefined) {
      return LinkRoutes.BELLYSAVE;
    }
    return user?.roles.every((r: string) => r === "CUSTOMER");
  };

  const isAdmin = () => {
    if (user?.roles === undefined) {
      return LinkRoutes.BELLYSAVE;
    }
    return user?.roles.every((r: string) => r === "ADMIN");
  };

  const isSuperAdmin = () => {
    if (user?.roles === undefined) {
      return LinkRoutes.BELLYSAVE;
    }
    return user?.roles.includes("SUPERADMIN");
  };

  const dashboard = (): string => {
    if (!user) return LinkRoutes.LOGIN;
    else if (user.roles === undefined) {
      return LinkRoutes.BELLYSAVE;
    } else if (isCustomer()) {
      return LinkRoutes.CUSTOMER;
    } else if (isAdmin()) return LinkRoutes.ADMIN;
    else if (isSuperAdmin()) return LinkRoutes.SUPER;
    return LinkRoutes.LOGIN;
  };

  const authorize = (authorizeMethod: any, Component: any) => {
    if (isAuthenticated()) {
      if (authorizeMethod()) {
        return <Component dashboard={dashboard} />;
      } else {
        return <Navigate to={LinkRoutes.UNAUTHORIZED} />;
      }
    } else {
      return <Navigate to={LinkRoutes.LOGIN} />;
    }
  };

  const bellysaveAuth = (Component: any) => {
    if (isAuthenticated()) {
      if (user?.roles === undefined) {
        return <Component />;
      } else {
        return <Navigate to={LinkRoutes.UNAUTHORIZED} />;
      }
    } else {
      return <Navigate to={LinkRoutes.LOGIN} />;
    }
  };

  return (
    <ErrorBoundary dashboard={dashboard}>
      <div className="App bg-slate-100 h-screen overflow-y-scroll">
        <Toaster />
        <BrowserRouter>
          <Header isAuthenticated={isAuthenticated} dashboard={dashboard} />
          <div className="fixed top-4 right-14 z-50 lg:hidden">
            {supportsPWA && (
              <button
                type="button"
                className="bg-green-400 text-white px-3 py-2"
                onClick={handleClick}
              >
                Install App
              </button>
            )}
          </div>
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
            <Route path={LinkRoutes.BELLYSAVE} element={<Bellysave />} />
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
