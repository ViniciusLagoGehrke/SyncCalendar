import { connectToDatabase } from '../../../utils/mongodb'

export default async function usersHandler(req, res) {
  const {
    body: { usernameForm, passwordForm, nameForm, roleForm },
    method,
  } = req

  const { db } = await connectToDatabase();

  switch (method) {
    case 'GET':
      // Get all users from database
      const data = await db.collection("users").find({}).toArray();
      res.status(200).json( data )
      break
    case 'POST':
      // Create user in database
      const response = await db.collection("users").insertOne({
        "id": usernameForm,
        "name": nameForm,
        "password": passwordForm,
        "role": roleForm
      });
      res.status(200).json(response.ops[0])
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
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}