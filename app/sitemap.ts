import { getSiteUrl } from '@/constants/url'
import { MetadataRoute } from 'next'
import iconsIndex from '@/utils/icons-index.json'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl()

  // Main pages
  const mainPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/icons`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ]

  // All icon pages
  const iconPages: MetadataRoute.Sitemap = iconsIndex.map((icon) => ({
    url: `${baseUrl}/icons/${icon.name}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...mainPages, ...iconPages]
}