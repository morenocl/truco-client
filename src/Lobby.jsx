import React, { useState } from 'react'
import { Button } from "@chakra-ui/core"

import CreateMenu from './CreateMenu'
import JoinMenu from './JoinMenu'
import { ContextApp } from './contextApp'


const Lobby = () => {
  const [state, setState] = useState('')

  const buttons = (
    <>
      <Button
        onClick={() => setState('create')}
      >
        Crear
      </Button>
      <Button
        onClick={() => setState('join')}
      >
        Unirse
      </Button>
    </>
  )

  const back = (
    <Button
      onClick={() => setState('')}
    >
      Atras
    </Button>
  )

  let menu = ''
  if (state === 'create')
    menu = ([context, setContext]) => <CreateMenu context={context} setContext={setContext} />
  else if (state === 'join')
    menu = (value) => <JoinMenu />
  else {
    menu = () => {}
  }

  return (
    <>
      { state ?
        back
      : buttons }
      <ContextApp.Consumer>
        { menu }
      </ContextApp.Consumer>
    </>
  )
}

export default Lobby
