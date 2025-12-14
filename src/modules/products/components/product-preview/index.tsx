"use client"

import { Text } from "@medusajs/ui"
import { HttpTypes } from "@medusajs/types"
import { ShoppingCart } from "lucide-react"
import { useState } from "react"
import { getProductPrice } from "@lib/util/get-product-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"

export default function ProductPreview({
                                         product,
                                         isFeatured,
                                         region,
                                       }: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const [isHovered, setIsHovered] = useState(false)

  const { cheapestPrice } = getProductPrice({
    product,
  })

  return (
    <div
      className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid="product-wrapper"
    >
      {/* Image Container */}
      <LocalizedClientLink href={`/products/${product.handle}`}>
        <div className="relative h-80 overflow-hidden bg-stone-100">
          <Thumbnail
            thumbnail={product.thumbnail}
            images={product.images}
            size="full"
            isFeatured={isFeatured}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />

          {/* Overlay on hover */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute bottom-4 left-4 right-4">
              <button className="w-full bg-white text-stone-800 py-3 px-6 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-amber-700 hover:text-white transition-all duration-300 transform hover:scale-105">
                Quick View
              </button>
            </div>
          </div>
        </div>
      </LocalizedClientLink>

      {/* Product Info */}
      <div className="p-6 space-y-3">
        <LocalizedClientLink href={`/products/${product.handle}`}>
          <Text
            className="text-xl font-medium text-stone-800 group-hover:text-amber-700 transition-colors line-clamp-2"
            data-testid="product-title"
          >
            {product.title}
          </Text>
        </LocalizedClientLink>

        {product.description && (
          <p className="text-sm text-stone-500 line-clamp-2">
            {product.description}
          </p>
        )}

        <div className="flex items-center justify-between pt-2">
          {/*{cheapestPrice && (*/}
          {/*  <div className="text-2xl font-light text-stone-800">*/}
          {/*    <PreviewPrice price={cheapestPrice} />*/}
          {/*  </div>*/}
          {/*)}*/}

          <LocalizedClientLink href={`/products/${product.handle}`}>
            <button className="bg-gradient-to-r from-amber-700 to-amber-600 text-white px-6 py-2.5 rounded-full font-medium flex items-center gap-2 hover:shadow-lg hover:shadow-amber-500/50 transition-all duration-300 hover:scale-105">
              <ShoppingCart className="w-4 h-4" />
              View
            </button>
          </LocalizedClientLink>
        </div>
      </div>
    </div>
  )
}