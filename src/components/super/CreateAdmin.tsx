import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { postAdmin } from "../../services";
import { LinkRoutes, post } from "../../utils";
import { faEyeSlash, faEye } from "@fortawesome/free-regular-svg-icons";

interface FormData {
  phone: string;
  password: string;
  name: string;
  gender: string;
}

function CreateAdmin() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormData>();
  const [errorMessage, setErrorMessage] = useState("");
  const [icon, setIcon] = useState<IconProp>(faEyeSlash);

  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (formData) => {
    const n = toast.loading("Adding admin");
    try {
      console.log(formData);
      let phone = watch("phone");
      if (phone.charAt(0) === "0") {
        phone = phone.slice(1);
      }
      const data = {
        phone: `+234${phone}`,
        password: watch("password"),
        name: watch("name"),
        gender: watch("gender"),
      };
      console.log(data);

      const data2 = await postAdmin(data);
      console.log(data2);
      toast.success("Admin created successfully!", { id: n });
      setErrorMessage("");
    } catch (err: any) {
      const { status, msg } = err;
      if (status !== 200) setErrorMessage(msg);
      console.log(err);
      toast.error(`Error creating admin: ${msg}`, { id: n });
    } finally {
      reset();
    }
  });

  return (
    <div className="flex-1 md:mt-1 px-2">
      <h1 className="text-2xl font-semibold text-center mt-2">Create Admin</h1>

      <form
        className="flex flex-col mt-4 p-5 max-w-2xl mx-auto"
        onSubmit={onSubmit}
      >
        <label className="p-2">
          <span>Phone: </span>
          <input
            {...register("phone", { required: true })}
            type="tel"
            placeholder="+2348134567890"
            className="block border rounded form-input shadow ring-green-400 px-4 py-3 w-full mt-1 outline-none focus:ring"
          />
        </label>
        <label className="p-2">
          <span>Name: </span>
          <input
            {...register("name", { required: true })}
            type="text"
            placeholder="Enter name"
            className="block border rounded form-input shadow ring-green-400 px-4 py-3 w-full mt-1 outline-none focus:ring"
          />
        </label>
        <label className="p-2">
          <span>Gender: </span>
          <select
            className="block border rounded shadow ring-green-400 px-4 py-3 w-full mt-1 outline-none focus:ring"
            {...register("gender", { required: true })}
          >
            <option className="" value="F">
              F
            </option>
            <option className="" value="M">
              M
            </option>
          </select>
        </label>

        <label className="p-2 relative">
          <span>Password: </span>
          <input
            id="password"
            {...register("password", { required: true })}
            type="password"
            placeholder="Enter password"
            className="block border rounded form-input shadow ring-green-400 px-4 py-3 w-full mt-1 outline-none focus:ring"
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
            {errors.name?.type === "required" && <p> - Name is required</p>}
            {errors.gender?.type === "required" && <p> - Gender is required</p>}
            {errorMessage && <p>- {errorMessage}</p>}
          </div>
        )}

        <input
          type="submit"
          value="Create Admin"
          className="w-full border rounded py-2 mt-5 bg-green-400 text-white cursor-pointer"
        />
      </form>
    </div>
  );
}

export default CreateAdmin;
