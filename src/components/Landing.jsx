import React from "react";
import HeroImage from "/assets/hero.jpg";
import FeatureImage1 from "/assets/feature1.svg";
import ToolImage from "/assets/tool.svg";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { IoSpeedometerOutline } from "react-icons/io5";
import { LuWarehouse } from "react-icons/lu";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { MdOutlineGroups } from "react-icons/md";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { IoBookOutline } from "react-icons/io5";
import { IoPeopleOutline } from "react-icons/io5";
import { FaRegFileAudio } from "react-icons/fa";
import { MdOutlineSportsCricket } from "react-icons/md";
import { LuProjector } from "react-icons/lu";
import { BiPaint } from "react-icons/bi";
import { FaRegBuilding } from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Landing = () => {
  const { currentUser } = useSelector((state) => state.user);

  const societies = [
    {
      title: "Literary Society",
      description:
        "Explore the world of literature and storytelling with our Literary Society. Join us to ignite your passion for reading, writing, and engaging literary discussions.",
      icon: IoBookOutline,
    },
    {
      title: "Cultural Society",
      description:
        "Experience the richness of diverse cultures through our Cultural Society. Join us in celebrating traditions, organizing events, and fostering cultural exchange within our university community.",
      icon: IoPeopleOutline,
    },
    {
      title: "Audio-Visual Society",
      description:
        "Immerse yourself in the world of audio-visual arts with our society. Join us in creating and appreciating captivating visual content, from films to multimedia presentations.",
      icon: FaRegFileAudio,
    },
    {
      title: "Athletic Society",
      description:
        "Stay active and fit with our Athletic Society. Join us for sports events, fitness challenges, and a community that promotes a healthy and active lifestyle.",
      icon: MdOutlineSportsCricket,
    },
    {
      title: "Dramatic Society",
      description:
        "Unleash your creativity on the stage with our Dramatic Society. Join us in exploring the world of drama, acting, and theatrical productions within our university community.",
      icon: LuProjector,
    },
    {
      title: "Fine-Arts Society",
      description:
        "Discover the artist within you with our Fine-Arts Society. Join us in expressing creativity through various art forms, from painting to sculpture, and be part of an inspiring community.",
      icon: BiPaint,
    },
    {
      title: "Social Service Guild",
      description:
        "Make a positive impact on society with our Social Service Guild. Join us in organizing and participating in social initiatives, contributing to the well-being of the community around us.",
      icon: IoPeopleOutline,
    },
    {
      title: "Hostel and Welfare",
      description:
        "Enhance the hostel experience and promote student welfare with our society. Join us in creating a supportive and inclusive environment within the university's hostel community.",
      icon: FaRegBuilding,
    },
  ];

  const testimonials = [
    {
      quote: "Transformative Learning Experience!",
      description:
        "LMS turned my courses into interactive journeys. Quick, easy, and impactful.",
      name: "Jessica W.",
    },
    {
      quote: "Empowerment in Every Course!",
      description:
        "LMS empowers educators to create and sell courses effortlessly. A game-changer!",
      name: "Michael S.",
    },
    {
      quote: "Unlocking Education's Potential!",
      description:
        "LMS provides the key to unlocking new heights in online education. Exceptional!",
      name: "Emily K.",
    },
    {
      quote: "Seamless, Scalable, Successful!",
      description:
        "LMS makes launching, scaling, and succeeding in online teaching a seamless journey.",
      name: "Alex T.",
    },
  ];

  return (
    <div className="px-4 md:px-12 py-2 md:py-8 overflow-hidden">
      <div className="relative h-screen flex items-center justify-center">
        <div className="mt-4 rounded-lg" data-aos="zoom-out">
          <img
            src={HeroImage}
            alt=""
            className="w-full rounded-lg opacity-60"
          />
        </div>
        <div className="absolute text-white text-center">
          <button className="text-xl hover:text-primary hover:scale-105 md:text-5xl font-bold w-2/3 mx-auto md:leading-normal mb-2 sm:mb-4 duration-200">
            Bhima Bhoi Medical College and Hospital
          </button>
          <p className="text-lg">Balangir, Odisha</p>
          <Drawer>
            <DrawerTrigger>
              <Button className="mt-8 text-gray-700 font-semibold hover:scale-105">
                Read More
              </Button>
            </DrawerTrigger>
            <DrawerContent className="p-8">
              <div className="bg-gray-900 text-white flex items-center justify-center mt-8">
                <div className="max-w-3/4 text-center" data-aos="zoom-in-left">
                  <h2 className="text-lg md:text-xl lg:text-2xl font-bold mb-4">
                    Who We Are?
                  </h2>
                  <p className="mb-8">
                    Since our inception, we have always encouraged new ideas and
                    new talents. Proudly, our association has come a long way
                    since then. Our team is made up of smart and talented
                    individuals passionate about creating outstanding results.
                  </p>

                  <h3 className="md:text-lg lg:text-xl font-bold mb-4">
                    Our Story
                  </h3>
                  <p className="mb-8">
                    We are UG’s of BBMCH, and this year marks our final year in
                    MedSchool. As the third batch of this college, we are
                    grateful that our association will witness the first batch
                    of graduates from this esteemed institution.
                  </p>

                  <h3 className="md:text-lg lg:text-xl font-bold mb-4">
                    Meet Our Hive
                  </h3>
                  <p className=" mb-8">
                    This is not just the story of our batch but of the entire
                    college, with each member contributing significantly to
                    different societies headed by secretaries. We are here to
                    realize the power, potential, and value of every single
                    member. We believe in working together, being positive, and
                    inspiring each other. Our success is collective, and our
                    team includes a board of executives and a long list of
                    general body members who have always been integral to the
                    association.
                  </p>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>


      {/* features preview */}
      <div className="mt-24">
        <h2 className="pb-2 text-3xl font-semibold tracking-tight md:w-2/3 mx-auto text-center">
          ABOUT THE SOCIETIES
        </h2>
        <p className="pb-2 md:text-xl font-semibold tracking-tight md:w-2/3 mx-auto text-center">
          The whole association had been divided into 8 societies headed by
          secretaries of different disciplines. The societies are as follows:
        </p>
        <div className="md:flex flex-wrap justify-around mb-16">
          {societies.map((item) => {
            return (
              <Card
                key={item.title}
                className="md:w-1/4 hover:scale-105 duration-200 mt-16 mx-8 text-center"
              >
                <div className="w-fit mx-auto mt-4">
                  <item.icon size={50} />
                </div>
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>

      {/* testimonials */}
      <div className="h-screen  pt-16">
        <h2 className="pb-2 text-3xl font-semibold tracking-tight md:w-2/3 mx-auto text-center">
          Hear from our satisfied customers
        </h2>
        <Carousel className="w-2/3 mx-auto">
          <CarouselContent>
            {testimonials.map((item, i) => {
              return (
                <CarouselItem key={i} className="basis-1/2">
                  <Card className="hover:scale-105 duration-200 mt-16 mx-8 text-center">
                    <div className="w-fit mx-auto">
                      {/* <item.icon size={50} /> */}
                    </div>
                    <CardHeader>
                      <CardTitle>&quot;{item.quote}&quot;</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{item.description}</p>
                    </CardContent>
                    <CardFooter>
                      <p>{item.name}</p>
                    </CardFooter>
                  </Card>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      {/* footer */}
      <div className="bg-black">Footer</div>
    </div>
  );
};

export default Landing;
