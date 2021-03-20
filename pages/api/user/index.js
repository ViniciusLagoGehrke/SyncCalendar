import { users } from '../../../initialData.js'

export default function userHandler(req, res) {
  const {
    query: { id, name },
    method,
  } = req
  const {
    id,
    name,
    password,
    role
  } = req.body;

  switch (method) {
    case 'GET':
      // Get data from database
      res.status(200).json({ id, name: `User ${id}` })
      break
    case 'PUT':
      // Update or create data in database
      res.status(200).json({
        id: id,
        name: name,
        password: password || id,
        role: role
      })
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