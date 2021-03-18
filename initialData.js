const ROLE = {
  BASIC: 'basic',
  MANAGER: 'manager',
  ADMIN: 'admin'
}

const users = [
  { id: "VGehrke", name: 'Vinicius Gehrke', password: "VGehrke", role: ROLE.BASIC },
  { id: "PNogueira", name: 'Pedro Nogueira', password: "PNogueira", role: ROLE.MANAGER },
  { id: "TCardoso", name: 'Tânia Cardoso', password: "TCardoso", role: ROLE.ADMIN }
];

const calendars = [
  {
    "id": "VGehrke1",
    "userId": "VGehrke",
    "name": "HydraDev",
    "owner": "Gabriela",
    "utc": "En-GB"
  },
  {
    "id": "VGehrke2",
    "userId": "VGehrke",
    "name": "HydraDev",
    "owner": "João Francisco",
    "utc": "En-GB"
  },
  {
    "id": "VGehrke3",
    "userId": "VGehrke",
    "name": "Airbnb",
    "owner": "Aurora",
    "utc": "En-GB"
  }
]

export const data = {
  ROLE: ROLE,
  users: users,
  calendars: calendars
}