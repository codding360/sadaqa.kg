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
      {
        id: "obank",
        name: "OBank",
        logo: "/obank.png",
        phone: "+996 (706) 169 293",
        paymentReceiver: "Бактыгул Т.",
        startColor: "#007E8B",
        endColor: "#009C4D",
        destination: "https://api.dengi.o.kg/#00020101021132680012p2p.dengi.kg01048580111214324807587510129967061692931202111302123411%D0%91%D0%B0%D0%BA%D1%82%D1%8B%D0%B3%D1%83%D0%BB%20%D0%A2.520473995303417540105908O%21Den%27gi63047E85"
      }
    ]
  },
]

export function getUserBySlug(slug: string): User | undefined {
  return users.find(user => user.slug === slug)
}

export function getAllUserSlugs(): string[] {
  return users.map(user => user.slug)
}
