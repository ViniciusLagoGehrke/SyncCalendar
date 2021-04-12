import { useState } from 'react'
import useUser from '../lib/useUser'
import fetchJson from '../lib/fetchJson'

import LoginForm from '../components/LoginForm'
import SignUpForm from '../components/SignUpForm'

export default function Home() {
  const [isNewUser, setIsNewUser] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  
  const { mutateUser } = useUser({
        redirectTo: '/dashboard',
        redirectIfFound: true
      })

  async function handleLoginSubmit(e) {
    e.preventDefault()

    const body = {
      usernameForm: e.currentTarget.username.value,
      passwordForm: e.currentTarget.password.value,
      nameForm: e.currentTarget.name.value
    }

    try {
      await mutateUser(
        fetchJson('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
      )
    } catch (error) {
      console.error('An unexpected error happened:', error)
      setErrorMsg(error.data.message)
    }
  }

  async function handleSignupSubmit(e) {
    e.preventDefault()

    const body = {
      usernameForm: e.currentTarget.username.value,
      passwordForm: e.currentTarget.password.value,
      nameForm: e.currentTarget.name.value
    }

    try {
      await fetchJson('/api/user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
      })

      setIsNewUser(false);
      
    } catch (error) {
      console.error('An unexpected error happened:', error)
      setErrorMsg(error.data.message)
    }
  }


  return (
    <>
      { (isNewUser) ? (
        <SignUpForm
          errorMessage={errorMsg}
          onSubmit={handleSignupSubmit}
          onClick={() => setIsNewUser(false)}
        />
      ) : (
        <LoginForm
          isLogin
          errorMessage={errorMsg}
          onSubmit={handleLoginSubmit}
          onClick={() => setIsNewUser(true)}
        />
      )}
    </>
  );
}