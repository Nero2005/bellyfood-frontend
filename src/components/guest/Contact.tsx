import React from "react";

function Contact() {
  return (
    <div
      id="contact"
      className="bg-gray-200 relative py-8 flex flex-col items-center my-20"
    >
      <h1 className="text-3xl font-semibold mb-5 text-green-500">Contact us</h1>
      <span className="text-sm absolute right-5 text-red-500">RC-3376531</span>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 items-center">
        <div className="py-2">
          <h2 className="text-xl font-semibold pb-2">Head Office</h2>
          <p>
            Suite 17, Petrocam Plaza, Elf Bus Stop, Lekki-Epe Expressway, Lekki,
            Lagos
          </p>
        </div>
        <div className="py-2">
          <h2 className="text-xl font-semibold pb-2">Branch</h2>
          <p>14 Aliu Imam Street Off Obafemi Taiwo, Ikorodu, Lagos</p>
        </div>
        <div className="py-2">
          <h2 className="text-xl font-semibold pb-2">Branch</h2>
          <p>7 Sewage Road, Jakande Estate, Isolo, Lagos</p>
        </div>
        <div className="py-2">
          <h2 className="text-xl font-semibold pb-2">Branch</h2>
          <p>
            Block 4, Plot 2, Old Mami Market, Beside Unity Bank, Idi Ape Iwo
            Road, Ibadan
          </p>
        </div>
        <div className="py-2">
          <h2 className="text-xl font-semibold pb-2">Branch</h2>
          <p>ORILE BRANCH Line 1, Section C, Ifesowapo complex Orile Doyin</p>
        </div>
        <div className="py-2">
          <h2 className="text-xl font-semibold pb-2">Customer Service Line</h2>
          <p>For enquiry or complaint, call: 08053634000 or 07082223332</p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
