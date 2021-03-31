import { connectToDatabase } from '../../utils/mongodb'

export default async function calendarsHandler(req, res) {
  const { db } = await connectToDatabase();

  const data = await db.collection("calendars").find({}).toArray();

  res.json(data)
}