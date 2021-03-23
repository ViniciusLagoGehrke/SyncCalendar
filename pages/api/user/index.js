import { users } from '../../../initialData.js'

export default function userHandler(req, res) {
  const {
    query,
    method,
  } = req

  switch (method) {
    case 'GET':
      // Get data from database
      res.status(200).json( users )
      break
    case 'PUT':
      // Update or create data in database
      res.status(200).json({ id, name: name || `User ${id}` })
      break
    case 'DELETE':
      // Delete data in database
      res.status(200).json({ id, name: name || `User ${id} deleted` })
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}