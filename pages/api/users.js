import { users } from '../../initialData.js'

export default function handler(req, res) {
  // Get data from database
  res.status(200).json(users)
}