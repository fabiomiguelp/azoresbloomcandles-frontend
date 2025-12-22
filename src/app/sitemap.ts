// app/sitemap.ts
import { MetadataRoute } from 'next'

// Initialize Medusa client
const MEDUSA_BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000'

async function getMedusaClient() {
  const { default: Medusa } = await import('@medusajs/medusa-js')
  return new Medusa({ baseUrl: MEDUSA_BACKEND_URL, maxRetries: 3 })
}

async function getAllProducts() {
  try {
    const client = await getMedusaClient()
    const { products } = await client.products.list({ limit: 1000 })
    return products
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

async function getAllCollections() {
  try {
    const client = await getMedusaClient()
    const { collections } = await client.collections.list({ limit: 100 })
    return collections
  } catch (error) {
    console.error('Error fetching collections:', error)
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourstore.com'

  // Fetch all products and collections
  const [products, collections] = await Promise.all([
    getAllProducts(),
    getAllCollections(),
  ])

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ]

  // Product pages
  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}/products/${product.handle}`,
    lastModified: product.updated_at ? new Date(product.updated_at) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Collection/Category pages
  const collectionPages: MetadataRoute.Sitemap = collections.map((collection) => ({
    url: `${baseUrl}/collections/${collection.handle}`,
    lastModified: collection.updated_at ? new Date(collection.updated_at) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Combine all pages
  return [...staticPages, ...productPages, ...collectionPages]
}

// Regenerate every hour
export const revalidate = 3600