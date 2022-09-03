import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { get, LinkRoutes, Package, post } from "../../utils";
import {
  getAdmins,
  getAgents,
  getLocations,
  getPackages,
  postBellysaveCustomer,
  postCustomer,
} from "../../services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-regular-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { UserState } from "../../store/userReducer";

interface FormData {
  phone: string;
  password: string;
  name: string;
  gender: string;
  location: string;
  packageNames: string;
  service: string;
  priceModifier: number;
  bankName: string;
  accountNumber: string;
}

interface Props {
  isAdmin?: boolean;
  isSuper?: boolean;
}

function CreateCustomer({ isAdmin, isSuper }: Props) {
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
  const [test, setTTest] = useState<any[]>([]);
  const [icon, setIcon] = useState<IconProp>(faEyeSlash);
  const [admins, setAdmins] = useState<UserState[]>(null!);
  const [agents, setAgents] = useState<any[]>();
  const [service, setService] = useState<string>("bellyfood");

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        setLocations(await getLocations());
        setPackages(await getPackages());
        const agents = await getAgents();
        console.log(agents);
        setAgents(agents);
        if (isSuper) {
          const data = await getAdmins({});
          setAdmins(data.users);
        }
      } catch (err: any) {
        if (err === "Unauthorized") {
          navigate(LinkRoutes.LOGIN);
          window.location.reload();
        }
        const { status, msg } = err;
        if (status !== 200) setErrorMessage(msg);
        console.log(err);
      }
    })();
  }, []);

  const onSubmit = handleSubmit(async (formData) => {
    const n = toast.loading("Adding customer");
    try {
      let data;
      let phone = watch("phone");
      if (phone.charAt(0) === "0") {
        phone = phone.slice(1);
      }
      if (service === "bellyfood") {
        data = {
          phone: `+234${phone}`,
          password: watch("password")
            ? watch("password")
            : `${agents?.slice(0, 1)[0].name}`,
          agentName: watch("password")
            ? watch("password")
            : `${agents?.slice(0, 1)[0].name}`,
          name: watch("name"),
          gender: watch("gender"),
          location: watch("location")
            ? watch("location")
            : `${locations?.slice(0, 1)[0]}`,
          packageNames: [
            watch("packageNames") ? watch("packageNames") : "NANO",
          ],
          priceModifier: parseInt(watch("priceModifier").toString()),
        };
        const data3 = await postCustomer(data);
        if (isAdmin) {
          await post(
            `users/approve?customerId=${data3.newCustomer._id}&agentCode=${user?.agentCode}`
          );
        }
      } else if (service === "bellysave") {
        data = {
          phone: `+234${phone}`,
          password: watch("password")
            ? watch("password")
            : `${agents?.slice(0, 1)[0].name}`,
          agentName: watch("password")
            ? watch("password")
            : `${agents?.slice(0, 1)[0].name}`,
          name: watch("name"),
          gender: watch("gender"),
          bankName: watch("bankName"),
          accountNumber: watch("accountNumber"),
          location: watch("location")
            ? watch("location")
            : `${locations?.slice(0, 1)[0]}`,
        };
        console.log(data);

        const data3 = await postBellysaveCustomer(data);
        if (isAdmin) {
          await post(
            `bellysave/approve?customerId=${data3.newCustomer._id}&agentCode=${user?.agentCode}`
          );
        }
      }

      // navigate(LinkRoutes.DASHBOARD);
      // window.location.reload();
      toast.success("Customer created successfully!", { id: n });
      setErrorMessage("");
    } catch (err: any) {
      const { status, msg } = err;
      if (status !== 200) setErrorMessage(msg);
      console.log(err);
      toast.error(`Error creating customer: ${msg}`, { id: n });
    } finally {
      reset();
      setService("bellyfood");
    }
  });

  return (
    <div className="flex-1 md:mt-1 px-2">
      <h1 className="text-2xl font-semibold text-center mt-2">
        Create Customer
      </h1>

      <form
        className="flex flex-col mt-4 p-5 max-w-2xl mx-auto"
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
        {service === "bellyfood" && (
          <input type="hidden" {...register("priceModifier")} value="1" />
        )}
        <label className="p-2">
          <span>Phone: </span>
          <input
            {...register("phone", { required: true })}
            type="tel"
            placeholder="08134567890"
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
        {service === "bellysave" && (
          <label className="p-2">
            <span>Bank Name: </span>
            <input
              {...register("bankName")}
              type="text"
              placeholder="Enter bank name"
              className="block border rounded form-input shadow ring-green-400 px-4 py-3 w-full mt-1 outline-none focus:ring"
            />
          </label>
        )}
        {service === "bellysave" && (
          <label className="p-2">
            <span>Account Number: </span>
            <input
              {...register("accountNumber")}
              type="text"
              placeholder="Enter account number"
              className="block border rounded form-input shadow ring-green-400 px-4 py-3 w-full mt-1 outline-none focus:ring"
            />
          </label>
        )}

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
        {locations && locations.length > 0 && (
          <label className="p-2">
            <span>Location: </span>
            <select
              className="block border rounded shadow ring-green-400 px-4 py-3 w-full mt-1 outline-none focus:ring"
              {...register("location")}
              defaultValue={`${locations ? locations[0] : ""}`}
            >
              {locations?.map((location) => (
                <option value={`${location}`} key={location}>
                  {location}
                </option>
              ))}
            </select>
          </label>
        )}
        {agents && agents.length > 0 && (
          <label className="p-2">
            <span>Agent: </span>
            <select
              className="block border rounded shadow ring-green-400 px-4 py-3 w-full mt-1 outline-none focus:ring"
              {...register("password")}
              defaultValue={`${agents ? agents[0].name : ""}`}
            >
              {agents?.map((agent: any) => (
                <option value={`${agent.name}`} key={agent._id}>
                  {agent.name}
                </option>
              ))}
            </select>
          </label>
        )}
        {service === "bellyfood" && (
          <label className="p-2">
            <span>Package: </span>
            <select
              className="block border rounded shadow ring-green-400 px-4 py-3 w-full mt-1 outline-none focus:ring"
              {...register("packageNames")}
              defaultValue={`${packages ? packages[0] : ""}`}
            >
              {packages?.map((pkg) => (
                <option value={`${pkg.name}`} key={pkg.name}>
                  Name: {pkg.name}, Price: {pkg.price}
                </option>
              ))}
            </select>
          </label>
        )}
        {/* <label className="p-2">
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
        </label> */}
        {(Object.keys(errors).length > 0 || errorMessage) && (
          <div className="space-y-2 p-2 text-red-500">
            {errors.phone?.type === "required" && (
              <p> - Phone number is required</p>
            )}
            {/* {errors.password?.type === "required" && (
              <p> - Password is required</p>
            )} */}
            {errors.name?.type === "required" && <p> - Name is required</p>}
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
