import React, { useState } from "react";
// import { useAppDispatch, useAppSelector } from "../store/hooks";
import { UserState } from "../store/userReducer";

import "./Home.css";
import Header from "../components/guest/Header";
import Welcome from "../components/guest/Welcome";
import BasketModal from "../components/guest/BasketModal";
import Baskets from "../components/guest/Baskets";
import CompareBaskets from "../components/guest/CompareBaskets";
import Footer from "../components/guest/Footer";

export const newUser: UserState = {
  _id: "1",
  name: "Nero",
  gender: "M",
  phone: "2",
  roles: ["SUPERADMIN", "ADMIN"],
  agentCode: "1234",
  location: "Ikorodu",
  approved: true,
  packageNames: ["NANO"],
  totalPrice: 0,
  amountPaid: 0,
  paid: false,
  delivered: false,
  date: new Date().toISOString(),
  lastLogin: new Date().toISOString(),
  lastPayment: new Date().toISOString(),
};

interface Props {
  isAuthenticated: () => boolean;
}

export interface Basket {
  name: string;
  open: boolean;
}
function Home({ isAuthenticated }: Props) {
  // const user = useAppSelector((state) => state.users.user);
  const [showModal, setShowModal] = useState<Basket>({ name: "", open: false });

  // const dispatch = useAppDispatch();
  const welcome =
    "Our primary goal is to make food as affordable as possible at wholesale prices through a monthly subscription service. " +
    "We work with local farmers, manufacturers and cooperatives to source the best quality produce for our subscribers." +
    "Your subscription will not only help you save money, but it will help another person or family fight hunger as well. With every box delivered to a subscriber, a food item gets donated to a person in need. ";

  // useEffect(() => {}, []);

  return (
    <div className="max-w-7xl mx-auto overflow-hidden">
      <Header />
      <Welcome welcome={welcome} />
      {showModal.open ? (
        <BasketModal setShowModal={setShowModal} name={showModal.name} />
      ) : null}

      <Baskets setShowModal={setShowModal} />

      <CompareBaskets />

      <Footer />
    </div>
  );
}

export default Home;
