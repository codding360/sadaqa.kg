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
      images: [patient.avatar],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: `${patient.name} - Пожертвования`,
      description: patient.description,
      images: [patient.avatar],
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
