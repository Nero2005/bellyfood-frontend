import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { postAdmin } from "../../services";
import { LinkRoutes, post } from "../../utils";

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

  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (formData) => {
    const n = toast.loading("Adding admin");
    try {
      console.log(formData);
      const data = {
        phone: watch("phone"),
        password: watch("password"),
        name: watch("name"),
        gender: watch("gender"),
      };
      console.log(data);

      // const res = await post("super/create", data);
      const data2 = await postAdmin(data);
      console.log(data2);

      // navigate(LinkRoutes.DASHBOARD);
      // window.location.reload();
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
      {/* <h1 className="text-3xl font-semibold mt-5 text-center">Create Admin</h1> */}
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

        <label className="p-2">
          <span>Password: </span>
          <input
            {...register("password", { required: true })}
            type="password"
            placeholder="Enter password"
            className="block border rounded form-input shadow ring-green-400 px-4 py-3 w-full mt-1 outline-none focus:ring"
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
            {errors.name?.type === "required" && <p> - Phone is required</p>}
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
