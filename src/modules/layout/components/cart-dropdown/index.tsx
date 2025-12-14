"use client"

import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@medusajs/ui"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"
import { usePathname } from "next/navigation"
import { Fragment, useEffect, useRef, useState } from "react"
import { ShoppingBag, X } from "lucide-react"

const CartDropdown = ({
                        cart: cartState,
                      }: {
  cart?: HttpTypes.StoreCart | null
}) => {
  const [activeTimer, setActiveTimer] = useState<NodeJS.Timer | undefined>(
    undefined
  )
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false)

  const open = () => setCartDropdownOpen(true)
  const close = () => setCartDropdownOpen(false)

  const totalItems =
    cartState?.items?.reduce((acc, item) => {
      return acc + item.quantity
    }, 0) || 0

  const subtotal = cartState?.subtotal ?? 0
  const itemRef = useRef<number>(totalItems || 0)

  const timedOpen = () => {
    open()

    const timer = setTimeout(close, 5000)

    setActiveTimer(timer)
  }

  const openAndCancel = () => {
    if (activeTimer) {
      clearTimeout(activeTimer)
    }

    open()
  }

  // Clean up the timer when the component unmounts
  useEffect(() => {
    return () => {
      if (activeTimer) {
        clearTimeout(activeTimer)
      }
    }
  }, [activeTimer])

  const pathname = usePathname()

  // open cart dropdown when modifying the cart items, but only if we're not on the cart page
  useEffect(() => {
    if (itemRef.current !== totalItems && !pathname.includes("/cart")) {
      timedOpen()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalItems, itemRef.current])

  return (
    <div
      className="h-full z-50"
      onMouseEnter={openAndCancel}
      onMouseLeave={close}
    >
      <Popover className="relative h-full">
        <PopoverButton className="h-full flex items-center">
          <LocalizedClientLink
            className="text-stone-600 hover:text-amber-700 transition-colors duration-300 p-2 relative"
            href="/cart"
            data-testid="nav-cart-link"
          >
            <ShoppingBag className="h-6 w-6" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-700 text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </LocalizedClientLink>
        </PopoverButton>
        <Transition
          show={cartDropdownOpen}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <PopoverPanel
            static
            className="hidden small:block absolute top-[calc(100%+1px)] right-0 bg-white border border-stone-200 rounded-2xl shadow-2xl w-[420px] text-stone-800 overflow-hidden"
            data-testid="nav-cart-dropdown"
          >
            <div className="p-6 flex items-center justify-between border-b border-stone-200 bg-gradient-to-r from-stone-50 to-amber-50/30">
              <h3 className="text-xl font-medium text-stone-800">Shopping Cart</h3>
              <span className="text-sm text-stone-600">{totalItems} {totalItems === 1 ? 'item' : 'items'}</span>
            </div>
            {cartState && cartState.items?.length ? (
              <>
                <div className="overflow-y-scroll max-h-[402px] px-6 py-4 grid grid-cols-1 gap-y-6 no-scrollbar">
                  {cartState.items
                    .sort((a, b) => {
                      return (a.created_at ?? "") > (b.created_at ?? "")
                        ? -1
                        : 1
                    })
                    .map((item) => (
                      <div
                        className="grid grid-cols-[100px_1fr] gap-x-4 pb-6 border-b border-stone-100 last:border-0"
                        key={item.id}
                        data-testid="cart-item"
                      >
                        <LocalizedClientLink
                          href={`/products/${item.product_handle}`}
                          className="w-full"
                        >
                          <div className="relative rounded-xl overflow-hidden bg-stone-100 aspect-square">
                            <Thumbnail
                              thumbnail={item.thumbnail}
                              images={item.variant?.product?.images}
                              size="square"
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        </LocalizedClientLink>
                        <div className="flex flex-col justify-between flex-1">
                          <div className="flex flex-col flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex flex-col flex-1 min-w-0">
                                <h3 className="text-sm font-medium text-stone-800 truncate">
                                  <LocalizedClientLink
                                    href={`/products/${item.product_handle}`}
                                    data-testid="product-link"
                                    className="hover:text-amber-700 transition-colors"
                                  >
                                    {item.title}
                                  </LocalizedClientLink>
                                </h3>
                                <LineItemOptions
                                  variant={item.variant}
                                  data-testid="cart-item-variant"
                                  data-value={item.variant}
                                  className="text-xs text-stone-500 mt-1"
                                />
                                <span
                                  data-testid="cart-item-quantity"
                                  data-value={item.quantity}
                                  className="text-xs text-stone-500 mt-1"
                                >
                                  Qty: {item.quantity}
                                </span>
                              </div>
                              <div className="flex flex-col items-end">
                                <LineItemPrice
                                  item={item}
                                  style="tight"
                                  currencyCode={cartState.currency_code}
                                  className="text-sm font-medium text-stone-800"
                                />
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              const deleteBtn = document.querySelector(`[data-testid="cart-item-remove-button"]`) as HTMLElement;
                              deleteBtn?.click();
                            }}
                            className="mt-2 text-xs text-stone-500 hover:text-red-600 transition-colors flex items-center gap-1 w-fit"
                            data-testid="cart-item-remove-button"
                          >
                            <X className="w-3 h-3" />
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="p-6 flex flex-col gap-y-4 border-t border-stone-200 bg-stone-50">
                  <div className="flex items-center justify-between">
                    <span className="text-stone-600 font-medium">
                      Subtotal
                      <span className="text-xs text-stone-500 ml-1">(excl. taxes)</span>
                    </span>
                    <span
                      className="text-xl font-medium text-stone-800"
                      data-testid="cart-subtotal"
                      data-value={subtotal}
                    >
                      {convertToLocale({
                        amount: subtotal,
                        currency_code: cartState.currency_code,
                      })}
                    </span>
                  </div>
                  <LocalizedClientLink href="/cart" passHref>
                    <button
                      className="w-full bg-gradient-to-r from-amber-700 to-amber-600 text-white py-3 px-6 rounded-full font-medium hover:shadow-lg hover:shadow-amber-500/50 transition-all duration-300 hover:scale-105"
                      data-testid="go-to-cart-button"
                    >
                      View Cart & Checkout
                    </button>
                  </LocalizedClientLink>
                </div>
              </>
            ) : (
              <div>
                <div className="flex py-16 flex-col gap-y-4 items-center justify-center">
                  <div className="bg-stone-100 rounded-full p-6">
                    <ShoppingBag className="w-12 h-12 text-stone-400" />
                  </div>
                  <span className="text-stone-600 font-medium">Your cart is empty</span>
                  <p className="text-sm text-stone-500">Add some candles to get started!</p>
                  <div className="mt-2">
                    <LocalizedClientLink href="/store">
                      <button
                        onClick={close}
                        className="bg-gradient-to-r from-amber-700 to-amber-600 text-white py-2.5 px-8 rounded-full font-medium hover:shadow-lg hover:shadow-amber-500/50 transition-all duration-300 hover:scale-105"
                      >
                        Explore Products
                      </button>
                    </LocalizedClientLink>
                  </div>
                </div>
              </div>
            )}
          </PopoverPanel>
        </Transition>
      </Popover>
    </div>
  )
}

export default CartDropdown