import { connectToDatabase } from '../../../../utils/mongodb'

export default async function userCalendarHandler(req, res) {
  const {
    method,
    query: { id }
  } = req

  const { db } = await connectToDatabase();

  switch (method) {
    case 'GET':
      const data = await db.collection("calendars").find({ "userId": id }).toArray();
      res.status(200).json( data )
      break
    case 'PUT':
      // Update calendar in database
      res.status(200).json(`Calendar updated.`)
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}