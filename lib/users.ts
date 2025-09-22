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

export interface User {
  id: string
  slug: string
  name: string
  avatar: string
  description: string
  banks: Bank[]
}

// Sample users data - you can expand this or move to a database
export const users: User[] = [
  {
    id: "aimeerim-uuid",
    slug: "aimeerim",
    name: "Save Aimeerim",
    avatar: "/aimeerim.jpg",
    description: "Диагноз: ЗОЛГЕНСМА. Сбор нужной суммы: 170 млн. сомов.",
    banks: [
      {
        id: "mbank",
        name: "MBank",
        logo: "/mbank_icon_square.png",
        phone: "+996 (777) 801 594",
        paymentReceiver: "Луизя М.",
        startColor: "#007E8B",
        endColor: "#009C4D",
        destination: "https://app.mbank.kg/qr/#00020101021132440012c2c.mbank.kg01020210129967778015941302125204999953034175909LUIZIa%20M.63047fd1",
      },
    ]
  },
  {
    id: "john-uuid",
    slug: "john-doe",
    name: "Help John Doe",
    avatar: "/logo.png", // Using existing logo as placeholder
    description: "Medical treatment fund. Every donation helps save a life.",
    banks: [
      {
        id: "mbank",
        name: "MBank",
        logo: "/mbank_icon_square.png",
        phone: "+996 (555) 123 456",
        paymentReceiver: "John D.",
        startColor: "#007E8B",
        endColor: "#009C4D",
      },
    ]
  },
  {
    id: "maria-uuid", 
    slug: "maria",
    name: "Support Maria",
    avatar: "/logo.png", // Using existing logo as placeholder
    description: "Urgent surgery needed. Your support means everything.",
    banks: [
      {
        id: "mbank",
        name: "MBank", 
        logo: "/mbank_icon_square.png",
        phone: "+996 (700) 987 654",
        paymentReceiver: "Maria K.",
        startColor: "#007E8B",
        endColor: "#009C4D",
      },
    ]
  }
]

export function getUserBySlug(slug: string): User | undefined {
  return users.find(user => user.slug === slug)
}

export function getAllUserSlugs(): string[] {
  return users.map(user => user.slug)
}
