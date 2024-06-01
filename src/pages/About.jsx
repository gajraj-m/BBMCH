import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import { Button } from "@/components/ui/button";
import { collection, addDoc, getDoc, updateDoc, doc } from "firebase/firestore";
import { storage, firebase, db } from "../config/firebase";

const About = () => {
  const [link, setLink] = useState("");

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const dataRef = doc(db, "data", "constants"); // Reference to the specific document
        const docSnap = await getDoc(dataRef);

        if (docSnap.exists) {
          const data = docSnap.data();
          setLink(data.about);
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
      <Nav />
      <div className="mt-32 text-center">
        <h2 className="text-4xl text-center font-bold">STUDENT UNION</h2>
        <p className="text-md w-2/3 mx-auto mt-8">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industrys standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
        <Button
          className="mt-8 text-gray-700 font-semibold hover:scale-105"
          onClick={() => window.open(link, "_blank", "noopener,noreferrer")}
        >
          Read More
        </Button>
      </div>
    </div>
  );
};

export default About;
