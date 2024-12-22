'use client'

import { useState, useCallback } from 'react'
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import type { ProviderData } from '@/types/provider'

interface ComparisonTableProps {
  providerData: ProviderData[]
}

const defaultColumnWidth = 176

const ComparisonTable: React.FC<ComparisonTableProps> = ({ providerData }) => {
  const [selectedGPU, setSelectedGPU] = useState<string>("General Info")
  const [columnWidths, setColumnWidths] = useState<{ [key: string]: number }>({
    "Provider Name": 100,
    "Pricing Source": 150，
    "Monthly Visits": 100，
    "Fundings": 210，
    "Promotions": 210
  })
  const [resizingColumn, setResizingColumn] = useState<string | null>(null)

  const handleGPUChange = (value: string) => {
    if (value) setSelectedGPU(value)
  }

  const gpuTypes = ["General Info", "Feature Comparison", "4090", "RTX 6000", "A100", "H100"]

  const getColumnVisibility = useCallback((column: string) => {
    switch (selectedGPU) {
      case 'General Info':
        return ["Provider Name", "Provider Type", "Pricing Source","Monthly Visits", "Trustpilot Rating", "Fundings"].includes(column)
      case 'Feature Comparison':
        return ["Provider Name", "Regions", "Bare Metal Support", "Container Support", "preConfigured Container Image", "Serverless Support", "Model APIs (vendor hosted opensouce models)", "Model APIs: LLM playground; Image playground", "Batch jobs", "Other Features"].includes(column)
      case '4090':
        return ["Provider Name", "Promotions", "4090 On-Demand", "4090 Monthly", "4090 Serverless", "Storage"].includes(column)
      case 'RTX 6000':
        return ["Provider Name", "Promotions", "RTX 6000 Ada, On-Demand", "RTX 6000 Ada, Monthly", "RTX 6000 Ada, Serverless", "Storage"].includes(column)
      case 'A100':
        return ["Provider Name", "Promotions", "A100 SXM4, On-Demand", "A100 SXM4, Monthly", "A100 SXM4, Serverless", "Storage"].includes(column)
      case 'H100':
        return ["Provider Name", "Promotions", "H100 SXM, On-Demand", "H100 SXM, Monthly", "H100 SXM, Serverless", "Storage"].includes(column)
      default:
        return true
    }
  }, [selectedGPU])

  const handleColumnResize = useCallback((headerName: string, newWidth: number) => {
    setColumnWidths(prev => ({
      ...prev,
      [headerName]: Math.max(newWidth, 100) // Minimum width of 100px
    }))
  }, [])

  const startResizing = useCallback((event: React.MouseEvent<HTMLDivElement> | React.TouchEvent, headerName: string) => {
    event.preventDefault()
    setResizingColumn(headerName)
    const startX = 'pageX' in event ? event.pageX : event.touches[0].clientX
    const startWidth = columnWidths[headerName] || defaultColumnWidth

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      const currentX = 'touches' in e ? e.touches[0].clientX : e.pageX
      const newWidth = Math.max(startWidth + (currentX - startX), 100) // Minimum width of 100px
      handleColumnResize(headerName, newWidth)
    }

    const handleMouseUp = () => {
      setResizingColumn(null)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('touchmove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('touchend', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('touchmove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('touchend', handleMouseUp)
  }, [columnWidths, handleColumnResize])

  const renderCell = (column: string, value: any) => {
    if (column === "Provider Name" || column === "Trustpilot Rating") {
      return (
        <a href={value[1]} target="_blank" rel="noopener noreferrer nofollow" className="text-blue-600 hover:underline">
          {value[0]}
        </a>
      )
    } else if (column === "Pricing Source") {
      return (
        <a 
          href={value} 
          target="_blank" 
          rel="noopener noreferrer nofollow"
          className="text-blue-600 hover:text-blue-800 underline break-all"
        >
          {value}
        </a>
      )
    } else {
      return Array.isArray(value) ? value[0] : value
    }
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          GPU Cloud Provider Comparison
        </h2>
        <div className="bg-white p-6 backdrop-filter backdrop-blur-lg bg-opacity-90 overflow-hidden rounded-xl shadow-md">
          <h3 className={`text-xl font-semibold mb-4 ${selectedGPU === "General Info" ? "" : "sr-only"}`}>General Info</h3>
          <p className={`text-sm text-gray-600 mb-4 ${selectedGPU === "General Info" ? "" : "sr-only"}`}>
            Who are they, how do they perform in terms of web traffic, what do others say about them, and should you be concerned about their potential bankruptcy (i.e., their funding status)?
          </p>
          <h3 className={`text-xl font-semibold mb-4 ${selectedGPU === "Feature Comparison" ? "" : "sr-only"}`}>Feature Comparison</h3>
          <p className={`text-sm text-gray-600 mb-4 ${selectedGPU === "Feature Comparison" ? "" : "sr-only"}`}>
            Unlike the established CPU cloud market, GPU cloud providers vary greatly in what they offer. Understanding their features and knowing how your AI applications will use GPU resources is essential.
          </p>
          <h3 className={`text-xl font-semibold mb-4 ${["4090", "RTX 6000", "A100", "H100"].includes(selectedGPU) ? "" : "sr-only"}`}>Pricing Comparison</h3>
          <p className={`text-sm text-gray-600 mb-4 ${["4090", "RTX 6000", "A100", "H100"].includes(selectedGPU) ? "" : "sr-only"}`}>
            Which provider is truly the cheapest? Compare the pricing of commonly used GPU models on an apples-to-apples basis with identical specifications.
          </p>
          <div className="mb-6 flex justify-center">
            <ToggleGroup type="single" value={selectedGPU} onValueChange={handleGPUChange} className="flex flex-wrap gap-2 justify-center">
              {gpuTypes.slice(0, 2).map((gpu) => (
                <ToggleGroupItem key={gpu} value={gpu} aria-label={`Toggle ${gpu}`} className="px-4 py-2 rounded-full text-sm">
                  <span className="inline font-normal text-sm">{gpu}</span>
                </ToggleGroupItem>
              ))}
              {gpuTypes.slice(2).map((gpu) => (
                <h4 key={gpu} className="m-0 p-0">
                  <ToggleGroupItem value={gpu} aria-label={`Toggle ${gpu}`} className="px-4 py-2 rounded-full text-sm">
                    <span className="inline font-normal text-sm">{gpu}</span>
                  </ToggleGroupItem>
                </h4>
              ))}
            </ToggleGroup>
          </div>
          <div className="overflow-x-auto">
            <table 
              className="w-full text-sm text-left text-gray-500 border-collapse"
              itemScope 
              itemType="https://schema.org/Table"
            >
              <caption className="sr-only">GPU Cloud Provider Comparison Table</caption>
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  {Object.keys(providerData[0]).map((column) => (
                    <th 
                      key={column} 
                      scope="col"
                      className={`px-6 py-3 border-b border-gray-200 relative bg-gradient-to-b from-gray-50 to-gray-100 ${resizingColumn === column ? 'bg-blue-100' : ''} ${getColumnVisibility(column) ? '' : 'hidden'}`}
                      style={{ width: `${columnWidths[column] || defaultColumnWidth}px` }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="break-words whitespace-normal font-semibold">{column}</span>
                        <div
                          className={`absolute right-0 top-0 h-full w-1 bg-gray-300 cursor-col-resize hover:bg-blue-500 transition-colors duration-300 ${resizingColumn === column ? 'bg-blue-500' : ''}`}
                          onMouseDown={(e) => startResizing(e, column)}
                          onTouchStart={(e) => startResizing(e, column)}
                        />
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {providerData.map((provider, index) => (
                  <tr 
                    key={index} 
                    className="bg-white border-b hover:bg-gray-50 transition-colors duration-150"
                    itemScope 
                    itemType="https://schema.org/Organization"
                  >
                    {Object.entries(provider).map(([column, value]) => (
                      <td 
                        key={`${index}-${column}`} 
                        className={`px-6 py-4 border-b border-gray-200 break-words whitespace-normal ${getColumnVisibility(column) ? '' : 'hidden'}`}
                        style={{ width: `${columnWidths[column] || defaultColumnWidth}px` }}
                        itemProp={column.toLowerCase().replace(/\s+/g, '-')}
                      >
                        {renderCell(column, value)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="mt-6 text-sm text-gray-500 italic text-center">
          GPU Cloud Provider Information – last updated on December 12, 2024
        </p>
      </div>
    </section>
  )
}

export default ComparisonTable

