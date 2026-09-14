// All site copy lives here, in Polish and English.
// Polish is the default: the buyers this site is written for are Polish SMEs.
// Numbers presented as measured come from the projects themselves. Do not add
// a number here that nobody actually counted.

const pl = {
  meta: {
    title: "Jarosław Krukowski | Automatyzacje e-commerce i integracje ERP",
    description:
      "Automatyzacje dla firm handlowych: integracje Allegro, Shoper, BaseLinker i ERP, przenoszenie danych, monitoring i raporty. Warszawa.",
  },

  nav: {
    about: "O mnie",
    projects: "Realizacje",
    stack: "Technologie",
    trust: "Dane",
    pricing: "Wycena",
    contact: "Kontakt",
  },

  hero: {
    greeting: "Jarosław Krukowski",
    headline: "Automatyzacje e-commerce i integracje ERP",
    sub: "Allegro, Shoper, BaseLinker, Comarch. Od trzech lat prowadzę sprzedaż online, więc te procesy znam od strony operacyjnej, nie tylko z dokumentacji API.",
    chips: [
      "3 lata sprzedaży na Allegro i Shoper",
      "System działający u klienta",
      "Dane zostają na Twoim serwerze",
    ],
    ctaPrimary: "Zobacz realizacje",
    ctaSecondary: "Napisz do mnie",
    dragHint: "Przeciągnij, żeby obrócić",
  },

  about: {
    kicker: "Kim jestem",
    heading: "Automatyzuję to, co sam klikałem",
    intro:
      "Od 2023 roku prowadzę sprzedaż online na Allegro i Shoper. Zwroty, faktury korygujące, rozjazdy stanów, etykiety kurierskie - robiłem to codziennie, zanim zacząłem to automatyzować.",
    note: "Inżynieria Zarządzania na Politechnice Warszawskiej, certyfikat IPMA Student. Zaczynam od pytań o proces, nie od wyceny.",
    servicesKicker: "Czym się zajmuję",
  },

  services: [
    { key: "integrations", title: "Sklep i ERP", line: "Zamówienia, stany i faktury bez przepisywania" },
    { key: "documents", title: "Dokumenty", line: "Faktury z PDF prosto do systemu. KSeF." },
    { key: "monitoring", title: "Monitoring", line: "Ważne trafia na telefon. Reszta zostaje cicha." },
    { key: "reporting", title: "Raporty", line: "Liczby w jednym miejscu, aktualne rano." },
  ],

  works: {
    kicker: "Realizacje",
    heading: "Co zbudowałem",
    intro: "Dwa działające systemy i zmierzone liczby.",
    labels: {
      problem: "Problem",
      approach: "Podejście",
      result: "Efekt",
      price: "Wycena",
      measured: "Zmierzone",
      prev: "Poprzednia realizacja",
      next: "Następna realizacja",
      goTo: "Przejdź do realizacji",
    },
  },

  projects: [
    {
      key: "mailwatch",
      name: "MailWatch",
      tagline: "Zapytania klientów wyłowione ze skrzynki",
      status: "Działa u klienta",
      metrics: [
        { value: "25%", label: "poczty trafia do człowieka zamiast 72%" },
        { value: "14,6 h", label: "czekał klient przed wdrożeniem" },
        { value: "0", label: "zgubionych zapytań" },
      ],
      problem: "Zapytania ginęły między mailingiem a powiadomieniami.",
      result: "Każde zapytanie trafia na telefon właściciela.",
      measured: "Zmierzone na 4 156 wiadomościach z 1 697 dni.",
      price: "3 000 - 6 000 zł + 200 - 400 zł / mies.",
      link: "https://github.com/kyaraslav-cell/mailwatch",
      linkLabel: "Kod na GitHubie",
    },
    {
      key: "leadfind",
      name: "LeadFind",
      tagline: "Monitoring źródeł z decyzją na telefonie",
      status: "Działa od sierpnia 2026",
      metrics: [
        { value: "1 602", label: "leady w bazie" },
        { value: "7", label: "monitorowanych źródeł" },
        { value: "11", label: "workflowów n8n" },
      ],
      problem: "Źródła trzeba przeglądać codziennie, żeby zdążyć.",
      result: "Nowe oferty same trafiają na telefon, już ocenione.",
      measured: "Dane z działającej instalacji.",
      price: "6 000 - 12 000 zł + 300 - 600 zł / mies.",
      link: "",
      linkLabel: "",
    },
  ],

  stack: {
    kicker: "Technologie",
    heading: "Czym pracuję",
    intro: "Przeciągnij kulę, żeby ją obrócić.",
  },

  trust: {
    kicker: "Cyberbezpieczeństwo",
    heading: "Co się dzieje z Twoimi danymi",
    frameworks: ["ISO/IEC 27001", "NIS2", "RODO"],
    intro: "Zabezpieczenia oparte na wymaganiach tych ram. To nie jest certyfikacja.",
    points: [
      { title: "Na Twoim serwerze", body: "Żadna zewnętrzna platforma nie trzyma Twoich zamówień." },
      { title: "Dane osobowe usuwane", body: "Zanim cokolwiek trafi do modelu. Bez opcji wyłączenia." },
      { title: "Umowa powierzenia", body: "Art. 28 RODO. Wzór gotowy przed rozmową." },
      { title: "Klucze poza kodem", body: "Zmienne środowiskowe, osobny klucz na usługę." },
      { title: "n8n za proxy", body: "HTTPS, 2FA, przycinana historia wykonań." },
      { title: "Człowiek w pętli", body: "Art. 22 RODO. Zawsze wiadomo, gdzie stoi." },
    ],
  },

  pricing: {
    kicker: "Wycena",
    heading: "Ile to kosztuje",
    intro: "Widełki, żeby było wiadomo, o jakiej skali rozmawiamy.",
    rows: [
      { scope: "Jedna automatyzacja", detail: "Jeden proces, jedno źródło, jeden cel", price: "1 500 - 4 000 zł" },
      { scope: "Integracja sklep i ERP", detail: "Zamówienia, stany, dokumenty, obsługa błędów", price: "4 000 - 12 000 zł" },
      { scope: "System wieloetapowy z AI", detail: "Kilka źródeł, klasyfikacja, interfejs, monitoring", price: "8 000 - 20 000 zł" },
      { scope: "Utrzymanie i monitoring", detail: "Reakcja na awarie, zmiany w API dostawców", price: "200 - 600 zł / mies." },
    ],
    note: "Pierwsza rozmowa jest bezpłatna. Jeśli wystarczy ustawienie w Twoim systemie, powiem to.",
  },

  contact: {
    kicker: "Kontakt",
    heading: "Napisz, co się psuje",
    intro:
      "Opisz proces: kto co dziś klika, ile razy dziennie i co się dzieje, gdy coś pójdzie nie tak.",
    name: "Imię",
    namePlaceholder: "Jak się do Ciebie zwracać?",
    email: "E-mail",
    emailPlaceholder: "Adres do odpowiedzi",
    message: "Wiadomość",
    messagePlaceholder: "Jaki proces zajmuje najwięcej czasu?",
    send: "Wyślij",
    sending: "Wysyłam...",
    ok: "Dziękuję. Odezwę się w ciągu jednego dnia roboczego.",
    fail: "Nie udało się wysłać. Napisz proszę bezpośrednio na kyaraslav@gmail.com.",
    directKicker: "Albo bezpośrednio",
  },

  footer: {
    location: "Warszawa, Polska",
    languages: "Polski, rosyjski, angielski",
    rights: "Jarosław Krukowski",
  },
};

const en = {
  meta: {
    title: "Jaroslaw Krukowski | E-commerce automation and ERP integrations",
    description:
      "Automation for trading businesses: Allegro, Shoper, BaseLinker and ERP integrations, data movement, monitoring and reporting. Warsaw, Poland.",
  },

  nav: {
    about: "About",
    projects: "Work",
    stack: "Stack",
    trust: "Data",
    pricing: "Pricing",
    contact: "Contact",
  },

  hero: {
    greeting: "Jaroslaw Krukowski",
    headline: "E-commerce automation and ERP integrations",
    sub: "Allegro, Shoper, BaseLinker, Comarch. I have run online sales for three years, so I know these systems from the operations side, not just from the API docs.",
    chips: [
      "3 years selling on Allegro and Shoper",
      "A system running at a client",
      "Your data stays on your server",
    ],
    ctaPrimary: "See the work",
    ctaSecondary: "Get in touch",
    dragHint: "Drag to turn",
  },

  about: {
    kicker: "Who I am",
    heading: "I automate what I used to click",
    intro:
      "Since 2023 I have run online sales on Allegro and Shoper. Returns, correction invoices, stock mismatches, courier labels - I did those daily before I started automating them.",
    note: "Management Engineering at Warsaw University of Technology, IPMA Student certificate. I start with questions about the process, not with a quote.",
    servicesKicker: "What I do",
  },

  services: [
    { key: "integrations", title: "Shop and ERP", line: "Orders, stock and invoices without retyping" },
    { key: "documents", title: "Documents", line: "Invoices from PDF straight into the system" },
    { key: "monitoring", title: "Monitoring", line: "What matters reaches a phone. The rest stays quiet." },
    { key: "reporting", title: "Reporting", line: "The numbers in one place, current in the morning." },
  ],

  works: {
    kicker: "Work",
    heading: "What I have built",
    intro: "Two running systems and measured numbers.",
    labels: {
      problem: "Problem",
      approach: "Approach",
      result: "Result",
      price: "Price",
      measured: "Measured on",
      prev: "Previous project",
      next: "Next project",
      goTo: "Go to project",
    },
  },

  projects: [
    {
      key: "mailwatch",
      name: "MailWatch",
      tagline: "Customer inquiries pulled out of the inbox",
      status: "Running at a client",
      metrics: [
        { value: "25%", label: "of mail reaches a human, down from 72%" },
        { value: "14.6 h", label: "median wait before" },
        { value: "0", label: "inquiries lost" },
      ],
      problem: "Inquiries got lost among mailing lists and notifications.",
      result: "Every inquiry lands on the owner's phone.",
      measured: "Measured on 4,156 messages over 1,697 days.",
      price: "3,000 - 6,000 PLN + 200 - 400 PLN / month",
      link: "https://github.com/kyaraslav-cell/mailwatch",
      linkLabel: "Code on GitHub",
    },
    {
      key: "leadfind",
      name: "LeadFind",
      tagline: "Sources watched, scored, decided on a phone",
      status: "Running since August 2026",
      metrics: [
        { value: "1,602", label: "leads in the database" },
        { value: "7", label: "sources watched" },
        { value: "11", label: "n8n workflows" },
      ],
      problem: "Sources need checking daily to react in time.",
      result: "New offers reach a phone, already scored.",
      measured: "Figures from the running install.",
      price: "6,000 - 12,000 PLN + 300 - 600 PLN / month",
      link: "",
      linkLabel: "",
    },
  ],

  stack: {
    kicker: "Stack",
    heading: "What I work with",
    intro: "Drag any sphere to turn it.",
  },

  trust: {
    kicker: "Cybersecurity",
    heading: "What happens to your data",
    frameworks: ["ISO/IEC 27001", "NIS2", "GDPR"],
    intro: "Safeguards built on the requirements of these frameworks. Not a certification.",
    points: [
      { title: "On your server", body: "No outside platform holds your orders." },
      { title: "Personal data stripped", body: "Before anything reaches a model. No opt-out." },
      { title: "Processing agreement", body: "GDPR Article 28. Template ready before the call." },
      { title: "Keys out of the code", body: "Environment variables, one key per service." },
      { title: "n8n behind a proxy", body: "HTTPS, 2FA, execution history pruned." },
      { title: "A human in the loop", body: "GDPR Article 22. Always clear where they sit." },
    ],
  },

  pricing: {
    kicker: "Pricing",
    heading: "What it costs",
    intro: "Ranges, so the scale is clear.",
    rows: [
      { scope: "A single automation", detail: "One process, one source, one destination", price: "1,500 - 4,000 PLN" },
      { scope: "Shop and ERP integration", detail: "Orders, stock, documents, error handling", price: "4,000 - 12,000 PLN" },
      { scope: "Multi-step system with AI", detail: "Several sources, classification, interface, monitoring", price: "8,000 - 20,000 PLN" },
      { scope: "Maintenance and monitoring", detail: "Response to failures, changes in vendor APIs", price: "200 - 600 PLN / month" },
    ],
    note: "The first call is free. If a setting in your system solves it, I will say so.",
  },

  contact: {
    kicker: "Contact",
    heading: "Tell me what breaks",
    intro: "Describe the process: who clicks what today, how often, and what happens when it goes wrong.",
    name: "Name",
    namePlaceholder: "What should I call you?",
    email: "Email",
    emailPlaceholder: "Where should I reply?",
    message: "Message",
    messagePlaceholder: "Which process eats the most time?",
    send: "Send",
    sending: "Sending...",
    ok: "Thank you. I will get back to you within one working day.",
    fail: "That did not send. Please write directly to kyaraslav@gmail.com.",
    directKicker: "Or directly",
  },

  footer: {
    location: "Warsaw, Poland",
    languages: "Polish, Russian, English",
    rights: "Jaroslaw Krukowski",
  },
};

export const contact = {
  email: "kyaraslav@gmail.com",
  phone: "+48 576 139 485",
  linkedin: "https://www.linkedin.com/in/jarosław-krukowski-58b2872a2",
  github: "https://github.com/kyaraslav-cell",
};

export const content = { pl, en };
export default content;
