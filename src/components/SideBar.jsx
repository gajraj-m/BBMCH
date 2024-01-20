import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdLaunch } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";
import { SiWindows11 } from "react-icons/si";
import { SiGoogleanalytics } from "react-icons/si";
import { BsCheckLg, BsFillPeopleFill } from "react-icons/bs";
import { IoIosColorPalette } from "react-icons/io";
import { BsPlugin } from "react-icons/bs";
import { IoSettings } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { setAppPage, setSideBarExpand } from "../redux/slices/appSlice";
import { RiMenuFoldFill, RiMenuUnfoldFill } from "react-icons/ri";

const SideBar = () => {
  const items = [
    {
      id: 0,
      name: "Dashboard",
      icon: FaHome,
      link: "/app/dashboard",
    },
    {
      id: 1,
      name: "Orders",
      icon: FaClipboardList,
      link: "/app/orders",
    },
    {
      id: 2,
      name: "Courses",
      icon: SiWindows11,
      link: "/app/courses",
    },
    {
      id: 3,
      name: "Analytics",
      icon: SiGoogleanalytics,
      link: "/app/analytics",
    },
    {
      id: 4,
      name: "Audience",
      icon: BsFillPeopleFill,
      link: "/app/audience",
    },
    {
      id: 5,
      name: "Appearance",
      icon: IoIosColorPalette,
      link: "/app/appearance",
    },
    {
      id: 6,
      name: "Plugins",
      icon: BsPlugin,
      link: "/app/plugins",
    },
    {
      id: 7,
      name: "Settings",
      icon: IoSettings,
      link: "/app/settings",
    },
  ];

  const [selected, setSelected] = useState(0);
  const { currentPage, sideBarExpand } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  return (
    <div className="h-screen bg-zinc-300 max-w-fit p-4">
      <div className="flex flex-row justify-between items-center">
        <span className="font-semibold text-lg">LMS</span>
        <Link to="">
          <MdLaunch size={20} />
        </Link>
      </div>

      {/* item container */}
      <div className="mt-8">
        {items.map((item) => {
          return (
            <Link
              key={item.id}
              to={item.link}
              onClick={() => {
                dispatch(setAppPage(item.id));
              }}
            >
              <div className="flex flex-row items-center space-x-4 mt-3 bg-zinc-200 shadow-md shadow-gray-400 p-2 rounded-lg hover:scale-105 duration-150">
                <item.icon
                  size={18}
                  className={currentPage === item.id ? "fill-yellow-400" : ""}
                />
                {sideBarExpand && <span className="text-sm">{item.name}</span>}
              </div>
            </Link>
          );
        })}

        {/* compress */}
        <button
          className="w-full flex justify-end mt-8"
          onClick={() => dispatch(setSideBarExpand(!sideBarExpand))}
        >
          {sideBarExpand ? (
            <RiMenuFoldFill size={20} className="hover:scale-110 duraction-200" />
          ) : (
            <RiMenuUnfoldFill size={20} className="hover:scale-110 duration-200" />
          )}
        </button>
      </div>
    </div>
  );
};

export default SideBar;
