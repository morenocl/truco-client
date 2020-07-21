import React, { useState } from 'react'
import { Button } from "@chakra-ui/core"

import CreateMenu from './CreateMenu'
import JoinMenu from './JoinMenu'


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
    menu = <CreateMenu />
  else if (state === 'join')
    menu = <JoinMenu />
  else {
    menu = undefined
  }

  return (
    <>
      { menu ?
        back
      : buttons }
      { menu }
    </>
  )
}

export default Lobby
