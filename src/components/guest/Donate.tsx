import { faHandHoldingDollar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import DonateImg from "../../assets/images/donate.jpeg";

function Donate() {
  /**
   * A series of students found that neurons in the portion of the brain associated with a sense of satisfaction start firing when a person chooses to donate money. These results are a fascinating reminder of the intrinsic motivation that many people share to make the world a better place. Millions feel frustrated, alone, forgotten and stuck in a hopeless situation, donating to the world’s poorest families can help them eventually leave behind hunger, fear, and isolation.  The longterm goal is for them to put food on the table, pay their bills and follow a path out of a generational cycle of poverty.  
       A plethora of options exist today for ordinary people with a little bit of extra means to help the poor:Donating our old clothes,giving alms,sharing our foodstuff with the less privileges or starting up a low scale business for them as a means of survival.
     At Bellyfood, we are so encouraged if you want to donate to the poor or somehow make a meaningful impact on those living in abject poverty as the popular saying goes “We rise by lifting others”.
   */
  const p1 =
    "A series of students found that neurons in the portion of the brain associated with a sense of " +
    "satisfaction start firing when a person chooses to donate money. These results are a fascinating reminder " +
    "of the intrinsic motivation that many people share to make the world a better place. Millions feel " +
    "frustrated, alone, forgotten and stuck in a hopeless situation, donating to the world’s poorest " +
    "families can help them eventually leave behind hunger, fear, and isolation.  The longterm goal is " +
    "for them to put food on the table, pay their bills and follow a path out of a generational cycle of poverty.";
  const p2 =
    "A plethora of options exist today for ordinary people with a little bit of extra means to help the poor: " +
    "Donating our old clothes,giving alms,sharing our foodstuff with the less privileges or starting up a " +
    "low scale business for them as a means of survival.";
  const p3 =
    "At Bellyfood, we are so encouraged if you want to donate to the poor or somehow make a meaningful " +
    "impact on those living in abject poverty as the popular saying goes “We rise by lifting others”.";
  return (
    <div
      id="donate"
      className="bg-white space-y-10 px-8 flex flex-col md:px-10 overflow-hidden mt-16 rounded-md py-5 items-center my-32"
    >
      <div className="max-w-xl">
        <img src={DonateImg} className="w-full" />
      </div>
      <div className="flex flex-col space-y-5 items-center">
        <p>{p1}</p>
        <p>{p2}</p>
        <p>{p3}</p>
      </div>
      <div className="flex flex-col items-center space-y-3">
        <p className="text-lg">Donate</p>
        <a
          href="https://wa.me/2347082223332?text=I'm%20interested%20in%20donating%20a%20package"
          target="_blank"
        >
          <FontAwesomeIcon
            icon={faHandHoldingDollar}
            className="w-10 h-10 text-green-500 cursor-pointer"
          />
        </a>
      </div>
    </div>
  );
}

export default Donate;
