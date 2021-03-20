// Fake data
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
  },
  {
    "id": "PNogueira1",
    "userId": "PNogueira",
    "name": "HydraDev",
    "owner": "Pedro",
    "utc": "En-GB"
  }
]

export default function handler(req, res) {
  // Get data from database
  res.status(200).json(calendars)
}