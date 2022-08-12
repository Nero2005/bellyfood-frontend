import { get, getWithQuery, UserFilter } from "../utils";

export const getLocations = async () => {
  const res = await get("users/locations");
  return res.data.locations;
};

export const getPackages = async () => {
  const res = await get("users/packages");
  return res.data.packages;
};

export const getCustomers = async (filter: UserFilter) => {
  const res = await getWithQuery("users/customers", filter);
  return res.data.users;
};

export const getSuperDailyHistory = async (day: string) => {
  const res = await getWithQuery("super/history", { day });
  return res.data.data;
};
