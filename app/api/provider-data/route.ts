import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export interface ProviderData {
  "Provider Name": [string, string];
  "Provider Type": string;
  "Monthly Visits": number;
  "Trustpilot Rating": [string, string];
  "Fundings": string;
  "Pricing Source": string;
  "Promotions": string;
  "4090 On-Demand": string;
  "4090 Monthly": string;
  "4090 Serverless": string;
  "RTX 6000 Ada, On-Demand": string;
  "RTX 6000 Ada, Monthly": string;
  "RTX 6000 Ada, Serverless": string;
  "A100 SXM4, On-Demand": string;
  "A100 SXM4, Monthly": string;
  "A100 SXM4, Serverless": string;
  "H100 SXM, On-Demand": string;
  "H100 SXM, Monthly": string;
  "H100 SXM, Serverless": string;
  "Storage": string;
  "Regions": string;
  "Bare Metal Support": string;
  "Container Support": string;
  "preConfigured Container Image": string;
  "Serverless Support": string;
  "Model APIs (vendor hosted opensouce models)": string;
  "Model APIs: LLM playground; Image playground": string;
  "Batch jobs": string;
  "Other Features": string;
}

export async function GET() {
  console.log('API route handler started');
  const dataDirectory = path.join(process.cwd(), 'data', 'provider-info')
  console.log('Data directory path:', dataDirectory);

  try {
    const filenames = await fs.readdir(dataDirectory)
    console.log('Files in directory:', filenames)

    const jsonFiles = filenames.filter(filename => filename.endsWith('.json'))
    console.log('JSON files found:', jsonFiles)

    if (jsonFiles.length === 0) {
      console.error('No JSON files found in:', dataDirectory)
      return NextResponse.json([])
    }

    const providerData: ProviderData[] = await Promise.all(jsonFiles.map(async filename => {
      const filePath = path.join(dataDirectory, filename)
      console.log('Reading file:', filePath)
      const fileContents = await fs.readFile(filePath, 'utf8')
      return JSON.parse(fileContents) as ProviderData
    }))

    console.log('Provider data loaded successfully:', providerData.length, 'providers')
    return NextResponse.json(providerData)
  } catch (error) {
    console.error('Error loading provider data:', error)
    return NextResponse.json({ error: `Error loading provider data: ${error instanceof Error ? error.message : String(error)}` }, { status: 500 })
  }
}

