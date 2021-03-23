import fetchJson from '../../lib/fetchJson'
import withSession from '../../lib/session'

export default withSession(async (req, res) => {
  const { username } = await req.body
  const url = `http://localhost:3000/api/users/${username}` // ok, returns data

  try {
    // we check that the user exists and store some data in session
    const { id, name, password, role } = await fetchJson(url)
    const user = { isLoggedIn: true, id, name, password, role }
    req.session.set('user', user)
    await req.session.save()
    res.json(user)
  } catch (error) {
    const { response: fetchResponse } = error
    res.status(fetchResponse?.status || 500).json(error.data)
  }
})