"use client"

import { FileText, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PDFViewerProps {
  pdfPath: string
  fileName: string
  className?: string
}

export function PDFViewer({ pdfPath, fileName, className = "" }: PDFViewerProps) {
  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = pdfPath
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}>
      {/* PDF Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 text-red-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900">{fileName}</h3>
              <p className="text-xs text-gray-500">PDF документ</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            className="flex items-center space-x-1"
          >
            <Download className="w-4 h-4" />
            <span>Скачать</span>
          </Button>
        </div>
      </div>
      
      {/* PDF Content */}
      <div className="p-4">
        <iframe
          src={pdfPath + '#toolbar=0&navpanes=0&scrollbar=0&statusbar=0&messages=0&scrollbar=0'}
          className="w-full h-[100vh] border-0 rounded-lg"
          title={fileName}
        />
      </div>
    </div>
  )
}
