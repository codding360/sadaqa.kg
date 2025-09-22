import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#FF8008] to-[#FFC837] p-6 flex items-center justify-center">
      <Card className="max-w-md mx-auto p-8 text-center bg-white/95 backdrop-blur-sm">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Пользователь не найден</h2>
          <p className="text-gray-600 mb-6">
            Страница пользователя, которую вы ищите, не существует или была перемещена.
          </p>
        </div>
        
        <div className="space-y-4">
          <Button asChild className="w-full">
            <Link href="/">
              Перейти на главную
            </Link>
          </Button>
          
          <p className="text-sm text-gray-500">
            Если вы считаете, что это ошибка, пожалуйста, свяжитесь с поддержкой.
          </p>
        </div>
      </Card>
    </div>
  )
}
