import { connectToDatabase } from '../../../utils/mongodb'

export default async function userHandler(req, res) {
  const {
    body: { usernameForm, passwordForm, nameForm },
    method,
  } = req

  const { db } = await connectToDatabase();

  switch (method) {
    case 'GET':
      const data = await db.collection("users").find({"id": usernameForm});
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
