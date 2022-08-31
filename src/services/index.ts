import {
  AddReport,
  deleteVerb,
  get,
  getWithQuery,
  post,
  put,
  UserFilter,
} from "../utils";

export const getLocations = async () => {
  const res = await get("users/locations");
  return res.data.locations;
};

export const getAgents = async () => {
  const res = await get("users/agents");
  return res.data.agents;
};

export const postLocation = async (location: string) => {
  const res = await post("users/locations", { location });
  return res.data;
};

export const postAgent = async (name: string) => {
  const res = await post("users/agents", { name });
  return res.data;
};

export const editLocation = async (oldLoc: string, newLoc: string) => {
  const res = await put(`users/locations?oldLoc=${oldLoc}&newLoc=${newLoc}`);
  return res.data;
};

export const editAgent = async (agentId: string, name: string) => {
  const res = await put(`users/agents?agentId=${agentId}&name=${name}`);
  return res.data;
};

export const deleteLocation = async (location: string) => {
  const res = await deleteVerb(`users/locations?location=${location}`);
  return res.data;
};

export const deleteAgent = async (agentId: string) => {
  const res = await deleteVerb(`users/agents?agentId=${agentId}`);
  return res.data;
};

export const renewPackage = async (customerId: string) => {
  const customer = await getCustomer(customerId);
  const res = await post(
    `users/renew?customerId=${customerId}&packageName=${customer.packageNames[0]}`
  );
  return res.data;
};

export const renewBellysaveCustomer = async (customerId: string) => {
  const res = await post(`bellysave/renew?customerId=${customerId}`);
  return res.data;
};

export const payBellysaveCustomer = async (customerId: string) => {
  const res = await post(`bellysave/pay?customerId=${customerId}`);
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

export const disableAdmin = async (adminId: string) => {
  const res = await post(`super/admin/disable?adminId=${adminId}`);
  return res.data;
};

export const enableAdmin = async (adminId: string) => {
  const res = await post(`super/admin/enable?adminId=${adminId}`);
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

export const getSuperDailyHistory = async (day: string, service: string) => {
  const res = await getWithQuery("super/history", { day, service });
  return res.data.data;
};

export const editPayment = async (historyId: string, amountPaid: number) => {
  const res = await put(
    `super/payments?historyId=${historyId}&amountPaid=${amountPaid}`
  );
  return res.data;
};

export const getAdminDailyHistory = async (
  day: string,
  agentCode: any,
  service: string
) => {
  const res = await getWithQuery("users/history", { day, agentCode, service });
  return res.data.data;
};

export const postPayment = async (data: any) => {
  const res = await post("payments/create", data);
  return res.data;
};

export const postBellysavePayment = async (data: any) => {
  const res = await post("bellysave/payments", data);
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

export const editCustomer = async (customerId: string, updatedFields: any) => {
  const res = await put(
    `super/customers?customerId=${customerId}`,
    updatedFields
  );
  return res.data;
};

export const editBellysaveCustomer = async (
  customerId: string,
  updatedFields: any
) => {
  const res = await put(
    `bellysave/customers?customerId=${customerId}`,
    updatedFields
  );
  return res.data;
};

export const postBellysaveCustomer = async (data: any) => {
  const res = await post("bellysave/customers", data);
  return res.data;
};

export const getBellysaveCustomers = async (filter: any) => {
  const res = await getWithQuery("bellysave/customers", filter);
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

export const getBellysavePayments = async () => {
  const res = await get("bellysave/payments");
  return res.data;
};

export const getBellysaveCollections = async () => {
  const res = await get("bellysave/collection/history");
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

export const postReport = async (data: AddReport) => {
  const res = await post("users/reports", data);
  return res.data;
};

export const getReports = async (filter: any) => {
  const res = await getWithQuery("users/reports", filter);
  return res.data;
};

export const changeAdminPassword = async (
  adminId: string,
  password: string
) => {
  const res = await put(`super/admins/password?adminId=${adminId}`, {
    password,
  });
  return res.data;
};

export const changeAgentCustomers = async (
  oldAgent: string,
  newAgent: string
) => {
  const res = await put(
    `super/agents/customers?oldAgent=${oldAgent}&newAgent=${newAgent}`
  );
  return res.data;
};
