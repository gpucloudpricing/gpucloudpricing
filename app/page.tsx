import { Metadata } from 'next'
import Banner from './components/Banner'
import ComparisonTable from './components/ComparisonTable'
import { ProviderData } from '@/types/provider'
import path from 'path'
import fs from 'fs/promises'

export const metadata: Metadata = {
  title: 'GPU Cloud Pricing | Compare Providers - GPUCloudPricing.com',
  description: 'Compare GPU cloud pricing at GPUCloudPricing.com. Find the best and cheapest GPU cloud providers, compare features, and get email alerts on exclusive deals',
  alternates: {
    canonical: 'https://gpucloudpricing.com',
  },
}

async function getProviderData(): Promise<ProviderData[]> {
  const dataDirectory = path.join(process.cwd(), 'data', 'provider-info')
  const filenames = await fs.readdir(dataDirectory)
  const jsonFiles = filenames.filter(filename => filename.endsWith('.json'))

  const providerData = await Promise.all(jsonFiles.map(async filename => {
    const filePath = path.join(dataDirectory, filename)
    const fileContents = await fs.readFile(filePath, 'utf8')
    return JSON.parse(fileContents) as ProviderData
  }))

  return providerData
}

export default async function Home() {
  const providerData = await getProviderData();

  return (
    <main className="min-h-screen">
      <Banner />
      <ComparisonTable providerData={providerData} />
    </main>
  )
}

