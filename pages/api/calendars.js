import { calendars } from '../../initialData.js'

export default function calendarHandler(req, res) {
  // Get data from database
  res.status(200).json(calendars)
}