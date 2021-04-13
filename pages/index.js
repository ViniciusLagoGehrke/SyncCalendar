import { useState } from 'react'

import LoginForm from '../components/LoginForm'
import SignUpForm from '../components/SignUpForm'

export default function Home() {
  const [isNewUser, setIsNewUser] = useState(false);

  return (
    <>
      { (isNewUser) ? (
        <SignUpForm
          handleNewUser={() => setIsNewUser(false)}
        />
      ) : (
        <LoginForm
          isLogin
          handleNewUser={() => setIsNewUser(true)}
        />
      )}
    </>
  );
}