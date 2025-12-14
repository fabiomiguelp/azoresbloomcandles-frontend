import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import AboutSection from "@modules/home/components/about-section"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import Divider from "@modules/common/components/divider"

export const metadata: Metadata = {
  title: "Azores Bloom Candles",
  description:
    "Handcrafted artisan candles made with premium soy wax and natural fragrances. Each candle is hand-poured with love in California.",
}

type Props = {
  params: Promise<{ countryCode: string }>
  searchParams: Promise<{
    page?: string
    sortBy?: SortOptions
  }>
}

export default async function Home(props: Props) {
  const params = await props.params
  const searchParams = await props.searchParams

  const { countryCode } = params
  const { sortBy, page } = searchParams

  const region = await getRegion(countryCode)

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <Hero />
      <AboutSection />
      <Divider/>
      <PaginatedProducts
        sortBy={sortBy}
        page={page ? parseInt(page) : 1}
        countryCode={countryCode}
      />
    </>
  )
}