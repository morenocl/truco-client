import React, { useState, useContext } from 'react'
import { Box, Button, Input } from "@chakra-ui/core"

import { login, register } from './utils/Api'
import { ContextApp } from './contextApp'


const SignIn = () => {
  const [context, setContext] = useContext(ContextApp)
  const [state, setState] = useState({
    username: '',
    password: '',
  })

  const form = (
    <>
      <p>Sign In</p>
      <Input isRequired
        id="fuser"
        placeholder="username"
        type="text"
        onChange={event => setState({...state, username: event.target.value})}
      />
      <Input isRequired
        id="fpass"
        placeholder="password"
        type="password"
        onChange={event => setState({...state, password: event.target.value})}
      />
    </>
  )

  const onSuccessLogin = (r) => {
    console.log(r)
    setContext({...context, token: r['token'], username: state['username'], auth: true})
  }

  const buttons = (
    <>
      <Button
        onClick={() => register(state, () => console.log('registro ok'), (r) => console.log('fail', r))}
      >
        Register
      </Button>
      <Button
        onClick={() => {
          login(state, onSuccessLogin, (r) => console.log('fail', r))
        }}
      >
        Enter
      </Button>
    </>
  )


  return (
    <Box w="50%">
      { form }
      { buttons }
    </ Box>
  )
}

export default SignIn
