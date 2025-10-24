import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { type Patient } from '@/lib/patients'
import { patients } from '@/constants/patients'

export default function Home() {
  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full overflow-hidden border-2 border-white/20">
              <img
                src="/logo.png"
                alt="Logo"
                className="h-16 w-16 object-cover"
              />
            </div>
          </div>
          <h1 className="mb-3 text-4xl font-bold text-white tracking-tight">Пожертвования</h1>
          <p className="text-white/90 text-base font-normal leading-relaxed max-w-md mx-auto">
            Выберите человека, чтобы посмотреть информацию о пожертвованиях
          </p>
        </div>

        {/* Users List */}
        <div className="space-y-3">
          {patients.map((patient: Patient) => (
            <Card
              key={patient.id}
              className="shadow-none border-none bg-white cursor-pointer py-2 transition-all duration-200 opacity-90 hover:opacity-100"
            >
              <Link href={`/${patient.slug}`} className="block">
                <div className="flex items-center justify-between py-2 px-5">
                  {/* Left side - User Avatar and Info */}
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      <img
                        src={patient.avatar}
                        alt={`${patient.name} avatar`}
                        className="h-12 w-12 rounded-full object-cover border-2 border-gray-200"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-card-foreground leading-snug tracking-tight">{patient.name}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed font-medium line-clamp-2">{patient.description}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                      Посмотреть →
                    </Button>
                  </div>
                </div>
              </Link>
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
    </main>
  )
}
