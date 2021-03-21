import { users } from '../../../initialData.js'

export default function userHandler(req, res) {
  const {
    query: { id },
    method,
  } = req

  const user = users.filter(user => user.id === id); 

  switch (method) {
    case 'GET':
      // Get data from database
      res.status(200).json(user)
      break
    case 'PUT':
      // Update or create data in database
      res.status(200).json({ id, name: name || `User ${id}` })
      break
    case 'DELETE':
      // Delete data in database
      res.status(200).json({ id, name: name || `User ${id}` })
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
