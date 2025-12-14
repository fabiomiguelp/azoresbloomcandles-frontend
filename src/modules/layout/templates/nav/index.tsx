import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-20 mx-auto duration-200 bg-white/80 backdrop-blur-md border-b border-stone-200/50 shadow-sm">
        <nav className="content-container flex items-center justify-between w-full h-full px-4 sm:px-6 lg:px-8">
          {/* Left side - Burger Menu */}
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="h-full flex items-center">
              <SideMenu regions={regions} />
            </div>
          </div>

          {/* Center - Logo */}
          <div className="flex items-center h-full absolute left-1/2 transform -translate-x-1/2">
            <LocalizedClientLink
              href="/"
              className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-300"
              data-testid="nav-store-link"
            >
              <img
                src="/logo_2.png"
                alt="Azores Bloom Candles"
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </LocalizedClientLink>
          </div>

          {/* Right side - Account & Cart */}
          <div className="flex items-center gap-x-4 sm:gap-x-6 h-full flex-1 basis-0 justify-end">
            <LocalizedClientLink
              className="text-stone-600 hover:text-amber-700 transition-colors duration-300 p-2"
              href="/account"
              data-testid="nav-account-link"
              aria-label="Account"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </LocalizedClientLink>

            <Suspense
              fallback={
                <LocalizedClientLink
                  className="text-stone-600 hover:text-amber-700 transition-colors duration-300 p-2"
                  href="/cart"
                  data-testid="nav-cart-link"
                  aria-label="Cart"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}