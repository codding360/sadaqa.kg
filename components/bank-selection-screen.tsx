"use client"
import { Patient } from "@/lib/patients"
import Image from "next/image"
import { CopyIcon, CheckIcon } from "lucide-react"
import { useState, useEffect } from "react"
import { sendToTelegram } from "@/components/source-analytics"
import { sourceTracker } from "@/lib/source-tracker"

interface BankSelectionScreenProps {
  patient: Patient
}

export function BankSelectionScreen({ patient }: BankSelectionScreenProps) {
  const [copied, setCopied] = useState(false)

  // Track page close events only
  useEffect(() => {
    const handlePageHide = () => {
      // User is leaving the page
      const finalSessionInfo = sourceTracker.trackAction('User closing page', {
        patientName: patient.name,
        finalAction: 'page_close'
      })
      sendToTelegram(finalSessionInfo, true) // Use beacon for reliability
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // User switched tabs or minimized browser
        const finalSessionInfo = sourceTracker.trackAction('User closing page', {
          patientName: patient.name,
          finalAction: 'page_leave'
        })
        sendToTelegram(finalSessionInfo, true) // Use beacon for reliability
      }
    }

    // Use multiple events for better coverage
    window.addEventListener('pagehide', handlePageHide)
    // window.addEventListener('beforeunload', handlePageHide)
    // document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.removeEventListener('pagehide', handlePageHide)
      // window.removeEventListener('beforeunload', handlePageHide)
      // document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [patient.name])

  const handleBankClick = (bankId: string, bankName: string, destination?: string) => {
    // Track the bank click action with session duration
    const actionInfo = sourceTracker.trackAction(`Clicked bank: ${bankName}`, {
      bankId,
      bankName,
      destination,
      patientName: patient.name
    })
    
    sendToTelegram(actionInfo)
    
    if (destination) {
      // Open the payment link in a new tab
      window.open(destination, '_blank')
    } else {
      // Handle other bank selection logic here
      console.log(`No destination URL available for ${bankName}`)
    }
  }

  const handleCopyPhone = async () => {
    const mainBank = patient.banks.find((bank) => bank.id === "obank") || patient.banks[0]
    const phoneNumber = mainBank?.phone || patient.phoneNumber || ''
    try {
      await navigator.clipboard.writeText(phoneNumber)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy phone number:', err)
    }
  }

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full overflow-hidden border-2 border-white/20">
              <img
                src={patient.avatar}
                alt="Patient Avatar"
                className="h-16 w-16 object-cover"
              />
            </div>
          </div>
          <h1 className="mb-3 text-4xl font-bold text-white tracking-tight">{patient.name}</h1>
          <p className="text-white/90 text-base font-normal leading-relaxed max-w-md mx-auto">{patient.description}</p>
        </div>

        {/* Bank Selection List */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-white text-center">
            Выберите реквизиты для получения QR кода
          </h2>
        </div>
        <div className="space-y-3">
          {patient.banks.map((bank) => (
            <button
              key={bank.id}
              className="w-full shadow-none border-none bg-white cursor-pointer py-4 transition-all duration-10 opacity-90 hover:opacity-100 rounded-lg text-left animate-pulse hover:animate-none"
              onClick={() => handleBankClick(bank.id, bank.name, bank.destination)}
            >
              <div className="px-5">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <img
                      src={bank.logo}
                      alt={`${bank.name} logo`}
                      className="h-10 w-10 rounded-lg object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-base font-medium text-card-foreground">
                      {bank.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {bank.phone}
                    </p>
                  </div>
                </div>
              </div>
            </button>
          ))}
          {/* patient.banks.find((bank) => bank.isMainReceiver)?.phone */}
          <button
              className="w-full shadow-none border-none bg-white cursor-pointer py-4 transition-all duration-10 hover:opacity-100 rounded-lg text-left animate-pulse hover:animate-none"
              onClick={handleCopyPhone}
            >
              <div className="px-5">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    {copied ? (
                      <CheckIcon className="h-10 w-10 text-green-600" />
                    ) : (
                      <CopyIcon className="h-10 w-10" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-base font-medium text-card-foreground">
                      {copied 
                        ? "Скопировано!" 
                        : `Скопировать номер для оплаты другом банке`
                      }
                    </p>
                    {!copied && (
                      <>
                        <p className="text-sm text-gray-600 mt-1">
                          Получатель: {patient.banks.find((bank) => bank.id === "obank")?.paymentReceiver || patient.banks[0]?.paymentReceiver}
                        </p>
                        <p className="text-sm text-gray-600">
                          Номер: {patient.banks.find((bank) => bank.id === "obank")?.phone || patient.banks[0]?.phone}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </button>
        </div>

        {/* Separator Line */}
        {patient.reportImages && (
          <div className="my-6">
            <div className="border-t border-white/20"></div>
          </div>
        )}

        {/* Medical Report Image */}
        {patient.reportImages && (
          <div className="mb-6">
            {
              patient.reportImages.map((image) => (
                <div className="bg-white rounded-xl overflow-hidden shadow-sm mb-4">
                <div className="relative w-full" style={{ aspectRatio: '210/297' }}>
                  <Image
                    src={`/medical-reports/${patient.slug}/${image}`}
                    alt={`Медицинский отчет - ${patient.name}`}
                    fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 672px"
                    />
                  </div>
                </div>
            ))
          }
        </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center bg-white/10 p-6 rounded-xl backdrop-blur-sm">
          <p className="text-white/90 text-sm font-medium leading-relaxed max-w-sm mx-auto">
            Спасибо, что заглянули! Если хотите, можете пожертвовать хотя бы 1 сом — пусть Всевышний будет доволен вами.
          </p>
          <p className="text-white/70 text-xs font-normal mt-3 tracking-wide">
            Разработано с <a href="https://instagram.com/marat.dev" className="text-white/70 text-xs font-normal mt-3 tracking-wide">@marat.dev❤️</a>
          </p>
        </div>
      </div>
    </div>
  )
}
