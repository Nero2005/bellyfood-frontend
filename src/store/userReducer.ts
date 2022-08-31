import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./index";
import { Page } from "../utils";

// Define a type for the slice state
export type PackageName = "NANO" | "MICRO" | "MEGA" | "GIGA" | "OGA NA BOSS";
export interface UserState {
  _id: string;
  name: string;
  gender: string;
  phone: string;
  roles: string[];
  agentCode: string;
  agentName?: string;
  bankName?: string;
  accountNumber?: string;
  location?: string;
  approved: boolean;
  packageNames?: PackageName[];
  totalPrice: number;
  amountPaid: number;
  paid: boolean;
  delivered: boolean;
  date?: string;
  lastLogin?: string;
  lastPayment?: string;
  late: boolean;
}

interface State {
  user?: UserState;
  page: Page;
}

// Define the initial state using that type
const initialState: State = {
  page: "DASHBOARD",
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState | undefined>) => {
      // state = { ...state, ...action.payload };
      state.user = action.payload;
      // state._id = action.payload._id;
      // state.name = action.payload.name;
      // state.gender = action.payload.gender;
      // state.phone = action.payload.phone;
      // state.roles = action.payload.roles;
      // state.agentCode = action.payload.agentCode;
      // state.location = action.payload.location;
      // state.approved = action.payload.approved;
      // state.packageNames = action.payload.packageNames;
      // state.totalPrice = action.payload.totalPrice;
      // state.amountPaid = action.payload.amountPaid;
      // state.paid = action.payload.paid;
      // state.delivered = action.payload.delivered;
      // state.date = action.payload.date;
      // state.lastLogin = action.payload.lastLogin;
      // action.payload.lastPayment &&
      //   (state.lastPayment = action.payload.lastPayment);
    },
    setPage: (state, action: PayloadAction<Page>) => {
      state.page = action.payload;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    // 	state.value += action.payload;
    // }
  },
});

export const { setUser, setPage } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.users;

export default userSlice.reducer;
