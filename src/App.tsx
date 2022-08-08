import React, { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useCookies } from "react-cookie";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { useAppDispatch, useAppSelector } from "./store/hooks";
// import Unauthorized from "./pages/Unauthorized";
import { setUser } from "./store/userReducer";
import { get } from "./utils/api";
// import logo from "./logo.svg";
// import "./index.css";

function App() {
  const [cookies] = useCookies();
  const user = useAppSelector((state) => state.users.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const updateUser = async () => {
      try {
        if (isAuthenticated()) {
          const res = await get("users/me");
          console.log(res.data.user);
          dispatch(setUser(res.data.user));
        }
      } catch (err: any) {
        console.log(err.status);
        console.log(err.message);
        console.log(err.msg);
        console.log(err);
      }
    };
    updateUser().then().catch();
  }, []);
  const isAuthenticated = () => {
    return cookies.bellyfood ? true : false;
  };

  const isAdmin = () => {
    console.log([1, 2, 4].some((v) => v == 2));
    return user?.roles.includes("ADMIN");
  };

  const isSuperAdmin = () => {
    return user?.roles.includes("SUPERADMIN");
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route
            path="/home"
            element={<Home isAuthenticated={isAuthenticated} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
