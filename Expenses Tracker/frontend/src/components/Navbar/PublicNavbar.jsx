import { Fragment } from "react";
import {
  Disclosure,
  Transition,
} from "@headlessui/react";

import {
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import {
  RiLoginCircleLine,
} from "react-icons/ri";

import {
  FaRegUser,
  FaWallet,
} from "react-icons/fa";

import {
  Link,
  useLocation,
} from "react-router-dom";

function cn(...classes) {
  return classes
    .filter(Boolean)
    .join(" ");
}

const navItems = [
  {
    name: "Home",
    path: "/",
  },
];

export default function PublicNavbar() {
  const location =
    useLocation();

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
                to="/"
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

              {/* CENTER NAV */}

              <div className="hidden md:flex items-center gap-2">

                {navItems.map(
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
                        "px-5 py-2.5 rounded-xl text-lg font-medium transition",

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

              <div className="hidden md:flex items-center gap-3">

                <Link
                  to="/login"
                >

                  <button className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition flex items-center gap-2">

                    <RiLoginCircleLine />

                    Sign In

                  </button>

                </Link>

                <Link
                  to="/register"
                >

                  <button className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold transition">

                    <span className="flex items-center gap-2">

                      <FaRegUser />

                      Get Started

                    </span>

                  </button>

                </Link>

              </div>

              {/* MOBILE */}

              <Disclosure.Button className="md:hidden">

                {open ? (
                  <XMarkIcon className="h-7 w-7 text-gray-700" />
                ) : (
                  <Bars3Icon className="h-7 w-7 text-gray-700" />
                )}

              </Disclosure.Button>

            </div>

          </div>

          {/* MOBILE MENU */}

          <Transition
            as={
              Fragment
            }
            enter="transition duration-200"
            enterFrom="opacity-0 -translate-y-2"
            enterTo="opacity-100 translate-y-0"
            leave="transition duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >

            <Disclosure.Panel className="md:hidden border-t bg-white">

              <div className="p-5 space-y-3">

                {navItems.map(
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
                          "rounded-xl px-5 py-3 text-center",

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

                <Link
                  to="/login"
                >

                  <button className="w-full rounded-xl border border-gray-300 py-3 text-gray-700">

                    Sign In

                  </button>

                </Link>

                <Link
                  to="/register"
                >

                  <button className="w-full rounded-xl bg-purple-600 py-3 text-white font-semibold">

                    Get Started

                  </button>

                </Link>

              </div>

            </Disclosure.Panel>

          </Transition>

        </>
      )}
    </Disclosure>
  );
}