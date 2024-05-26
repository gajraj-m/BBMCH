import React, { useEffect, useState } from "react";
import Background from "../assets/bg.png";
import Axon from "../assets/AXON.png";
import {
  collection,
  addDoc,
  getDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { storage, firebase, db } from "../config/firebase";

const Events = () => {
  const [brochureLink, setBrochureLink] = useState("");
  const [registerLink, setRegisterLink] = useState("");

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const dataRef = doc(db, "data", "constants"); // Reference to the specific document
        const docSnap = await getDoc(dataRef);

        if (docSnap.exists) {
          const data = docSnap.data();
          setBrochureLink(data.brochure)
          setRegisterLink(data.register)
        } else {
          console.log("No document found!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    // Call the function to fetch blog posts
    fetchEventData();
  }, []);

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
            <button
              className="w-1/4 bg-[#9b1f53] h-12 rounded-full hover:scale-105 duration-150"
              onClick={() =>
                window.open(brochureLink, "_blank", "noopener,noreferrer")
              }
            >
              <div className="flex flex-row space-x-2 items-center mx-auto w-fit">
                <div className="bg-white h-3 w-3 rounded-full"></div>
                <p>Brochure</p>
              </div>
            </button>
            <button
              className="w-1/4 bg-[#9b1f53] h-12 rounded-full hover:scale-105 duration-150"
              onClick={() =>
                window.open(registerLink, "_blank", "noopener,noreferrer")
              }
            >
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

      {/* something about the event */}
      <div className="relative flex items-center justify-center">
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
          <p className="my-4 text-4xl font-bold">ABOUT AXON&apos;24</p>
          <p className="text-lg">June 27-30</p>
          <div className="flex flex-row w-2/3 justify-around mt-8 items-center mx-auto">
            <p>
              Axon at BBMCH is not just an event, it&apos;s a symphony of
              passion and dedication, where the vibrant energy of every student
              brings the campus to life. It&apos;s a celebration of talent,
              creativity, and the unyielding spirit of our student body. With
              each student pouring their heart and soul into the fest, Axon
              becomes a pulsating force that electrifies the atmosphere and
              leaves an indelible mark on everyone who experiences it. Let the
              symphony of passion and dedication at Axon ignite your soul.
            </p>
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
