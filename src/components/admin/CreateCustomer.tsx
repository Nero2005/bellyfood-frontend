import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { get, Package, post } from "../../utils";

interface FormData {
  phone: string;
  password: string;
  name: string;
  gender: string;
  location: string;
  packageNames: string;
  priceModifier: number;
}

interface Props {
  isAdmin?: boolean;
}

function CreateCustomer({ isAdmin }: Props) {
  const user = useAppSelector((state) => state.users.user);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormData>();
  const [errorMessage, setErrorMessage] = useState("");
  const [locations, setLocations] = useState<string[]>(null!);
  const [packages, setPackages] = useState<Package[]>(null!);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await get("users/locations");
        const { data } = await get("users/packages");
        console.log(res.data);
        console.log(data);
        setLocations(res.data.locations);
        setPackages(data.packages);
      } catch (err: any) {
        const { status, msg } = err;
        if (status !== 200) setErrorMessage(msg);
        console.log(err);
      }
    })();
  }, []);

  const onSubmit = handleSubmit(async (formData) => {
    try {
      const data = {
        phone: watch("phone"),
        password: watch("password"),
        name: watch("name"),
        gender: watch("gender"),
        location: watch("location") ? watch("location") : "Ikorodu",
        packageNames: [watch("packageNames") ? watch("packageNames") : "NANO"],
        priceModifier: parseInt(watch("priceModifier").toString()),
      };
      console.log(data);

      const res = await post("auth/create", formData);
      console.log(res.data);
      if (isAdmin) {
        const { data: data2 } = await post(
          `users/approve?customerId=${res.data.newCustomer._id}&agentCode=${user?.agentCode}`
        );
      }

      // navigate(LinkRoutes.DASHBOARD);
      // window.location.reload();
    } catch (err: any) {
      const { status, msg } = err;
      if (status !== 200) setErrorMessage(msg);
      console.log(err);
    } finally {
      // reset();
    }
  });

  return (
    <div className="flex-1 md:mt-1 px-2">
      {/* <h1 className="text-3xl font-semibold mt-5 text-center">Create Admin</h1> */}
      <h1 className="text-2xl font-semibold text-center mt-2">
        Create Customer
      </h1>

      <form
        className="flex flex-col mt-4 p-5 max-w-2xl mx-auto"
        onSubmit={onSubmit}
      >
        <input type="hidden" {...register("priceModifier")} value="1" />
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
            {...register("gender")}
            defaultValue="F"
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
          <span>Location: </span>
          <select
            className="block border rounded shadow ring-green-400 px-4 py-3 w-full mt-1 outline-none focus:ring"
            {...register("location")}
            defaultValue={`${locations?.slice(0, 1)[0]}`}
          >
            {locations?.map((location) => (
              <option value={`${location}`} key={location}>
                {location}
              </option>
            ))}
          </select>
        </label>

        <label className="p-2">
          <span>Package: </span>
          <select
            className="block border rounded shadow ring-green-400 px-4 py-3 w-full mt-1 outline-none focus:ring"
            {...register("packageNames")}
            defaultValue={`${packages?.slice(0, 1)[0]}`}
          >
            {packages?.map((pkg) => (
              <option value={`${pkg.name}`} key={pkg.name}>
                Name: {pkg.name}, Price: {pkg.price}
              </option>
            ))}
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
          value="Create Customer"
          className="w-full border rounded py-2 mt-5 bg-green-400 text-white cursor-pointer"
        />
      </form>
    </div>
  );
}

export default CreateCustomer;
