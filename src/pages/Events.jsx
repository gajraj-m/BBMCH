import React from "react";
import Background from "../assets/bg.png";
import Axon from "../assets/AXON.png";

const Events = () => {
  return (
    <div className="overflow-hidden">
      <div className="relative h-screen flex items-center justify-center">
        {/* Background image with red circle in bottom left corner */}
        <div className="mt-4 rounded-lg" data-aos="zoom-out">
          <img
            src={Background}
            alt=""
            className="w-screen rounded-lg opacity-60"
          />
          <div
            style={{
              width: "150px",
              height: "150px",
              background: "#9b1f53",
              borderRadius: "50%",
              position: "absolute",
              bottom: "19%",
              left: "-4%",
              transform: "translateY(-50%)", // Adjust for circle position
            }}
          />
        </div>

        <div className="absolute text-white text-center">
          <p className="my-4 text-4xl font-bold">BBMCH, Balangir</p>
          <p className="text-lg">PRESENTS</p>
          <div className="rounded-lg">
            <img src={Axon} alt="" className="w-1/2 rounded-lg mx-auto mt-8" />
          </div>
          <div className="flex flex-row w-2/3 justify-around mt-16 items-center mx-auto">
            <button className="w-1/4 bg-[#9b1f53] h-12 rounded-full">
              <div className="flex flex-row space-x-2 items-center mx-auto w-fit">
                <div className="bg-white h-3 w-3 rounded-full"></div>
                <p>Brochure</p>
              </div>
            </button>
            <button className="w-1/4 bg-[#9b1f53] h-12 rounded-full">
              {" "}
              <div className="flex flex-row space-x-2 items-center mx-auto w-fit">
                <div className="bg-white h-3 w-3 rounded-full"></div>
                <p>Register</p>
              </div>
            </button>
          </div>
        </div>

        {/* Red circle in bottom right corner */}
        <div
          style={{
            width: "150px",
            height: "150px",
            background: "#9b1f53",
            borderRadius: "50%",
            position: "absolute",
            bottom: "0",
            right: "-10%",
            transform: "translateY(-50%) translateX(-50%)", // Adjust for circle position
          }}
        />
      </div>
    </div>
  );
};

export default Events;
