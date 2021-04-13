import { useState } from 'react'

import LoginForm from '../components/LoginForm'
import SignUpForm from '../components/SignUpForm'

export default function Home() {
  const [isNewUser, setIsNewUser] = useState(false);

  return (
    <>
      { (isNewUser) ? (
        <SignUpForm
          onClick={() => setIsNewUser(false)}
        />
      ) : (
        <LoginForm
          isLogin
          onClick={() => setIsNewUser(true)}
        />
      )}
    </>
  );
}