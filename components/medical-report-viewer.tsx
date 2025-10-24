"use client"

import { useState } from "react"
import { FileText, Download, Maximize2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface MedicalReportViewerProps {
  pdfPath: string
  fileName: string
  patientName: string
  className?: string
}

export function MedicalReportViewer({ 
  pdfPath, 
  fileName, 
  patientName,
  className = "" 
}: MedicalReportViewerProps) {
  const [isFullScreen, setIsFullScreen] = useState(false)

  const handleDownload = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    const link = document.createElement('a')
    link.href = pdfPath
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const openFullScreen = () => {
    setIsFullScreen(true)
  }

  return (
    <>
      {/* Medical Report Card */}
      <div className={`rounded-xl shadow-sm overflow-hidden ${className}`}>
        {/* Header */}
        <div className="px-5 py-4 shadow-none border-none bg-white cursor-pointer py-2 transition-all duration-200 opacity-90 hover:opacity-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Медицинский отчет</h3>
                <p className="text-xs text-gray-600">{patientName}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              className="flex items-center space-x-1.5 hover:bg-blue-50"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Скачать</span>
            </Button>
          </div>
        </div>

        {/* PDF Preview Container */}
        <div className="relative shadow-none border-none bg-white cursor-pointer py-2 transition-all duration-200 opacity-90 hover:opacity-100">
          {/* Overlay with View Button */}
          <div 
            className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10 flex items-end justify-center pb-4 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
            onClick={openFullScreen}
          >
            <Button 
              className="bg-white text-gray-900 hover:bg-white/90 shadow-lg"
              onClick={openFullScreen}
            >
              <Maximize2 className="w-4 h-4 mr-2" />
              Открыть полный отчет
            </Button>
          </div>

          {/* PDF Preview iframe */}
          <div className="relative" onClick={openFullScreen}>
            <iframe
              src={`${pdfPath}#toolbar=0&navpanes=0&scrollbar=0`}
              className="w-full h-[30vh] border-0 pointer-events-none"
              title={fileName}
            />
          </div>

          {/* Gradient Fade at Bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-100 to-transparent pointer-events-none" />
        </div>

        {/* Footer Info */}
        <div className="px-5 py-3 shadow-none border-none bg-white cursor-pointer py-2 transition-all duration-200 opacity-90 hover:opacity-100">
          <div className="flex items-center justify-between text-xs text-black-600">
            <span>Нажмите на документ, чтобы просмотреть полностью</span>
            <button 
              onClick={openFullScreen}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Открыть →
            </button>
          </div>
        </div>
      </div>

      {/* Full Screen Modal */}
      <Dialog open={isFullScreen} onOpenChange={setIsFullScreen}>
        <DialogContent className="max-w-5xl w-[95vw] h-[95vh] p-0 gap-0">
          {/* Modal Content */}
          <div className="flex-1 bg-gray-100 p-4 pt-10">
            <iframe
              src={`${pdfPath}#toolbar=0&navpanes=0&zoom=page-fit`}
              className="w-full h-full border-0 rounded-lg shadow-lg bg-white"
              title={fileName}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

