// agentCode: 2390;
// amount: 4000;
// createdAt: "2022-08-09T16:34:09.659Z";
// customerId: "62ed5a07e76721dd90fe5a74";
// date: "2022-08-09T14:46:51.014Z";
// location: "Ikorodu";
// packageNames: ["NANO"];
// updatedAt: "2022-08-09T16:34:09.659Z";
// __v: 0;

import { PackageName } from "../store/userReducer";

// _id: "62f28c81a77993fa92efa835";
export interface Payment {
  agentCode: string | number;
  amount: number;
  createdAt: string;
  customerId: string;
  date: string;
  location: string;
  packageNames: PackageName[];
  updatedAt: string;
  _id: string;
}

export type Page =
  | "PENDING_PAYMENTS"
  | "PENDING_APPROVAL"
  | "DASHBOARD"
  | "CUSTOMER_HISTORY"
  | "CUSTOMER_PROFILE";
