"use client"
import { Card } from "@/components/ui/card"
import { User } from "@/lib/users"

interface BankSelectionScreenProps {
  user: User
}

export function BankSelectionScreen({ user }: BankSelectionScreenProps) {
  const handleBankClick = (bankId: string, bankName: string, destination?: string) => {
    console.log(`User clicked on: ${bankName}`)
    
    if (destination) {
      // Open the payment link in a new tab
      window.open(destination, '_blank')
    } else {
      // Handle other bank selection logic here
      console.log(`No destination URL available for ${bankName}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#FF8008] to-[#FFC837] p-6">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full overflow-hidden border-2 border-white/20">
              <img
                src={user.avatar}
                alt="User Avatar"
                className="h-16 w-16 object-cover"
              />
            </div>
          </div>
          <h1 className="mb-3 text-4xl font-bold text-white tracking-tight">{user.name}</h1>
          <p className="text-white/90 text-base font-normal leading-relaxed max-w-md mx-auto">{user.description}</p>
        </div>

        {/* Bank Selection List */}
        <div className="space-y-3">
          {user.banks.map((bank) => (
            <Card
              key={bank.id}
              className="shadow-none border-none bg-white cursor-pointer py-2 transition-all duration-200 opacity-90 hover:opacity-100"
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
            </Card>
          ))}
        </div>

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
