"use client"

import { useState } from "react"
import { HttpTypes } from "@medusajs/types"
import { Container } from "@medusajs/ui"
import Image from "next/image"
import React, { Suspense } from "react"
import ProductActions from "@modules/products/components/product-actions"

const CustomCandleSection = ({ product, region, images, countryCode }: {
  product: HttpTypes.StoreProduct,
  region: HttpTypes.StoreRegion,
  images: HttpTypes.StoreProductImage[],
  countryCode: string
}) => {
  const [customText, setCustomText] = useState("")
  const [selectedFont, setSelectedFont] = useState("elegant")
  const [textColor, setTextColor] = useState("#8B4513")

  const fonts = {
    elegant: { name: "Elegant Script", fontFamily: "'Dancing Script', cursive" },
    modern: { name: "Modern Sans", fontFamily: "'Poppins', sans-serif" },
    classic: { name: "Classic Serif", fontFamily: "'Playfair Display', serif" },
  }

  const colors = [
    { name: "Brown", value: "#8B4513" },
    { name: "Gold", value: "#D4AF37" },
    { name: "Black", value: "#000000" },
    { name: "White", value: "#FFFFFF" },
    { name: "Rose Gold", value: "#B76E79" },
  ]

  return (
    <>
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-start">
            {/* Left Side - Candle Preview */}
            <div className="w-full lg:sticky lg:top-24 order-2 lg:order-1">
              <div className="bg-gradient-to-b from-stone-100 to-amber-50/30 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-xl">
                <h3 className="text-lg sm:text-xl font-medium text-stone-800 mb-4 sm:mb-6 text-center">
                  Live Preview
                </h3>

                {/* Candle Mockup */}
                <div className="relative mx-auto w-full max-w-xs sm:max-w-md aspect-[3/4] rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden">
                  {/* Candle Image */}
                  <Container
                    key={images[0].id}
                    className="relative aspect-[29/34] w-full overflow-hidden bg-ui-bg-subtle"
                    id={images[0].id}
                  >
                    <Image
                      src={images[0].url}
                      priority={true}
                      className="absolute inset-0 rounded-rounded"
                      alt={`Product image`}
                      fill
                      sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
                      style={{
                        objectFit: "cover",
                      }}
                    />

                  </Container>

                  {/* Custom Text Overlay - Positioned on Label */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* This positions text in the center where the label typically is on a candle jar */}
                    <div className="w-[65%] h-[30%] flex items-center justify-center">
                      <div
                        className="text-center px-2 sm:px-3 w-full"
                        style={{
                          fontFamily: fonts[selectedFont].fontFamily,
                          color: textColor,
                          textShadow: textColor === "#FFFFFF" ? "0 1px 2px rgba(0,0,0,0.3)" : "none",
                        }}
                      >
                        {customText ? (
                          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-medium leading-snug">
                            {customText.match(/.{1,15}/g)?.join('\n')}
                          </p>
                        ) : (
                          <p className="text-xs sm:text-sm md:text-base text-stone-400 italic">
                            Your text here
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 sm:mt-6 text-center">
                  <p className="text-xs sm:text-sm text-stone-600">
                    Preview may vary slightly from final product
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Customization Options */}
            <div className="space-y-4 sm:space-y-8 order-1 lg:order-2">
              {/* Product Info */}
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light text-stone-800 mb-3 sm:mb-4">
                  {product.title}
                </h1>
                <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                  {product.description || "Create your perfect personalized candle with custom text."}
                </p>
              </div>

              {/* Custom Text Input */}
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
                <label className="block text-base sm:text-lg font-medium text-stone-800 mb-2 sm:mb-3">
                  Personalize Your Candle
                </label>
                <input
                  type="text"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value.slice(0, 50))}
                  placeholder="Enter your text (max 50 characters)"
                  maxLength={50}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-stone-200 rounded-lg sm:rounded-xl focus:border-amber-700 focus:outline-none transition-colors text-stone-800 text-sm sm:text-base"
                />
                <p className="text-xs text-stone-500 mt-2">
                  {customText.length}/50 characters
                </p>
              </div>

              {/* Font Selection */}
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
                <label className="block text-base sm:text-lg font-medium text-stone-800 mb-3 sm:mb-4">
                  Choose Font Style
                </label>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {Object.entries(fonts).map(([key, font]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedFont(key)}
                      className={`p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all duration-300 ${
                        selectedFont === key
                          ? "border-amber-700 bg-amber-50"
                          : "border-stone-200 hover:border-amber-300"
                      }`}
                    >
                      <span
                        style={{ fontFamily: font.fontFamily }}
                        className="text-base sm:text-lg text-stone-800"
                      >
                        Abc
                      </span>
                      <p className="text-xs text-stone-600 mt-1 sm:mt-2">{font.name}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
                <label className="block text-base sm:text-lg font-medium text-stone-800 mb-3 sm:mb-4">
                  Text Color
                </label>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {colors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setTextColor(color.value)}
                      className={`flex flex-col items-center gap-1.5 sm:gap-2 p-2 sm:p-3 rounded-lg sm:rounded-xl border-2 transition-all duration-300 ${
                        textColor === color.value
                          ? "border-amber-700 bg-amber-50"
                          : "border-stone-200 hover:border-amber-300"
                      }`}
                    >
                      <div
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-stone-300"
                        style={{ backgroundColor: color.value }}
                      />
                      <span className="text-xs text-stone-600">{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Add to Cart - FIXED: Properly passing all required props */}
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
                <Suspense
                  fallback={
                    <ProductActions
                      disabled={true}
                      product={product}
                      region={region} // ADDED: region prop was missing
                    />
                  }
                >
                  {/* Make sure the ProductActions component is receiving all props */}
                  <ProductActions
                    product={product}
                    region={region} // ADDED: region prop
                    disabled={false}
                  />
                </Suspense>
              </div>

              {/* Additional Info */}
              <div className="bg-amber-50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-medium text-stone-800 mb-2 sm:mb-3">
                  Product Details
                </h3>
                <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-stone-600">
                  <li className="flex items-center gap-2">
                    <span className="text-amber-700">✓</span>
                    Premium soy wax blend
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-amber-700">✓</span>
                    55+ hour burn time
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-amber-700">✓</span>
                    Hand-poured in California
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-amber-700">✓</span>
                    Custom text printed with eco-friendly materials
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Load Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Poppins:wght@300;400;600&family=Playfair+Display:wght@400;700&display=swap"
        rel="stylesheet"
      />
    </>
  )
}

export default CustomCandleSection