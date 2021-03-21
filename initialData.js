export const ROLE = {
  BASIC: 'basic',
  MANAGER: 'manager',
  ADMIN: 'admin'
}

export const users = [
  { id: "VGehrke", name: 'Vinicius Gehrke', password: "VGehrke", role: ROLE.BASIC },
  { id: "PNogueira", name: 'Pedro Nogueira', password: "PNogueira", role: ROLE.MANAGER },
  { id: "TCardoso", name: 'Tânia Cardoso', password: "TCardoso", role: ROLE.ADMIN }
];

export const calendars = [
  {
    "id": "VGehrke1",
    "userId": "VGehrke",
    "name": "HydraDev",
    "owner": "Gabriela",
    "timeZone": "America/Sao_Paulo"
  },
  {
    "id": "VGehrke2",
    "userId": "VGehrke",
    "name": "HydraDev",
    "owner": "João Francisco",
    "timeZone": "Atlantic/Cape_Verde"
  },
  {
    "id": "VGehrke3",
    "userId": "VGehrke",
    "name": "Airbnb",
    "owner": "Aurora",
    "timeZone": "Australia/Sydney"
  }
]

export const data = {
  ROLE: ROLE,
  users: users,
  calendars: calendars
}