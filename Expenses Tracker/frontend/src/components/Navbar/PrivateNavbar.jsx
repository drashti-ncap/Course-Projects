import { Fragment } from "react";
import {
  Disclosure,
  Menu,
  Transition,
} from "@headlessui/react";

import {
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import {
  Link,
  useLocation,
} from "react-router-dom";

import { useDispatch } from "react-redux";

import {
  IoLogOutOutline,
} from "react-icons/io5";

import {
  FaWallet,
  FaUserCircle,
} from "react-icons/fa";

import {
  logoutAction,
} from "../../redux/slice/authSlice";

function cn(...classes) {
  return classes
    .filter(Boolean)
    .join(" ");
}

const navLinks = [
  {
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    name: "Transactions",
    path: "/add-transaction",
  },
  {
    name: "Categories",
    path: "/categories",
  },
  {
    name: "Add Category",
    path: "/add-category",
  },
];

export default function PrivateNavbar() {
  const dispatch =
    useDispatch();

  const location =
    useLocation();

  const logoutHandler =
    () => {
      dispatch(
        logoutAction()
      );

      localStorage.removeItem(
        "userInfo"
      );
    };

  return (
    <Disclosure
      as="nav"
      className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm"
    >
      {({
        open,
      }) => (
        <>

          {/* NAVBAR */}

          <div className="max-w-7xl mx-auto px-6">

            <div className="h-[76px] flex items-center justify-between">

              {/* LOGO */}

              <Link
                to="/dashboard"
                className="flex items-center gap-4"
              >

                <div className="w-11 h-11 rounded-xl bg-purple-600 flex items-center justify-center">

                  <FaWallet className="text-white text-lg" />

                </div>

                <div>

                  <h1 className="font-bold text-lg text-gray-900">

                    ExpenseTracker

                  </h1>

                  <p className="text-xs text-gray-500">

                    Smart Finance

                  </p>

                </div>

              </Link>

              {/* DESKTOP */}

              <div className="hidden lg:flex items-center gap-2">

                {navLinks.map(
                  (
                    item
                  ) => (
                    <Link
                      key={
                        item.path
                      }
                      to={
                        item.path
                      }
                      className={cn(
                        "px-5 py-2.5 rounded-xl text-sm font-medium transition",

                        location.pathname ===
                          item.path
                          ? "bg-purple-100 text-purple-700"
                          : "text-gray-600 hover:bg-gray-100"
                      )}
                    >

                      {
                        item.name
                      }

                    </Link>
                  )
                )}

              </div>

              {/* RIGHT */}

              <div className="flex items-center gap-4">

                <Menu
                  as="div"
                  className="relative"
                >

                  <Menu.Button className="flex items-center gap-3 rounded-xl border border-gray-200 px-3 py-2 hover:bg-gray-50">

                    <FaUserCircle className="text-3xl text-purple-600" />

                    <span className="hidden md:block text-sm font-medium text-gray-700">

                      My Account

                    </span>

                  </Menu.Button>

                  <Transition
                    as={
                      Fragment
                    }
                    enter="transition duration-150"
                    enterFrom="opacity-0 translate-y-2"
                    enterTo="opacity-100"
                  >

                    <Menu.Items className="absolute right-0 mt-3 w-56 rounded-2xl bg-white border shadow-lg overflow-hidden">

                      <Menu.Item>

                        {({
                          active,
                        }) => (

                          <Link
                            to="/profile"
                            className={cn(
                              "block px-5 py-4 0",

                              active &&
                                "bg-gray-50"
                            )}
                          >

                            Profile

                          </Link>

                        )}

                      </Menu.Item>

                      <Menu.Item>

                        {({
                          active,
                        }) => (

                          <button
                            onClick={
                              logoutHandler
                            }
                            className={cn(
                              "w-full px-5 py-4 flex items-center gap-3 text-red-500",

                              active &&
                                "bg-red-100"
                            )}
                          >

                            <IoLogOutOutline />

                            Logout

                          </button>

                        )}

                      </Menu.Item>

                    </Menu.Items>

                  </Transition>

                </Menu>

                {/* MOBILE */}

                <Disclosure.Button className="lg:hidden">

                  {open ? (
                    <XMarkIcon className="h-7 w-7 text-gray-700" />
                  ) : (
                    <Bars3Icon className="h-7 w-7 text-gray-700" />
                  )}

                </Disclosure.Button>

              </div>

            </div>

          </div>

          {/* MOBILE MENU */}

          <Disclosure.Panel className="lg:hidden border-t bg-white">

            <div className="p-5 space-y-2">

              {navLinks.map(
                (
                  item
                ) => (

                  <Link
                    key={
                      item.path
                    }
                    to={
                      item.path
                    }
                  >

                    <Disclosure.Button
                      as="div"
                      className={cn(
                        "rounded-xl px-5 py-3",

                        location.pathname ===
                          item.path
                          ? "bg-purple-600 text-white"
                          : "hover:bg-gray-100"
                      )}
                    >

                      {
                        item.name
                      }

                    </Disclosure.Button>

                  </Link>

                )
              )}

              <button
                onClick={
                  logoutHandler
                }
                className="w-full rounded-xl bg-red-500 text-white py-3 mt-4"
              >

                Logout

              </button>

            </div>

          </Disclosure.Panel>

        </>
      )}
    </Disclosure>
  );
}