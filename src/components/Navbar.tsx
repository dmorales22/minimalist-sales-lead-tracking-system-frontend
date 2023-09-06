"use client";
import React from "react";
import Link from "next/link";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Bars3Icon, UserIcon } from "@heroicons/react/20/solid";

/**
 * This component is sticky navbar used for page navigation.
 * @constructor
 */
const Navbar = () => {
  return (
    <nav className="bg-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/">
                <UserIcon
                  className="-mr-1 h-8 w-8 text-gray-400"
                  aria-hidden="true"
                />
              </Link>
            </div>
            <p className="text-lg font-bold text-white ml-4">Sales Tracker</p>
            <div className="ml-5 flex space-x-4">
              <Menu
                as="div"
                className="absolute right-5 top-3 space-x-reverse inline-block"
              >
                <div>
                  <Menu.Button
                    aria-label={"menu-button"}
                    className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-gray px-5 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-white"
                  >
                    <Bars3Icon
                      className="-mr-1 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        <Link
                          href="/"
                          className="text-white
                              block px-4 py-2 text-lg"
                        >
                          Home
                        </Link>
                      </Menu.Item>
                      <Menu.Item>
                        <Link
                          href="/about"
                          className="text-white
                              block px-4 py-2 text-lg"
                        >
                          About
                        </Link>
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
