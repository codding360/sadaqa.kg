import { Patient } from "@/lib/patients"

export const patients: Patient[] = [
    {
      id: "aimeerim-uuid",
      slug: "aimeerim",
      name: "Save Aimeerim",
      avatar: "/aimeerim.jpg",
      description: "ЗОЛГЕНСМА. Сбор нужной суммы: 170 млн. сомов.",
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
        },
        {
          id: "optima",
          name: "Optima Bank",
          logo: "/optima.png",
          phone: "+996 (777) 801 594",
          paymentReceiver: "Луизя М.",
          startColor: "#007E8B",
          endColor: "#009C4D",
          destination: "https://optimabank.kg/index.php?lang=ru#00020101021132640013QR.Optima.C2C010310010129967778015941108luizya%20m1202111302125204999953034175908luizya%20m6304779B"
        }
      ]
    },
    {
      id: "marat-sharshenaliev-uuid",
      slug: "marat-sharshenaliev",
      name: "Марат Шаршеналиев",
      avatar: "/marat_sharshenaliev.png",
      description: "Срочно нужна пересадка печени, стоимость операции — 20 000 долларов США (Индия). У пациента альвеолярная эхинококкозная инфекция печени.",
      reportImages: ["1.jpg", '2.jpg'],
      banks: [
        {
          id: "mbank",
          name: "MBank",
          logo: "/mbank_icon_square.png",
          phone: "+996509690790",
          paymentReceiver: "Марат Ш.",
          startColor: "#007E8B",
          endColor: "#009C4D",
          destination: "https://app.mbank.kg/qr/#00020101021132440012c2c.mbank.kg01020210129965096907901302125204999953034175909MARAT%20Sh.63046f6a",
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