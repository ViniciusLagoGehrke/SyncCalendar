import { connectToDatabase } from '../../../utils/mongodb'

export default async function userHandler(req, res) {
  const {
    method,
    query: { id }
  } = req

  const { db } = await connectToDatabase();

  switch (method) {
    case 'GET':
      const data = await db.collection("users").findOne({ "id": id });
      res.status(200).json( data )
      break
    case 'PUT':
      // Update data in database
      res.status(200).json({ id, name: name || `User ${id} updated.` })
      break
    default:
      res.setHeader('Allow', ['GET','PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}