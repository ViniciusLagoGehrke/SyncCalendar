import { calendars } from '../../../../initialData.js'

export default function handler(req, res) {
  const calendarId = req
  res.status(200).json(calendars)
}