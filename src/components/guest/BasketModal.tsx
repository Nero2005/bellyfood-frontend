import { XIcon } from "@heroicons/react/solid";
import React, { SetStateAction } from "react";
import { Basket } from "../../pages/Home";
// <XIcon className="w-6 h-6 text-black" />
interface Props {
  setShowModal: (value: SetStateAction<Basket>) => void;
  name: string;
}
function BasketModal({ setShowModal, name }: Props) {
  const bronzeContent = [
    "1 BUCKET OF RICE",
    "1 BUCKET OF BEANS",
    "1 BUCKET OF GARRI",
    "5 SACHETS OF VEGETABLE OIL (75ML)",
    "2 PACKETS OF SPAGHETTI",
    "350G OF POWDERED MILK",
    "1 PACKET OF MAGGI CHICKEN CUBES (108G)",
    "1KG OF SEMOVITA",
    "5 SATCHETS OF PEPPER",
  ];
  const silverContent = [
    "2 BUCKETS OF RICE",
    "1 BUCKET OF BEANS",
    "2 BUCKETS OF GARRI",
    "5 SACHETS OF VEGETABLE OIL (75ML)",
    "5 PACKETS OF SPAGHETTI",
    "400G OF POWDERED MILK",
    "500G TIN OF MILO BEVERAGE",
    "1KG OF SEMOVITA",
    "1 PACKET OF POUNDED YAM (0.9KG)",
    "1 BOTTLE OF OIL (75CL)",
  ];
  const goldContent = [
    "3 BUCKETS OF RICE",
    "1.5 BUCKETS OF BEANS",
    "2 BUCKETS OF WHITE/YELLOW GARRI",
    "2KG SEMOVITA",
    "1KG OF WHEAT",
    "1 BOTTLES OF VEGETABLE OIL (75CL)",
    "1 PACKET OF POUNDED YAM (0.9KG)",
    "1 CARTON NOODLES",
    "500G MILO TIN",
    "400G MILK TIN",
    "5 PACKETS OF SPAGHETTI",
    "1 PACKET OF KNORR CUBES",
    "1 TIN TOMATO (800G)",
  ];
  const diamondContent = [
    "5 BUCKETS OF RICE",
    "1.5 BUCKETS OF BEANS",
    "4 BUCKETS OF WHITE/YELLOW GARRI",
    "2 PACKETS OF POUNDED YAM (0.9KG)",
    "3KG SEMOVITA",
    "5 LTR VEGETABLE OIL",
    "3KG OF MILLED WHEAT",
    "1 TIN OF MILO (500G)",
    "1 TIN OF POWDERED MILK (400G)",
    "1 LARGE TOMATO PASTE",
    "5 PACKET OF KNORR CUBES",
    "1 PACKET OF CORNFLAKES (500G)",
    "1 PACKET OF GOLDEN MORN (500G)",
    "5 PACKETS OF SPAGHETTI",
    "1 TIN OF CUSTARD (2KG)",
    "1 CARTON OF INDOMIE NOODLES",
  ];
  const platinumContent = [
    "50KG BAG OF RICE",
    "2 BUCKETS OF BEANS",
    "3KG SEMOVITA",
    "3KG OF MILLED WHEAT",
    "3 PACKETS OF POUNDEd YAM (0.9KG)",
    "2 BUCKETS OF YELLOW GARRI",
    "2 BUCKETS OF WHITE GARRI",
    "5 PACKETS OF SPAGHETTI",
    "5 LTR VEGETABLE OIL",
    "1 MILO PACKET (450G)",
    "1 MILK PACKET (350G)",
    "1 LARGE TOMATO PASTE TIN",
    "1 PACKET CORN FLAKES (500G)",
    "1 PACKET GOLDEN MORN (500G)",
    "1 CARTON NOODLES",
    "2.5KG BUCKET OF CUSTARD",
    "2 PACKETS OF GRANULATED SUGAR (500G)",
    "5 PACKETS OF MAGGI CUBES",
  ];

  const baskets = [
    {
      name: "NANO",
      content: bronzeContent,
    },
    {
      name: "MICRO",
      content: silverContent,
    },
    {
      name: "MEGA",
      content: goldContent,
    },
    {
      name: "GIGA",
      content: diamondContent,
    },
    {
      name: "OGA NA BOSS",
      content: platinumContent,
    },
  ];
  // console.log(baskets[0].content);
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto scrollbar-hide fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">{name}</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() =>
                  setShowModal((modal) => ({ ...modal, open: false }))
                }
              >
                <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                  <XIcon className="w-6 h-6 text-black" />
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              {/* <p className="my-3 text-slate-500 text-sm leading-relaxed"> */}
              <ul className="list-none my-3 text-slate-500 text-sm leading-relaxed">
                {baskets
                  .find((b) => b.name === name)
                  ?.content.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
              </ul>
              {/* </p> */}
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() =>
                  setShowModal((modal) => ({ ...modal, open: false }))
                }
              >
                Close
              </button>
              {/* <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() =>
                  setShowModal((modal) => ({ ...modal, open: false }))
                }
              >
                Save Changes
              </button> */}
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

export default BasketModal;
