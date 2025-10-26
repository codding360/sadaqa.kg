import { Patient } from "@/lib/patients"

export const patients: Patient[] = [
    {
      id: "marat-sharshenaliev-uuid",
      slug: "marat-sharshenaliev",
      name: "Марат Шаршеналиев",
      phoneNumber: "+996509690790",
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
          destination: "https://api.dengi.o.kg/#00020101021132680012p2p.dengi.kg01048580111212744001402910129965096907901202111302123408%D0%9C%D0%90%D0%A0%D0%90%D0%A2%20%D0%A8.520473995303417540105906O%21Bank6304B70B",
        },
        {
          id: "sber",
          name: "Сбербанк",
          logo: "/sberbank.png",
          phone: "+79015907449",
          paymentReceiver: "Шарапат Ш.",
          startColor: "#007E8B",
          endColor: "#009C4D",
          destination: "https://www.sberbank.com/sms/pbpn?requisiteNumber=79015907449",
        },
        {
          id: "kompanion",
          name: "Компанион",
          logo: "/kompanion.png",
          phone: "+996509690790",
          paymentReceiver: "Марат Ш.",
          startColor: "#007E8B",
          endColor: "#009C4D",
          destination: "https://pay.payqr.kg/#0002010102115401032550015qr.kompanion.kg01041005101299650969079012021113021233230119%D0%9F%D0%BE%D0%BF%D0%BE%D0%BB%D0%BD%D0%B5%D0%BD%D0%B8%D0%B5+%D0%BA%D0%BE%D1%88%D0%B5%D0%BB%D1%8C%D0%BA%D0%B05303417520460125914KOMPANION+BANK3408%D0%9C%D0%90%D0%A0%D0%90%D0%A2+%D0%A8.6304A5AB",
        },
        {
          id: "optimabank",
          name: "Оптима банк",
          logo: "/optima.png",
          phone: "+996702209040",
          paymentReceiver: "Нурсултан Ж.",
          startColor: "#007E8B",
          endColor: "#009C4D",
          destination: "https://optimabank.kg/index.php?lang=ru#00020101021132680013QR.Optima.C2C010310010129965022090401112nursultan%20zh1202111302125204999953034175912nursultan%20zh63043EDC",
        }
      ]
    }
  ]