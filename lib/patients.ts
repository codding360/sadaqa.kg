import { patients } from "@/constants/patients"

export interface Bank {
  id: string
  name: string
  logo: string
  phone: string
  paymentReceiver?: string
  startColor: string
  endColor: string
  destination?: string
}

export interface Patient {
  id: string
  slug: string
  name: string
  avatar: string
  description: string
  banks: Bank[]
}

export function getPatientBySlug(slug: string): Patient | undefined {
  return patients.find(patient => patient.slug === slug)
}

export function getAllPatientSlugs(): string[] {
  return patients.map(patient => patient.slug)
}
