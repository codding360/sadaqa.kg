import { notFound } from 'next/navigation'
import { getPatientBySlug, getAllPatientSlugs } from '@/lib/patients'
import { BankSelectionScreen } from '@/components/bank-selection-screen'

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const slugs = getAllPatientSlugs()
  
  return slugs.map((slug) => ({
    slug: slug,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const patient = getPatientBySlug(params.slug)
  
  if (!patient) {
    return {
      title: 'Пользователь не найден',
      description: 'Запрошенная страница пользователя не найдена.',
    }
  }

  return {
    title: `${patient.name} - Пожертвования`,
    description: patient.description,
    openGraph: {
      title: `${patient.name} - Пожертвования`,
      description: patient.description,
      url: `https://sadaqa.kg/${params.slug}`,
      siteName: 'Sadaqa.kg',
      images: [
        {
          url: `https://sadaqa.kg${patient.avatar}`,
          width: 1200,
          height: 630,
          alt: `Фото ${patient.name}`,
        }
      ],
      type: 'website',
      locale: 'ru_RU',
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: `${patient.name} - Пожертвования`,
      description: patient.description,
      images: [`https://sadaqa.kg${patient.avatar}`],
      creator: '@marat.dev',
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `https://sadaqa.kg/${params.slug}`,
    },
  }
}

export default function UserPage({ params }: PageProps) {
  const patient = getPatientBySlug(params.slug)
  
  if (!patient) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <BankSelectionScreen patient={patient} />
    </main>
  )
}
