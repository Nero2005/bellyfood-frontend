import { XIcon } from "@heroicons/react/solid";
import React, { SetStateAction } from "react";
import { Basket } from "../../pages/Home";
interface Props {
  setShowModal: (value: SetStateAction<Basket>) => void;
  name: string;
}
function BasketModal({ setShowModal, name }: Props) {
  const nano = [
    "1 BUCKET OF RICE",
    "1 BUCKET OF BEANS",
    "1 BUCKET OF GARRI",
    "2 PACKS OF SPAGHETTI",
    "1KG OF SEMOVITA",
    "2 SACHETS OF VEGETABLE OIL",
    "1 ROLL OF MILO",
    "1 ROLL OF MILK",
    "1 SACHET OF TOMATO PASTE",
  ];
  const micro = [
    "2 BUCKETS OF RICE",
    "1 BUCKET OF BEANS",
    "2 BUCKETS OF GARRI",
    "3 PACKS OF SPAGHETTI",
    "1KG OF SEMOVITA",
    "1KG OF WHEAT",
    "75CL OF VEGETABLE OIL",
    "1 REFILL SACHET OF MILO",
    "1 REFILL SACHET OF MILK",
    "1 PACK OF MAGGI CHICKEN CUBES",
    "2 SACHETS OF TOMATO PASTE",
  ];
  const mega = [
    "3 BUCKETS OF RICE",
    "2 BUCKETS OF BEANS",
    "2 BUCKETS OF GARRI",
    "4 PACKS OF SPAGHETTI",
    "1KG OF SEMOVITA",
    "1KG OF WHEAT",
    "1/2 CARTON OF NOODLES",
    "75CL OF VEGETABLE OIL x2",
    "1 REFILL SACHET OF MILO",
    "1 REFILL SACHET OF MILK",
    "2 PACKS OF MAGGI CHICKEN CUBES",
    "2 SACHETS OF SUGAR",
    "3 SACHETS OF TOMATO PASTE",
  ];
  const giga = [
    "1 BAG OF RICE",
    "2 BUCKETS OF BEANS",
    "3 BUCKETS OF GARRI",
    "1KG OF POUNDED YAM",
    "5 PACKS OF SPAGHETTI",
    "1KG OF SEMOVITA",
    "2KG OF WHEAT",
    "1 CARTON OF NOODLES",
    "3LTR OF VEGETABLE OIL",
    "1 REFILL SACHET OF MILO",
    "2 REFILL SACHET OF MILK",
    "400G OF GOLDEN MORN",
    "3 PACKS OF MAGGI CHICKEN CUBES",
    "400G OF CORN FLAKES",
    "400G OF CUSTARD",
    "3 SACHETS OF SUGAR",
    "3 SACHETS OF TOMATO PASTE",
  ];
  const oga = [
    "1 BAG OF RICE",
    "3 BUCKETS OF BEANS",
    "4 BUCKETS OF GARRI",
    "1KG OF POUNDED YAM",
    "1 CARTON OF SPAGHETTI",
    "5KG OF SEMOVITA",
    "5KG OF WHEAT",
    "1 CARTON OF NOODLES",
    "4LTR OF VEGETABLE OIL",
    "2 REFILL SACHET OF MILO",
    "2 REFILL SACHET OF MILK",
    "1KG OF GOLDEN MORN",
    "4 PACKS OF MAGGI CHICKEN CUBES",
    "1KG OF CORN FLAKES",
    "1KG OF CUSTARD",
    "4 SACHETS OF SUGAR",
    "8 SACHETS OF TOMATO PASTE",
  ];

  const baskets = [
    {
      name: "NANO",
      content: nano,
    },
    {
      name: "MICRO",
      content: micro,
    },
    {
      name: "MEGA",
      content: mega,
    },
    {
      name: "GIGA",
      content: giga,
    },
    {
      name: "OGA NA BOSS",
      content: oga,
    },
  ];
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto scrollbar-hide fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
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
            <div className="relative p-6 flex-auto">
              <ul className="list-none my-3 text-slate-500 text-sm leading-relaxed">
                {baskets
                  .find((b) => b.name === name)
                  ?.content.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
              </ul>
            </div>
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
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

export default BasketModal;
