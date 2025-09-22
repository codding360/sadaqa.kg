import { notFound } from 'next/navigation'
import { getUserBySlug, getAllUserSlugs } from '@/lib/users'
import { BankSelectionScreen } from '@/components/bank-selection-screen'

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const slugs = getAllUserSlugs()
  
  return slugs.map((slug) => ({
    slug: slug,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const user = getUserBySlug(params.slug)
  
  if (!user) {
    return {
      title: 'Пользователь не найден',
      description: 'Запрошенная страница пользователя не найдена.',
    }
  }

  return {
    title: `${user.name} - Пожертвования`,
    description: user.description,
    openGraph: {
      title: `${user.name} - Пожертвования`,
      description: user.description,
      images: [user.avatar],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: `${user.name} - Пожертвования`,
      description: user.description,
      images: [user.avatar],
    },
  }
}

export default function UserPage({ params }: PageProps) {
  const user = getUserBySlug(params.slug)
  
  if (!user) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      <BankSelectionScreen user={user} />
    </main>
  )
}
