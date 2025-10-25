"use client"
import { Patient } from "@/lib/patients"
import Image from "next/image"

interface BankSelectionScreenProps {
  patient: Patient
}

export function BankSelectionScreen({ patient }: BankSelectionScreenProps) {
  const handleBankClick = (bankId: string, bankName: string, destination?: string) => {
    console.log(`Patient clicked on: ${bankName}`)
    
    if (destination) {
      // Open the payment link in a new tab
      window.open(destination, '_blank')
    } else {
      // Handle other bank selection logic here
      console.log(`No destination URL available for ${bankName}`)
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
        <div className="space-y-3">
          {patient.banks.map((bank) => (
            <button
              key={bank.id}
              className="w-full shadow-none border-none bg-white cursor-pointer py-2 transition-all duration-200 opacity-90 hover:opacity-100 rounded-lg text-left"
              onClick={() => handleBankClick(bank.id, bank.name, bank.destination)}
            >
              <div className="flex items-center justify-between py-2 px-5">
                {/* Left side - Bank Logo and Info */}
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    <img
                      src={bank.logo}
                      alt={`${bank.name} logo`}
                      className="h-8 w-8 rounded-lg object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-card-foreground leading-snug tracking-tight">{bank.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed font-medium">{bank.phone}</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-sm font-semibold text-card-foreground tracking-tight">{bank.paymentReceiver}</p>
                </div>
              </div>
            </button>
          ))}
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
