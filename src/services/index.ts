import { deleteVerb, get, getWithQuery, post, put, UserFilter } from "../utils";

export const getLocations = async () => {
  const res = await get("users/locations");
  return res.data.locations;
};

export const postLocation = async (location: string) => {
  const res = await post("users/locations", { location });
  return res.data;
};

export const editLocation = async (oldLoc: string, newLoc: string) => {
  const res = await put(`users/locations?oldLoc=${oldLoc}&newLoc=${newLoc}`);
  return res.data;
};

export const deleteLocation = async (location: string) => {
  const res = await deleteVerb(`users/locations?location=${location}`);
  return res.data;
};

export const renewPackage = async (customerId: string) => {
  const customer = await getCustomer(customerId);
  const res = await post(
    `users/renew?customerId=${customerId}&packageName=${customer.packageNames[0]}`
  );
  return res.data;
};

export const changePackage = async (customerId: string, newPkg: string) => {
  const customer = await getCustomer(customerId);
  const res = await post(
    `users/change?customerId=${customerId}&oldPkg=${customer.packageNames[0]}&newPkg=${newPkg}`
  );
  return res.data;
};

export const deleteCustomerS = async (customerId: string) => {
  const res = await deleteVerb(`users/delete?customerId=${customerId}`);
  return res.data;
};

export const deleteAdmin = async (agentCode: string) => {
  const res = await deleteVerb(`super/admins?agentCode=${agentCode}`);
  return res.data;
};

export const getCustomer = async (customerId: string) => {
  const res = await getWithQuery("users/get", { customerId });
  return res.data.user;
};

export const getPackages = async () => {
  const res = await get("users/packages");
  return res.data.packages;
};

export const getCustomers = async (filter: any) => {
  const res = await getWithQuery("users/customers", filter);
  return res.data;
};

export const getSuperDailyHistory = async (day: string) => {
  const res = await getWithQuery("super/history", { day });
  return res.data.data;
};

export const postPayment = async (data: any) => {
  const res = await post("payments/create", data);
  return res.data;
};

export const postDelivery = async (customerId: string) => {
  const res = await post(`super/deliver?customerId=${customerId}`);
  return res.data;
};

export const postAdmin = async (data: any) => {
  const res = await post("super/create", data);
  return res.data;
};

export const postCustomer = async (data: any) => {
  const res = await post("auth/create", data);
  return res.data;
};

export const getCustomerDeliveryHistory = async () => {
  const res = await get("users/delivery/history");
  return res.data;
};

export const getPayments = async () => {
  const res = await get("users/payments");
  return res.data;
};

export const getAdmins = async (filter: any) => {
  const res = await getWithQuery("super/admins", filter);
  return res.data;
};

export const getAdminsByName = async (name: string) => {
  const res = await getWithQuery("super/admins", { name });
  return res.data;
};

export const getAdminByCode = async (agentCode: any) => {
  const res = await getWithQuery("super/admin", { agentCode });
  return res.data.user;
};
