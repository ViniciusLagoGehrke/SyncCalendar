import withSession from '../../lib/session'
import { users } from '../../initialData.js'

export default withSession(async (req, res) => {
  const user = req.session.get('user')

  if (user) {
    // in a real world application you might read the user id from the session and then do a database request
    // to get more information on the user if needed
    const { id } = user;
    user = users.filter(user => user.id === id); 

    res.json({
      isLoggedIn: true,
      ...user,
    })
  } else {
    res.json({
      isLoggedIn: false,
    })
  }
})