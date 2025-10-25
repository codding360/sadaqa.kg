import { Patient } from "@/lib/patients"

export const patients: Patient[] = [
    {
      id: "marat-sharshenaliev-uuid",
      slug: "marat-sharshenaliev",
      name: "Марат Шаршеналиев",
      avatar: "/marat_sharshenaliev.png",
      description: "Срочно нужна пересадка печени, стоимость операции — 20 000 долларов США (Индия). У пациента альвеолярная эхинококкозная инфекция печени.",
      reportImages: ["1.jpg", '2.jpg'],
      banks: [
        {
          id: "mbank-sister",
          name: "MBank",
          logo: "/mbank_icon_square.png",
          phone: "+996709847411",
          paymentReceiver: "Махабат Ш. (Cестра)",
          startColor: "#007E8B",
          endColor: "#009C4D",
          destination: "https://app.mbank.kg/qr/#00020101021132440012c2c.mbank.kg01020210129967098474111302125204999953034175912MAKhABAT%20Sh.6304ee70",
        },
        { 
          id: "obank",
          name: "OBank",
          logo: "/obank.png",
          phone: "+996509690790",
          paymentReceiver: "Марат Ш.",
          startColor: "#007E8B",
          endColor: "#009C4D",
          destination: "https://api.dengi.o.kg/#00020101021132680012p2p.dengi.kg01048580111212744001402910129965096907901202111302123408%D0%9C%D0%90%D0%A0%D0%90%D0%A2%20%D0%A8.520473995303417540105906O%21Bank6304B70B"
        },
        {
          id: "sber",
          name: "Сбербанк",
          logo: "/sberbank.png",
          phone: "+79015907449",
          paymentReceiver: "Шарапат Ш.",
          startColor: "#007E8B",
          endColor: "#009C4D",
          destination: "https://www.sberbank.com/sms/pbpn?requisiteNumber=79015907449"
        }
      ]
    }
  ]