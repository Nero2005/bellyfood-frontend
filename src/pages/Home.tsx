import React, { useState } from "react";
import { UserState } from "../store/userReducer";

import "./Home.css";
import Welcome from "../components/guest/Welcome";
import BasketModal from "../components/guest/BasketModal";
import Baskets from "../components/guest/Baskets";
import CompareBaskets from "../components/guest/CompareBaskets";
import Footer from "../components/guest/Footer";
import AboutImg from "../assets/images/aboutus.jpeg";
import Donate from "../components/guest/Donate";
import CreateCustomer from "../components/admin/CreateCustomer";
import Contact from "../components/guest/Contact";

interface Props {
  isAuthenticated: () => boolean;
  dashboard: () => string;
}

export interface Basket {
  name: string;
  open: boolean;
}
function Home({ isAuthenticated, dashboard }: Props) {
  const [showModal, setShowModal] = useState<Basket>({ name: "", open: false });
  const vision =
    "We want to help people see, understand and consume healthy food in all 36 states of Nigeria and Africa " +
    "in a totally new way. To us food isn’t just food. It’s sourced locally and free " +
    "from poisonous preservatives making it suitable for human consumption.";

  const mission =
    "We are on a mission to help people see, understand and consume food in a totally new way. " +
    "We want people to eat our food and feel amazing afterwards, and we want them to be surprised " +
    "by how delicious healthy food can be. Everything we serve is made by us, " +
    "we know where all our ingredients come from and we know how to cook them " +
    "to get the most out of them.";

  const about =
    "Rising prices of food items in Nigeria while income remains stagnant makes it difficult " +
    "for low to middle income earners to purchase foodstuff. Many staple food suppliers offer " +
    "home delivery service to customers using online channels. However, the low income " +
    "earners at the bottom of the pyramid do not have the financial ability to pay " +
    "for goods at once and so buy goods on credit or online. Bellyfood's offline/online " +
    "food subscription delivery service in Nigeria allows customers to pay for food items " +
    "on a subscription basis.";

  return (
    <div className="max-w-7xl mx-auto">
      <Welcome vision={vision} mission={mission} about={about} />

      <div className="px-10 py-5 mt-2 bg-white flex lg:flex-row flex-col lg:space-x-5 space-y-5 items-center">
        <div className="flex-shrink-0 max-w-lg">
          <img className="w-full" src={AboutImg} />
        </div>
        <div className="">
          <p className="leading-6 md:w-full">{about}</p>
        </div>
      </div>

      <Donate />

      {showModal.open ? (
        <BasketModal setShowModal={setShowModal} name={showModal.name} />
      ) : null}

      <Baskets setShowModal={setShowModal} />

      <CompareBaskets />

      <CreateCustomer />

      <Contact />

      <Footer />
    </div>
  );
}

export default Home;
