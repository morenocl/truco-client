import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { Box } from "@chakra-ui/core"

import { getGameStarted } from './utils/Api'
import { useInterval } from './utils/useInterval'


const JoinMenu = ({ context, setContext }) => {
  const { stage, username } = context

  const setStage = stage => setContext({...context, stage: stage})

  const onSuccess = (is_started) => {
    setStage(is_started ? 'started' : 'running')
  }
  const onFailure = (r) => {console.log('The game is not created.', r)}

  // Refresh every 5 seconds and when mounted.
  const refresh = () => { getGameStarted(username, onSuccess, onFailure) }
  useEffect(refresh, [])
  useInterval(() => { if (stage !== 'started') refresh(); }, 2000)


  if (stage === 'empty') {
    return (
      <Box w="50%">
        Espere a que se cree una partida.
      </Box>
    )
  }

  if (stage === 'started') {
      setStage('empty');
      return (<Redirect to={'/game/'} push />)
    }

  return(
    <Box w="50%">
      Esperando a iniciar.
    </Box>
  )
}

export default JoinMenu
