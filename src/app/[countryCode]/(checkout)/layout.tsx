import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { ArrowLeft } from "lucide-react"

export default function CheckoutLayout({
                                         children,
                                       }: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full bg-gradient-to-b from-stone-50 to-white relative small:min-h-screen">
      <div className="h-20 bg-white/80 backdrop-blur-md border-b border-stone-200/50 shadow-sm sticky top-0 z-50">
        <nav className="flex h-full items-center content-container justify-between px-4 sm:px-6 lg:px-8">
          {/* Back to Cart Link */}
          <LocalizedClientLink
            href="/cart"
            className="text-stone-600 hover:text-amber-700 transition-colors duration-300 flex items-center gap-2 flex-1 basis-0"
            data-testid="back-to-cart-link"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden small:block font-medium text-sm">
              Back to Cart
            </span>
          </LocalizedClientLink>

          {/* Logo - Centered */}
          <LocalizedClientLink
            href="/"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-300 absolute left-1/2 transform -translate-x-1/2"
            data-testid="store-link"
          >
            <img
              src="/logo_2.png"
              alt="Azores Bloom Candles"
              className="h-10 sm:h-12 w-auto object-contain"
            />
          </LocalizedClientLink>

          {/* Secure Checkout Badge */}
          <div className="flex-1 basis-0 flex justify-end">
            <div className="hidden sm:flex items-center gap-2 bg-stone-100 px-4 py-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-700" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span className="text-xs font-medium text-stone-700">Secure Checkout</span>
            </div>
          </div>
        </nav>
      </div>

      <div className="relative" data-testid="checkout-container">
        {children}
      </div>

      {/* Footer */}
      <div className="py-8 w-full border-t border-stone-200 bg-stone-50">
        <div className="content-container px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-stone-600">
              © {new Date().getFullYear()} Azores Bloom Candles. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-xs text-stone-500">
              <a href="#" className="hover:text-amber-700 transition-colors">Privacy Policy</a>
              <span>•</span>
              <a href="#" className="hover:text-amber-700 transition-colors">Terms of Service</a>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-xs text-stone-500">Supported by</p>
              <img
                src="/prr_logo.png"
                alt="PRR Funding"
                className="h-8 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}