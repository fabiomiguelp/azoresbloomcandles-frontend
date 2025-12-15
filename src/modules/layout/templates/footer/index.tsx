import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { clx } from "@medusajs/ui"
import { Instagram, Facebook, Mail } from "lucide-react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function Footer() {
  const { collections } = await listCollections({
    fields: "*products",
  })
  const productCategories = await listCategories()

  return (
    <footer className="bg-gradient-to-b from-stone-50 to-amber-50/30 border-t border-stone-200">
      <div className="content-container">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <LocalizedClientLink href="/" className="inline-block mb-6">
              <img
                src="/logo_2.png"
                alt="Azores Bloom Candles"
                className="h-16 w-auto object-contain"
              />
            </LocalizedClientLink>
            <p className="text-sm text-stone-600 leading-relaxed mb-6">
              Handcrafted artisan candles made with premium soy wax and natural fragrances.
              Each candle is hand-poured with love in California.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-stone-200 hover:bg-amber-700 flex items-center justify-center transition-all duration-300 group"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-stone-600 group-hover:text-white transition-colors" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-stone-200 hover:bg-amber-700 flex items-center justify-center transition-all duration-300 group"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-stone-600 group-hover:text-white transition-colors" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-stone-200 hover:bg-amber-700 flex items-center justify-center transition-all duration-300 group"
                aria-label="Email"
              >
                <Mail className="w-5 h-5 text-stone-600 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Categories Column */}
          {productCategories && productCategories?.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-stone-800 mb-4">
                Categories
              </h3>
              <ul className="space-y-3" data-testid="footer-categories">
                {productCategories?.slice(0, 6).map((c) => {
                  if (c.parent_category) {
                    return null
                  }

                  const children =
                    c.category_children?.map((child) => ({
                      name: child.name,
                      handle: child.handle,
                      id: child.id,
                    })) || null

                  return (
                    <li key={c.id} className="space-y-2">
                      <LocalizedClientLink
                        className={clx(
                          "text-stone-600 hover:text-amber-700 transition-colors text-sm",
                          children && "font-medium"
                        )}
                        href={`/categories/${c.handle}`}
                        data-testid="category-link"
                      >
                        {c.name}
                      </LocalizedClientLink>
                      {children && (
                        <ul className="space-y-2 ml-3">
                          {children.map((child) => (
                            <li key={child.id}>
                              <LocalizedClientLink
                                className="text-stone-600 hover:text-amber-700 transition-colors text-sm"
                                href={`/categories/${child.handle}`}
                                data-testid="category-link"
                              >
                                {child.name}
                              </LocalizedClientLink>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          )}

          {/* Collections Column */}
          {collections && collections.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-stone-800 mb-4">
                Collections
              </h3>
              <ul className="space-y-3">
                {collections?.slice(0, 6).map((c) => (
                  <li key={c.id}>
                    <LocalizedClientLink
                      className="text-stone-600 hover:text-amber-700 transition-colors text-sm"
                      href={`/collections/${c.handle}`}
                    >
                      {c.title}
                    </LocalizedClientLink>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Customer Service Column */}
          <div>
            <h3 className="text-lg font-medium text-stone-800 mb-4">
              Customer Service
            </h3>
            <ul className="space-y-3">
              <li>
                <LocalizedClientLink
                  className="text-stone-600 hover:text-amber-700 transition-colors text-sm"
                  href="/account"
                >
                  My Account
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  className="text-stone-600 hover:text-amber-700 transition-colors text-sm"
                  href="/store"
                >
                  Shop All
                </LocalizedClientLink>
              </li>
              <li>
                <a
                  className="text-stone-600 hover:text-amber-700 transition-colors text-sm"
                  href="#"
                >
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a
                  className="text-stone-600 hover:text-amber-700 transition-colors text-sm"
                  href="#"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  className="text-stone-600 hover:text-amber-700 transition-colors text-sm"
                  href="#"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-stone-200 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6">
              <p className="text-sm text-stone-600">
                © {new Date().getFullYear()} Azores Bloom Candles. Developed by Sofia Designer.
              </p>
              <div className="hidden md:flex items-center gap-4 text-xs text-stone-500">
                <a href="#" className="hover:text-amber-700 transition-colors">
                  Privacy Policy
                </a>
                <span>•</span>
                <a href="#" className="hover:text-amber-700 transition-colors">
                  Terms of Service
                </a>
              </div>
            </div>

            {/* Funding Logo */}
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
    </footer>
  )
}