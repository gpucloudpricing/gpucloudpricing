import Link from 'next/link'
import { Twitter, Mail, Github } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-800 to-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <h2 className="font-bold text-xl mb-4 text-blue-300">Connect With Us</h2>
            <div className="flex space-x-4">
              <a href="https://twitter.com/gpucloudpricing" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition-colors duration-300">
                <Twitter className="h-8 w-8" />
              </a>
              <a href="mailto:contact@gpucloudpricing.com" className="text-white hover:text-blue-400 transition-colors duration-300">
                <Mail className="h-8 w-8" />
              </a>
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="font-bold text-xl mb-4 text-blue-300">About Us</h2>
            <p className="text-sm text-gray-300 leading-relaxed">
              GPUCloudPricing.com is dedicated to providing up-to-date and comprehensive comparisons of GPU cloud providers, helping you choose the best GPU cloud provider and make informed purchase decisions.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="font-bold text-xl mb-4 text-blue-300">Contribute</h2>
            <a href="https://github.com/gpucloudpricing/gpucloudpricing" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition-colors duration-300 flex items-center">
              <Github className="h-8 w-8 mr-2" />
              <span>Submit changes or requests on GitHub</span>
            </a>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-700 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} GPUCloudPricing.com. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

