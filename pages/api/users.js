// Fake users data
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

export default function handler(req, res) {
  // Get data from database
  res.status(200).json(users)
}