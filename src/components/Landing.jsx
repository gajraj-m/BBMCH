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
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Landing = () => {
  const { currentUser } = useSelector((state) => state.user);
  const appFeatures = [
    {
      title: "Site Speed",
      description:
        "Deliver lightning-fast experiences for your users. Witness the incredible speed of your app in action as you start your online journey.",
      icon: IoSpeedometerOutline,
    },

    {
      title: "Multi-Warehouse",
      description:
        "Operate seamlessly with one central hub and multiple locations. Ship your products efficiently from various warehouses across the region.",
      icon: LuWarehouse,
    },
    {
      title: "Optimized Checkouts",
      description:
        "Provide a smooth shopping experience with optimized checkouts. Reduce abandonment rates and ensure a hassle-free transaction process for your users.",
      icon: MdOutlineShoppingCartCheckout,
    },
    {
      title: "Staff Accounts",
      description:
        "Expand your team effortlessly by adding employees, colleagues, and teammates. Manage access levels to help your business grow collaboratively.",
      icon: MdOutlineGroups,
    },
    {
      title: "Advanced Analytics",
      description:
        "Access valuable insights with ease. Get comprehensive information about your app's sales, traffic, regional performance, and product analytics at your fingertips.",
      icon: TbBrandGoogleAnalytics,
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

      {/* features */}
      <div className="h-screen mt-16">
        <h2 className="pb-2 text-3xl font-semibold tracking-tight md:w-2/3 mx-auto text-center">
          Whether you are a startup or an established business, here is why LMS
          is your best choice
        </h2>
        <div className="md:flex justify-between mt-8">
          <div className="md:w-1/2">
            <img src={FeatureImage1} alt="" className="w-full" />
          </div>
          <div className="md:w-1/2 space-y-4 ">
            <ul className="list-disc [&>li]:mt-2 font-semibold w-fit mx-auto mt-8">
              <li>Rapid Launch</li>
              <li>Effortless Scaling</li>
              <li>Intuitive Tools for Educators</li>
              <li>Robust E-Commerce Integration</li>
              <li>Community Building Support</li>
            </ul>
          </div>
        </div>
      </div>

      {/* features preview */}
      <div className="">
        <h2 className="pb-2 text-3xl font-semibold tracking-tight md:w-2/3 mx-auto text-center">
          Education Simplified, Success Amplified.
        </h2>
        <p className="pb-2 md:text-xl font-semibold tracking-tight md:w-2/3 mx-auto text-center">
          Empowering your online business growth with all the essential tools
        </p>
        <div className="md:flex flex-wrap justify-around mb-16">
          {appFeatures.map((item) => {
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

      {/* theme preview with custom names */}
      <div className="">
        <h2 className="pb-2 text-3xl font-semibold tracking-tight md:w-2/3 mx-auto text-center">
          Transform your online academy instantly with our captivating themes.
        </h2>
        <div className="md:flex flex-wrap justify-around mb-16">
          {[1, 2, 3, 4, 5, 6].map((item) => {
            return (
              <div key={item} className="mx-8 my-8">
                <div className="w-80 h-96 bg-gray-400 rounded-lg hover:scale-105 duration-200"></div>
                <p className="leading-7 [&:not(:first-child)]:mt-6 text-justify">
                  {`Name ${item}`}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* tools */}
      <div className="h-screen">
        <h2 className="pb-2 text-3xl font-semibold tracking-tight md:w-2/3 mx-auto text-center">
          Enhance the functionality for your site with tools
        </h2>
        <div className="md:flex justify-between mt-8">
          <div className="md:w-1/2">
            <img src={ToolImage} alt="" className="w-full" />
          </div>
          <div className="md:w-1/2 space-y-4 ">
            <ul className="list-disc [&>li]:mt-2 font-semibold w-fit mx-auto mt-8">
              <li>Hosting</li>
              <li>Google Analytics</li>
              <li>Payment Gateway</li>
              <li>MailChimp</li>
            </ul>
          </div>
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
