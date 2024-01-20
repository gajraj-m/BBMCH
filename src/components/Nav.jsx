import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu.jsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoExitOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FaUniversity } from "react-icons/fa";
import { HiMenuAlt2 } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../redux/slices/userSlice";

const events = [
  {
    title: "Upcoming & Past Events",
    href: "/events/list",
    description:
      "Dive into the excitement of what's to come and reminisce about memorable moments.",
  },

  {
    title: "Event Calendar",
    href: "/events/calendar",
    description:
      "Stay tuned with a comprehensive schedule of all upcoming activities.",
  },
];

const aboutUs = [
  {
    title: "Mission & Vision",
    href: "/about-us/mission-vision",
    description: "Unveiling our core values and future aspirations.",
  },
  {
    title: "Leadership Team",
    href: "/about-us/leadership-team",
    description: "Meet the faces steering the course of our student community.",
  },
];

const getInvolved = [
  {
    title: "Clubs & Organizations",
    href: "/get-involved/clubs-organizations",
    description:
      "Explore diverse interests and find your community within our array of student groups.",
  },
  {
    title: "Volunteer Opportunities",
    href: "/get-involved/volunteer-opportunities",
    description: "Make a difference by contributing your time and skills.",
  },
];

const resources = [
  {
    title: "Academic & Career Support",
    href: "/resources/academic-career-support",
    description:
      "Discover services aiding your educational journey and future endeavors.",
  },
  {
    title: "Campus Facilities",
    href: "/resources/campus-facilities",
    description:
      "Navigate through our campus infrastructure for a seamless student experience.",
  },
  {
    title: "News & Updates",
    href: "/resources/news-updates",
    description: "Stay informed with the latest happenings and announcements.",
  },
];

const contactUs = [
  {
    title: "Contact Us",
    href: "/contact-us",
    description:
      "Reach out to us for any queries, suggestions, or to connect with our vibrant student body community.",
  },
];

const products = [
  {
    title: "LMS Themes",
    href: "/products/lms-themes",
    description:
      "Explore beautifully designed themes for your LMS websites. Customize and enhance the look of your online courses with ease.",
  },

  // LMS Tools
  {
    title: "LMS Tools",
    href: "/products/lms-tools",
    description:
      "Discover powerful tools to streamline your online teaching experience. From analytics to interactive quizzes, optimize your LMS for success.",
  },
];

const company = [
  {
    title: "Career",
    href: "/company/career",
    description:
      "Join our team and be part of an exciting journey. Explore career opportunities and find the perfect fit for your skills and passion.",
  },

  // About
  {
    title: "About",
    href: "/company/about",
    description:
      "Learn more about our company, mission, and values. Discover our story and the people behind the scenes shaping the future of online education.",
  },
];

const ListItem = ({ title, desc, href }) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          href={href}
          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {desc}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
};

const Nav = () => {
  const [state, setState] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    //
    <nav className="bg-background w-full px-6 py-4 lg:p-12 lg:py-4 fixed z-40">
      <div className="items-center max-w-screen-xl mx-auto md:flex">
        <div className="flex items-center justify-between py-3  md:block">
          <a href="/" className="flex space-x-3">
            <FaUniversity size={34} />
            <h1 className="text-3xl font-bold">BBMCH</h1>
          </a>
          <div className="md:hidden">
            <button
              className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border"
              onClick={() => setState(!state)}
            >
              <HiMenuAlt2 size={30} color="#000" />
            </button>
          </div>
        </div>
        <div
          className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
            state ? "block" : "hidden"
          }`}
        >
          <ul className="justify-center items-center space-y-8 md:flex md:space-x-6 md:space-y-0">
            <NavigationMenu>
              <NavigationMenuList className="md:flex">
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Events</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                      {events.map((event) => (
                        <ListItem
                          key={event.title}
                          title={event.title}
                          href={event.href}
                          desc={event.description}
                        />
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* company */}

                <NavigationMenuItem>
                  <NavigationMenuTrigger>About Us</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                      {aboutUs.map((about) => (
                        <ListItem
                          key={about.title}
                          title={about.title}
                          href={about.href}
                          desc={about.description}
                        />
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* get Involved */}

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Get Involved</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                      {getInvolved.map((item) => (
                        <ListItem
                          key={item.title}
                          title={item.title}
                          href={item.href}
                          desc={item.description}
                        />
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* res */}

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                      {resources.map((item) => (
                        <ListItem
                          key={item.title}
                          title={item.title}
                          href={item.href}
                          desc={item.description}
                        />
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </ul>
        </div>

        {/* sign in */}
        <div
          className={`justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
            state ? "block" : "hidden"
          }`}
        >
          {currentUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="w-10 h-10 rounded-full">
                  <img
                    src={currentUser.profilePicture}
                    alt=""
                    className="rounded-full"
                  />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <FaRegUser className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    dispatch(signOut());
                    navigate("/login");
                  }}
                >
                  <IoExitOutline className="mr-2 h-4 w-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login">
              <Button>Sign In</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
