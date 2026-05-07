// Operator data — completează după înființarea PFA/SRL.
// Valorile cu TODO sunt placeholdere și TREBUIE actualizate înainte de lansare.
export const OPERATOR = {
  // Denumire legală (ex. "LAWRE EVENTS SRL" sau "LAWRENȚIU POPESCU PFA")
  legalName: 'TODO — denumire legală operator',
  // CUI / CIF
  cui: 'TODO — CUI',
  // Nr. Reg. Comerțului (doar pentru SRL)
  regCom: 'TODO — J40/.../...',
  // Sediu social
  address: 'TODO — adresă sediu social, București',
  // Email pentru cereri privind datele personale (drepturi GDPR)
  privacyEmail: 'contact@lawredj.ro',
} as const

export const ANSPDCP = {
  name: 'Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal',
  shortName: 'ANSPDCP',
  address: 'B-dul G-ral. Gheorghe Magheru 28-30, Sector 1, București',
  email: 'anspdcp@dataprotection.ro',
  website: 'https://www.dataprotection.ro',
} as const

// Numărul de luni după care mesajele primite prin formular sunt șterse automat.
export const CONTACT_RETENTION_MONTHS = 24

// Versiunea politicii de confidențialitate — incrementează când modifici textul,
// pentru a putea cere consimțământ reînnoit.
export const PRIVACY_POLICY_VERSION = '1.0'
export const PRIVACY_POLICY_UPDATED_AT = '2026-05-07'
