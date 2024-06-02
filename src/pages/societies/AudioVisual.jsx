import React from "react";
import Nav from "../../components/Nav";
import { FiInstagram } from "react-icons/fi";
import { useSelector } from "react-redux";

const AudioVisual = () => {
  const { gallery } = useSelector((state) => state.app);

  return (
    <div className="overflow-hidden">
      <Nav />
      <div className="mt-32 text-center">
        <h2 className="text-4xl text-center font-bold">AUDIO-VISUAL SOCIETY</h2>
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

      {/* gallery */}
      <h2 className="font-bold mt-16 text-3xl p-4">Gallery</h2>
      <div className="flex flex-row space-x-6 mt-8 p-4">
        {gallery?.audioVisual?.map((image, id) => (
          <div
            key={id}
            className="bg-gray-100 rounded-lg shadow-md shadow-gray-600 text-center p-2 w-1/4 hover:scale-105 duration-200"
          >
            <img src={image.image} alt="" className="w-full rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AudioVisual;
