"use client"

import { Popover, PopoverPanel, Transition } from "@headlessui/react"
import { ArrowRightMini, XMark } from "@medusajs/icons"
import { Text, clx, useToggleState } from "@medusajs/ui"
import { Fragment } from "react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CountrySelect from "../country-select"
import { HttpTypes } from "@medusajs/types"

const SideMenuItems = {
  Home: "/",
  Store: "/store",
  Account: "/account",
  Cart: "/cart",
}

const SideMenu = ({ regions }: { regions: HttpTypes.StoreRegion[] | null }) => {
  const toggleState = useToggleState()

  return (
    <div className="h-full">
      <div className="flex items-center h-full">
        <Popover className="h-full flex">
          {({ open, close }) => (
            <>
              <div className="relative flex h-full">
                <Popover.Button
                  data-testid="nav-menu-button"
                  className="relative h-full flex items-center transition-all ease-out duration-200 focus:outline-none hover:text-amber-700 p-2"
                >
                  {/* Burger Icon */}
                  <div className="flex flex-col gap-1.5 w-6">
                    <span className={clx(
                      "block h-0.5 w-6 bg-stone-600 transition-all duration-300",
                      open ? "rotate-45 translate-y-2" : ""
                    )}></span>
                    <span className={clx(
                      "block h-0.5 w-6 bg-stone-600 transition-all duration-300",
                      open ? "opacity-0" : ""
                    )}></span>
                    <span className={clx(
                      "block h-0.5 w-6 bg-stone-600 transition-all duration-300",
                      open ? "-rotate-45 -translate-y-2" : ""
                    )}></span>
                  </div>
                </Popover.Button>
              </div>

              {open && (
                <div
                  className="fixed inset-0 z-[50] bg-black/40 backdrop-blur-sm pointer-events-auto"
                  onClick={close}
                  data-testid="side-menu-backdrop"
                />
              )}

              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-300"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in duration-200"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <PopoverPanel className="fixed left-0 top-0 w-80 sm:w-96 h-screen z-[51] bg-white shadow-2xl overflow-y-auto">
                  <div
                    data-testid="nav-menu-popup"
                    className="flex flex-col min-h-full p-8 bg-white"
                  >
                    {/* Close Button */}
                    <div className="flex justify-end mb-8" id="xmark">
                      <button
                        data-testid="close-menu-button"
                        onClick={close}
                        className="p-2 hover:bg-stone-100 rounded-full transition-colors"
                      >
                        <XMark className="text-stone-600" />
                      </button>
                    </div>

                    {/* Menu Items */}
                    <ul className="flex flex-col gap-6 items-start justify-start mb-auto">
                      {Object.entries(SideMenuItems).map(([name, href]) => {
                        return (
                          <li key={name}>
                            <LocalizedClientLink
                              href={href}
                              className="text-3xl font-light text-stone-800 hover:text-amber-700 transition-colors duration-300 tracking-wide"
                              onClick={close}
                              data-testid={`${name.toLowerCase()}-link`}
                            >
                              {name}
                            </LocalizedClientLink>
                          </li>
                        )
                      })}
                    </ul>

                    {/* Footer Section */}
                    <div className="flex flex-col gap-y-6 pt-8 border-t border-stone-200">
                      <div
                        className="flex justify-between items-center"
                        onMouseEnter={toggleState.open}
                        onMouseLeave={toggleState.close}
                      >
                        {regions && (
                          <CountrySelect
                            toggleState={toggleState}
                            regions={regions}
                          />
                        )}
                        <ArrowRightMini
                          className={clx(
                            "transition-transform duration-150 text-stone-600",
                            toggleState.state ? "-rotate-90" : ""
                          )}
                        />
                      </div>
                      <Text className="text-xs text-stone-500">
                        © {new Date().getFullYear()} Azores Bloom Candles. All rights reserved.
                      </Text>
                    </div>
                  </div>
                </PopoverPanel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  )
}

export default SideMenu