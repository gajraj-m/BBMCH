import React, { useEffect, useState } from "react";
import Nav from "../../components/Nav";
import { FiInstagram } from "react-icons/fi";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";

const Literary = () => {

  const [images, setImages] = useState([])

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const dataRef = doc(db, "gallery", "literary"); // Reference to the specific document
        const docSnap = await getDoc(dataRef);

        if (docSnap.exists) {
          const data = docSnap.data();
          setImages(data);
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
        <h2 className="text-4xl text-center font-bold">LITERARY SOCIETY</h2>
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
        <a
          href="https://www.instagram.com/acumen.bbmch/"
          target="__blank"
          key={1}
        >
          <FiInstagram className="mx-auto mt-8 hover:fill-pink-700" size={30} />
        </a>
      </div>
    </div>
  );
};

export default Literary;
