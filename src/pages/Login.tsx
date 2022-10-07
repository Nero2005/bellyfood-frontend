import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faEyeSlash, faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Header from "../components/guest/Header";
import { LinkRoutes, post } from "../utils";

interface FormData {
  phone: string;
  password: string;
  service: string;
}

interface Props {
  dashboard: () => string;
}

function Login({ dashboard }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>();
  const [errorMessage, setErrorMessage] = useState("");
  const [service, setService] = useState("bellyfood");
  const [icon, setIcon] = useState<IconProp>(faEyeSlash);

  useEffect(() => {}, []);

  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (formData) => {
    try {
      let phone = watch("phone");
      if (phone.charAt(0) === "0") {
        phone = phone.slice(1);
      }
      formData.phone = `+234${phone}`;
      const res = await post("auth/login", { ...formData, service });
      console.log(res.data);
      navigate(LinkRoutes.DASHBOARD);
      window.location.reload();
    } catch (err: any) {
      const { status, msg } = err;
      if (status === 405)
        setErrorMessage("Not allowed to login! Please contact OGA");
      else if (status !== 200) setErrorMessage(msg);
      console.log(err);
    }
  });

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-semibold mt-5 text-center">Login</h1>

      <form
        className="flex flex-col mt-10 p-5 max-w-2xl mx-auto"
        onSubmit={onSubmit}
      >
        <label className="p-2">
          <span>Service: </span>
          <select
            className="block border rounded shadow ring-green-400 px-4 py-3 w-full mt-1 outline-none focus:ring"
            {...register("service")}
            defaultValue="bellyfood"
            onChange={(e) => setService(e.target.value)}
          >
            <option className="" value="bellyfood">
              Bellyfood
            </option>
            <option className="" value="bellysave">
              Bellysave
            </option>
          </select>
        </label>
        <label className="p-2">
          <span>Phone: </span>
          <input
            {...register("phone", { required: true })}
            type="tel"
            placeholder="08134567890"
            className="block border rounded form-input shadow ring-green-400 px-4 py-3 w-full mt-1 outline-none focus:ring"
          />
        </label>
        <label className="p-2 relative">
          <span>Password: </span>
          <input
            id="password"
            {...register("password", { required: true })}
            type="password"
            placeholder="Enter password"
            className="w-full border rounded form-input shadow ring-green-400 px-4 py-3 mt-1 outline-none focus:ring"
          />
          <FontAwesomeIcon
            onClick={() => {
              const password = document.getElementById("password");
              const type =
                password!.getAttribute("type") === "password"
                  ? "text"
                  : "password";
              password!.setAttribute("type", type);
              setIcon((prev) => (prev === faEyeSlash ? faEye : faEyeSlash));
            }}
            icon={icon}
            className="w-6 h-6 absolute right-4 top-12 cursor-pointer"
            id="icon"
          />
        </label>

        {(Object.keys(errors).length > 0 || errorMessage) && (
          <div className="space-y-2 p-2 text-red-500">
            {errors.phone?.type === "required" && (
              <p> - Phone number is required</p>
            )}
            {errors.password?.type === "required" && (
              <p> - Password is required</p>
            )}
            {errorMessage && <p>- {errorMessage}</p>}
          </div>
        )}

        <input
          type="submit"
          value="Login"
          className="w-full border rounded py-2 mt-5 bg-green-400 text-white cursor-pointer"
        />
      </form>
    </div>
  );
}

export default Login;
