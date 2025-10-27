"use client"
import { Patient } from "@/lib/patients"
import Image from "next/image"
import { CopyIcon, CheckIcon } from "lucide-react"
import { useState } from "react"

interface BankSelectionScreenProps {
  patient: Patient
}

export function BankSelectionScreen({ patient }: BankSelectionScreenProps) {
  const [copied, setCopied] = useState(false)

  const handleBankClick = (bankId: string, bankName: string, destination?: string) => {
    if (typeof window !== 'undefined') {
      // Meta Pixel - Donate event
      if (window.fbq) {
        window.fbq('track', 'Donate')
      }

      // Umami Analytics - Donate event
      if (window.umami) {
        window.umami.track('Donate', {
          patient: patient.name,
          patient_slug: patient.slug,
          bank_id: bankId,
          bank_name: bankName,
          has_destination: !!destination
        })
      }
    }

    if (destination) {
      // Open the payment link in the same tab
      window.location.href = destination
    } else {
      // Handle other bank selection logic here
      console.log(`No destination URL available for ${bankName}`)
    }
  }

  const handleCopyPhone = async () => {
    const mainBank = patient.banks.find((bank) => bank.id === "obank") || patient.banks[0]
    const phoneNumber = mainBank?.phone || patient.phoneNumber || ''
    
    if (typeof window !== 'undefined') {
      // Meta Pixel - Donate event
      if (window.fbq) {
        window.fbq('track', 'Donate')
      }

      // Umami Analytics - Donate event
      if (window.umami) {
        window.umami.track('Donate', {
          patient: patient.name,
          patient_slug: patient.slug,
          bank_id: mainBank?.id,
          bank_name: mainBank?.name,
          action: 'copy_phone'
        })
      }
    }
    
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
            Выберите реквизиты
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {patient.banks.map((bank) => (
            <div key={bank.id} className="flex flex-col items-center">
              <div
                className="w-full bg-white rounded-lg overflow-hidden mb-2 transition-all duration-200 hover:shadow-lg"
              >
                <img
                  src={bank.logo}
                  alt={`${bank.name} logo`}
                  className="w-full h-auto object-contain"
                />
              </div>
              <button
                className="cursor-pointer w-full bg-white/90 hover:bg-white text-gray-900 font-medium py-2 px-4 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                onClick={() => handleBankClick(bank.id, bank.name, bank.destination)}
              >
                Открыть {bank.name}
              </button>
            </div>
          ))}
          
          {/* Copy button - spans full width on all screens */}
          <div className="col-span-1 md:col-span-2">
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
                <div key={image} className="bg-white rounded-xl overflow-hidden shadow-sm mb-4">
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
