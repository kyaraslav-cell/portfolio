// All site copy lives here, in Polish and English.
// Polish is the default: the buyers this site is written for are Polish SMEs.
// Numbers presented as measured are marked as such and come from the projects
// themselves. Do not add a number here that nobody actually counted.

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
      "Dane zostają na serwerze klienta",
    ],
    ctaPrimary: "Zobacz realizacje",
    ctaSecondary: "Napisz do mnie",
    dragHint: "Przeciągnij, żeby obrócić",
  },

  about: {
    kicker: "Kim jestem",
    heading: "O mnie",
    paragraphs: [
      "Buduję automatyzacje dla małych firm handlowych i usługowych. Przenoszenie zamówień, faktur i stanów między sklepem, ERP i arkuszami. Powiadomienia, które docierają na telefon. Raporty, które aktualizują się same.",
      "Od 2023 roku prowadzę sprzedaż online na Allegro i Shoper w warszawskiej firmie handlowej. Zwroty, faktury korygujące, rozjazdy stanów magazynowych, etykiety kurierskie - robiłem to codziennie, zanim zacząłem to automatyzować. To jest różnica między integracją napisaną z dokumentacji API a integracją napisaną przez kogoś, kto wie, co się w niej psuje w praktyce.",
      "Studiuję Inżynierię Zarządzania na Politechnice Warszawskiej i mam certyfikat IPMA Student (nr 152/2025/IS). Każde zlecenie zaczynam od pytań o proces, a nie od wyceny, bo wycena bez zrozumienia procesu to zgadywanie.",
    ],
    servicesKicker: "Czym się zajmuję",
  },

  services: [
    {
      key: "integrations",
      title: "Integracje sklep i ERP",
      body: "Allegro, Shoper, BaseLinker, Comarch, Subiekt. Zamówienia, stany, faktury i etykiety przenoszone bez przepisywania ręcznie.",
    },
    {
      key: "documents",
      title: "Obieg dokumentów",
      body: "Faktury z PDF do systemu, import arkuszy, KSeF. Wszędzie tam, gdzie ktoś dziś przepisuje dane z jednego okna do drugiego.",
    },
    {
      key: "monitoring",
      title: "Monitoring i alerty",
      body: "Obserwowanie skrzynki, ogłoszeń, cen czy statusów zamówień. To, co ważne, trafia na telefon. Reszta zostaje cicha.",
    },
    {
      key: "reporting",
      title: "Raporty i dashboardy",
      body: "Power BI, SQL, Google Analytics. Liczby w jednym miejscu, aktualne rano, bez comiesięcznego składania arkusza ręcznie.",
    },
  ],

  works: {
    kicker: "Realizacje",
    heading: "Co zbudowałem",
    intro:
      "Dwa działające systemy i jeden projekt studyjny. Przy każdym podaję, co zostało zmierzone, a co jest założeniem projektowym. Liczby pochodzą z tych systemów, nie z szacunków.",
    labels: {
      problem: "Problem",
      approach: "Podejście",
      result: "Efekt",
      price: "Wycena",
      status: "Status",
      stack: "Stack",
      measured: "Zmierzone",
    },
  },

  projects: [
    {
      key: "mailwatch",
      name: "MailWatch",
      tagline: "Zapytania klientów wyłowione ze skrzynki sklepu",
      status: "Wdrożone u klienta, działa",
      problem:
        "Zapytania klientów leżały w wspólnej skrzynce razem z mailingiem, ofertami SEO i powiadomieniami platform. Zmierzone na 4 156 wiadomościach z 1 697 dni: klient czekał na odpowiedź medianę 14,6 godziny, a co dziesiąty prawie pięć dni. Na marketplace ta sprzedaż jest już wtedy u kogoś innego.",
      approach:
        "Klasyfikacja zbudowana na własnej poczcie sklepu, nie na zgadywanych regułach. Za prawdę przyjąłem odpowiedzi obsługi: jeśli ktoś odpisał, to był klient. Dane osobowe są usuwane, zanim cokolwiek trafi do modelu językowego, i nie ma ustawienia, które to wyłącza. Odpowiedź zwrotna to stały szablon, a nie tekst generowany, więc nie wymyśli ceny ani terminu dostawy.",
      result:
        "Do człowieka trafia 25% poczty zamiast 72%. Na 4 156 wiadomościach każda, którą filtr odrzuca po odpowiedzi obsługi, była powiadomieniem transakcyjnym albo ofertą sprzedażową, nigdy pytaniem klienta. Potwierdzenie dla klienta wychodzi w ciągu minuty i trafia na telefon właściciela. Program pinguje zewnętrzny monitor, więc jego zatrzymanie jest widoczne; wykrył już jedną realną awarię.",
      measured:
        "4 156 wiadomości, 1 697 dni, 374 potwierdzonych klientów. Mediana i percentyle liczone z faktycznie wysłanych odpowiedzi.",
      price: "3 000 - 6 000 zł wdrożenie, 200 - 400 zł miesięcznie za monitoring",
      stack: ["Node.js", "IMAP", "Telegram Bot API", "LLM", "healthchecks.io"],
      link: "https://github.com/kyaraslav-cell/mailwatch",
      linkLabel: "Kod na GitHubie",
    },
    {
      key: "leadfind",
      name: "LeadFind",
      tagline: "Monitoring publicznych źródeł z oceną i decyzją na telefonie",
      status: "Działa od sierpnia 2026",
      problem:
        "Publiczne źródła trzeba przeglądać codziennie, żeby zdążyć zareagować. Ten sam problem ma firma śledząca przetargi, ceny konkurencji albo zmiany w ofertach na marketplace. Ktoś klika przez te same strony rano i wieczorem.",
      approach:
        "Jedenaście workflowów n8n. Źródła nie dotykają bazy ani Telegrama; normalizują znalezione ogłoszenia i wysyłają je do jednego webhooka wejściowego, który jako jedyny deduplikuje i zapisuje. Kolejka analizy z limitem prób, ocena przez model językowy, interfejs w Telegramie z jedną kartą na ofertę, pętla zwrotna ucząca kolejny prompt i heartbeat co pięć minut.",
      result:
        "1 602 leady w bazie, jedenaście workflowów, PostgreSQL natywnie zamiast Dockera, czyli około 150 MB zamiast 1,5 GB. Jeden zepsuty scraper nie zatrzymuje reszty, bo logika deduplikacji i alertów jest w jednym miejscu. Historia wykonań przycinana do dwóch tygodni, po tym jak urosła do 665 MB.",
      measured: "1 602 rekordy w bazie, 11 workflowów, pomiary zużycia zasobów z działającej instalacji.",
      price: "6 000 - 12 000 zł wdrożenie, 300 - 600 zł miesięcznie",
      stack: ["n8n", "PostgreSQL", "Telegram Bot API", "LLM", "Docker"],
      legal:
        "Tylko publiczne ogłoszenia biznesowe, niska częstotliwość odpytywania, źródło zapisane przy każdym rekordzie, bez LinkedIna.",
      link: "",
      linkLabel: "",
    },
    {
      key: "recognition",
      name: "Rozpoznawanie twarzy",
      tagline: "Projekt studyjny: Node.js, PostgreSQL, zewnętrzne API",
      status: "Projekt studyjny, dostępny online",
      problem:
        "Nie jest to wdrożenie u klienta i tak go nie przedstawiam. Jest tu po to, żeby pokazać kod poza n8n: własny backend, własny schemat bazy i obsługa zewnętrznego API.",
      approach:
        "Serwer w Node.js, konta i licznik użyć w PostgreSQL, wykrywanie twarzy przez API Clarifai, front w Reakcie.",
      result:
        "Działająca aplikacja z rejestracją, logowaniem i zapisem historii. Kiedy narzędzie no-code trafia na swój limit, to jest poziom, na którym piszę dalej sam.",
      measured: "",
      price: "",
      stack: ["Node.js", "PostgreSQL", "React", "REST API"],
      link: "https://recognitionappv2.onrender.com/",
      linkLabel: "Otwórz aplikację",
    },
  ],

  stack: {
    kicker: "Technologie",
    heading: "Czym pracuję",
    intro:
      "Pogrupowane tak, jak ich używam. Pierwsza grupa jest tą, przez którą warto mnie zatrudnić; reszta jest po to, żeby pierwsza działała.",
    groupsKicker: "Pełna lista",
    groups: [
      {
        title: "E-commerce i ERP",
        items: ["Allegro API", "Shoper", "BaseLinker", "Comarch ERP", "Subiekt", "KSeF"],
      },
      {
        title: "Automatyzacja i dane",
        items: ["n8n", "PostgreSQL", "REST API", "Docker", "Power BI", "SQL", "Excel", "Google Analytics"],
      },
      {
        title: "Kod",
        items: ["Node.js", "TypeScript", "JavaScript", "React", "Git", "Three.js"],
      },
      {
        title: "Modele językowe",
        items: ["Klasyfikacja treści", "Redakcja danych osobowych", "Ocena i priorytetyzacja", "Człowiek w pętli"],
      },
    ],
  },

  trust: {
    kicker: "Bezpieczeństwo",
    heading: "Co się dzieje z Twoimi danymi",
    intro:
      "Najczęstszy powód, dla którego mała firma nie kupuje automatyzacji, to obawa, że jej dane wyjadą gdzieś, skąd nie da się ich wycofać. Dlatego pracuję tak:",
    points: [
      {
        title: "Wszystko na Twojej infrastrukturze",
        body: "Automatyzacje działają na Twoim serwerze albo komputerze. Nie ma zewnętrznej platformy, która trzyma Twoje zamówienia i podnosi cenę za rok.",
      },
      {
        title: "Dane osobowe usuwane przed modelem",
        body: "Zanim cokolwiek trafi do modelu językowego, znikają adresy e-mail, telefony, PESEL, NIP, numery kont i adresy. Model ma wiedzieć co, nie kto.",
      },
      {
        title: "Umowa powierzenia",
        body: "Przy każdym zleceniu dotykającym danych Twoich klientów podpisujemy umowę powierzenia przetwarzania (art. 28 RODO). Wzór mam gotowy przed rozmową.",
      },
      {
        title: "Sekrety poza kodem",
        body: "Hasła i klucze API w zmiennych środowiskowych, nigdy w repozytorium. Osobny klucz na usługę, nie jeden do wszystkiego.",
      },
      {
        title: "n8n nie stoi otwarty w internecie",
        body: "Panel za reverse proxy, HTTPS na własnej domenie, 2FA na koncie właściciela, historia wykonań przycinana, bo zawiera dane klientów i rośnie bez końca.",
      },
      {
        title: "Człowiek przy decyzjach o ludziach",
        body: "Nic, co dotyczy konkretnej osoby, nie zostaje rozstrzygnięte wyłącznie automatycznie (art. 22 RODO). Zawsze da się wskazać, gdzie w procesie siedzi człowiek.",
      },
    ],
  },

  pricing: {
    kicker: "Wycena",
    heading: "Ile to kosztuje",
    intro:
      "Widełki, żeby było wiadomo, o jakiej skali rozmawiamy. Konkretna kwota pada po rozmowie o procesie, bo wycena bez zrozumienia procesu to zgadywanie.",
    rows: [
      { scope: "Jedna automatyzacja", detail: "Jeden proces, jedno źródło, jeden cel", price: "1 500 - 4 000 zł" },
      { scope: "Integracja sklep i ERP", detail: "Zamówienia, stany, dokumenty, obsługa błędów", price: "4 000 - 12 000 zł" },
      { scope: "System wieloetapowy z AI", detail: "Kilka źródeł, klasyfikacja, interfejs, monitoring", price: "8 000 - 20 000 zł" },
      { scope: "Utrzymanie i monitoring", detail: "Reakcja na awarie, zmiany w API dostawców", price: "200 - 600 zł / mies." },
    ],
    note: "Pierwsza rozmowa i rozrysowanie procesu są bezpłatne. Jeśli okaże się, że problem rozwiązuje ustawienie w systemie, który już masz, powiem to zamiast wystawiać fakturę.",
  },

  contact: {
    kicker: "Kontakt",
    heading: "Napisz, co się psuje",
    intro:
      "Najlepiej zacząć od opisu procesu: kto co dziś klika, ile razy dziennie i co się dzieje, gdy coś pójdzie nie tak. Odpowiadam w ciągu jednego dnia roboczego.",
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
    heading: "About",
    paragraphs: [
      "I build automation for small trading and service businesses. Moving orders, invoices and stock between a shop, an ERP and spreadsheets. Notifications that reach a phone. Reports that update themselves.",
      "Since 2023 I have been running online sales on Allegro and Shoper for a Warsaw trading business. Returns, correction invoices, stock mismatches, courier labels - I did those daily before I started automating them. That is the difference between an integration written from API docs and one written by somebody who knows what breaks in practice.",
      "I study Management Engineering at Warsaw University of Technology and hold the IPMA Student certificate (no. 152/2025/IS). I start every job by asking about the process rather than quoting, because a quote without understanding the process is a guess.",
    ],
    servicesKicker: "What I do",
  },

  services: [
    {
      key: "integrations",
      title: "Shop and ERP integrations",
      body: "Allegro, Shoper, BaseLinker, Comarch, Subiekt. Orders, stock, invoices and labels moved without anyone retyping them.",
    },
    {
      key: "documents",
      title: "Document flow",
      body: "Invoices from PDF into the system, spreadsheet imports, KSeF. Anywhere somebody currently copies data from one window into another.",
    },
    {
      key: "monitoring",
      title: "Monitoring and alerts",
      body: "Watching a mailbox, listings, prices or order status. What matters reaches a phone. Everything else stays quiet.",
    },
    {
      key: "reporting",
      title: "Reports and dashboards",
      body: "Power BI, SQL, Google Analytics. The numbers in one place, current in the morning, without assembling a spreadsheet by hand every month.",
    },
  ],

  works: {
    kicker: "Work",
    heading: "What I have built",
    intro:
      "Two running systems and one study project. For each I say what was measured and what is a design claim. The numbers come from the systems themselves, not from estimates.",
    labels: {
      problem: "Problem",
      approach: "Approach",
      result: "Result",
      price: "Price",
      status: "Status",
      stack: "Stack",
      measured: "Measured on",
    },
  },

  projects: [
    {
      key: "mailwatch",
      name: "MailWatch",
      tagline: "Customer inquiries pulled out of a shop mailbox",
      status: "Deployed at a client, running",
      problem:
        "Customer inquiries sat in a shared inbox among mailing lists, SEO pitches and platform notifications. Measured across 4,156 messages over 1,697 days: a customer waited a median of 14.6 hours for a reply, and one in ten waited almost five days. On a marketplace, that sale has already gone somewhere else.",
      approach:
        "Classification built from the shop's own mail rather than from guessed rules. Staff replies were the ground truth: if somebody answered it, it was a customer. Personal data is stripped before anything reaches a language model, and there is no setting to turn that off. The acknowledgement is a fixed template rather than generated text, so it cannot invent a price or a delivery date.",
      result:
        "A quarter of the mail now reaches a human, down from 72%. Across 4,156 messages, every message the filter drops after a staff reply was a transactional notice or a sales pitch, never a customer question. The acknowledgement goes out within a minute and the inquiry lands on the owner's phone. The program pings an external monitor, so a stall is visible; it has already caught one real failure.",
      measured:
        "4,156 messages, 1,697 days, 374 confirmed customers. Median and percentiles computed from actual sent replies.",
      price: "3,000 - 6,000 PLN to build, 200 - 400 PLN a month to monitor",
      stack: ["Node.js", "IMAP", "Telegram Bot API", "LLM", "healthchecks.io"],
      link: "https://github.com/kyaraslav-cell/mailwatch",
      linkLabel: "Code on GitHub",
    },
    {
      key: "leadfind",
      name: "LeadFind",
      tagline: "Public sources watched, scored, and decided on from a phone",
      status: "Running since August 2026",
      problem:
        "Public sources have to be checked daily to react in time. The same problem belongs to any firm tracking tenders, competitor prices or marketplace listing changes. Somebody clicks through the same pages morning and evening.",
      approach:
        "Eleven n8n workflows. Sources never touch the database or Telegram; they normalise what they find and post it to a single intake webhook, which is the only place that deduplicates and stores. An analysis queue with retry limits, scoring by a language model, a Telegram interface with one card per offer, a feedback loop that trains the next prompt, and a heartbeat every five minutes.",
      result:
        "1,602 leads in the database, eleven workflows, native PostgreSQL instead of Docker, about 150 MB rather than 1.5 GB. One broken scraper cannot take the rest down, because dedup and alert logic lives in exactly one place. Execution history is pruned at two weeks, after it grew to 665 MB.",
      measured: "1,602 records in the database, 11 workflows, resource figures taken from the running install.",
      price: "6,000 - 12,000 PLN to build, 300 - 600 PLN a month",
      stack: ["n8n", "PostgreSQL", "Telegram Bot API", "LLM", "Docker"],
      legal:
        "Public business listings only, low polling frequency, provenance stored on every record, no LinkedIn.",
      link: "",
      linkLabel: "",
    },
    {
      key: "recognition",
      name: "Face recognition app",
      tagline: "Study project: Node.js, PostgreSQL, an external API",
      status: "Study project, live online",
      problem:
        "This is not a client deployment and I do not present it as one. It is here to show code outside n8n: my own backend, my own database schema, and handling an external API.",
      approach:
        "A Node.js server, accounts and a usage counter in PostgreSQL, face detection through the Clarifai API, and a React front end.",
      result:
        "A working application with registration, login and stored history. When a no-code tool hits its limit, this is the level at which I keep going by hand.",
      measured: "",
      price: "",
      stack: ["Node.js", "PostgreSQL", "React", "REST API"],
      link: "https://recognitionappv2.onrender.com/",
      linkLabel: "Open the app",
    },
  ],

  stack: {
    kicker: "Stack",
    heading: "What I work with",
    intro:
      "Grouped the way I use it. The first group is the reason to hire me; the rest exists so the first one works.",
    groupsKicker: "The full list",
    groups: [
      {
        title: "E-commerce and ERP",
        items: ["Allegro API", "Shoper", "BaseLinker", "Comarch ERP", "Subiekt", "KSeF"],
      },
      {
        title: "Automation and data",
        items: ["n8n", "PostgreSQL", "REST API", "Docker", "Power BI", "SQL", "Excel", "Google Analytics"],
      },
      {
        title: "Code",
        items: ["Node.js", "TypeScript", "JavaScript", "React", "Git", "Three.js"],
      },
      {
        title: "Language models",
        items: ["Content classification", "Personal data redaction", "Scoring and triage", "Human in the loop"],
      },
    ],
  },

  trust: {
    kicker: "Security",
    heading: "What happens to your data",
    intro:
      "The most common reason a small business does not buy automation is the fear that its data leaves for somewhere it cannot be pulled back from. So this is how I work:",
    points: [
      {
        title: "Everything on your infrastructure",
        body: "The automation runs on your server or your machine. There is no external platform holding your orders and raising its price in a year.",
      },
      {
        title: "Personal data stripped before the model",
        body: "Before anything reaches a language model, email addresses, phone numbers, national ID and tax numbers, bank accounts and addresses are removed. The model needs to know what, not who.",
      },
      {
        title: "A data processing agreement",
        body: "For any job touching your customers' data we sign a processing agreement (GDPR Article 28). I have the template ready before the first call.",
      },
      {
        title: "Secrets out of the code",
        body: "Passwords and API keys in environment variables, never in the repository. A separate key per service rather than one that opens everything.",
      },
      {
        title: "n8n is not left open to the internet",
        body: "The panel sits behind a reverse proxy, HTTPS on a real domain, 2FA on the owner account, and execution history pruned, because it holds customer data and grows without limit.",
      },
      {
        title: "A human on decisions about people",
        body: "Nothing concerning a specific person is settled purely automatically (GDPR Article 22). It is always possible to point at where the human sits in the process.",
      },
    ],
  },

  pricing: {
    kicker: "Pricing",
    heading: "What it costs",
    intro:
      "Ranges, so the scale is clear. The actual figure comes after a conversation about the process, because a quote without understanding the process is a guess.",
    rows: [
      { scope: "A single automation", detail: "One process, one source, one destination", price: "1,500 - 4,000 PLN" },
      { scope: "Shop and ERP integration", detail: "Orders, stock, documents, error handling", price: "4,000 - 12,000 PLN" },
      { scope: "Multi-step system with AI", detail: "Several sources, classification, interface, monitoring", price: "8,000 - 20,000 PLN" },
      { scope: "Maintenance and monitoring", detail: "Response to failures, changes in vendor APIs", price: "200 - 600 PLN / month" },
    ],
    note: "The first call and mapping the process cost nothing. If it turns out a setting in a system you already own solves the problem, I will say so rather than invoice you.",
  },

  contact: {
    kicker: "Contact",
    heading: "Tell me what breaks",
    intro:
      "The best start is a description of the process: who clicks what today, how many times a day, and what happens when something goes wrong. I reply within one working day.",
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
