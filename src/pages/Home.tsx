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
  dashboard: () => string;
}

export interface Basket {
  name: string;
  open: boolean;
}
function Home({ isAuthenticated, dashboard }: Props) {
  // const user = useAppSelector((state) => state.users.user);
  const [showModal, setShowModal] = useState<Basket>({ name: "", open: false });

  // const dispatch = useAppDispatch();
  // We want to help people see, understand and consume health food at 36 state in Nigeria and Africa in a totally new way. To us food isn’t just food. Is to source it locally free from poisonous preservatives for human consumption and wellbeing
  const vision =
    "We want to help people see, understand and consume health food at 36 state in Nigeria and Africa " +
    "in a totally new way. To us food isn’t just food. Is to source it locally free " +
    "from poisonous preservatives for human consumption and wellbeing.";

  const mission =
    "We are on a mission to help people see,understand and consume food in a totally new way. " +
    "We want people to eat our food and feel amazing afterwards, and we want them to be surprise " +
    "by how delicious healthy food can we. Everything we serve is made by us ; " +
    "we know where all our ingredients come from and we know how to cook them " +
    "to get the most out of them, both in term";

  const about =
    "Rising prices of food items in Nigeria while income remains constant makes it difficult " +
    "for low to middle income earners to purchase foodstuff. Many staple food suppliers offer " +
    "home delivery service to customers using online channels. However, the low income " +
    "earners at the bottom of the pyramid do not have the financial capability to pay " +
    "for goods at once and so buy goods on credit or online. Bellyfood's offline/online " +
    "food subscription delivery service in Nigeria allows customers to pay for food items " +
    "on a subscription basis.";

  // useEffect(() => {}, []);

  return (
    <div className="max-w-7xl mx-auto">
      <Header isAuthenticated={isAuthenticated} dashboard={dashboard} />
      <Welcome vision={vision} mission={mission} about={about} />

      <div className="px-10 py-2 mt-2 bg-white">
        <h1 className="font-thin text-5xl text-center mb-5" id="about">
          About Us
        </h1>
        <p className="leading-6 md:w-full">{about}</p>
      </div>
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
