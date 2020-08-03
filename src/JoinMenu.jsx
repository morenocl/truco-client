import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Box, Select } from "@chakra-ui/core"

import { getGameStarted, getListGame, startGame } from './utils/Api'
import { useInterval } from './utils/useInterval'


const JoinMenu = ({ context, setContext }) => {
  const { stage, username } = context
  const [listGames, setListGames] = useState([])
  const [game, setGame] = useState('')
  const setStage = stage => setContext({...context, stage: stage})
  const setId = id => setContext({...context, game: {id: id}})

  const onSuccessGetGame = (id) => {
    setStage('running')
    setId(id)
  }
  const onFailureGetGame = (r) => {console.log('No game created to you.', r)}

  const onSuccessListGame = (games) => {
    const l = games.filter(g => g.owner === username)
    setListGames(l)
  }
  const onFailureListGame = (r) => {console.log('No list games.', r)}

  // Refresh every 5 seconds and when mounted.
  const refresh = () => {
    getListGame(onSuccessListGame, onFailureListGame)
    getGameStarted(username, onSuccessGetGame, onFailureGetGame)
  }
  useEffect(refresh, [])
  useInterval(() => { if (stage !== 'running') refresh(); }, 5000)

  const onSuccessStart = () => setStage('running')
  const onFailureStart = (r) => console.log('Error start game: ',r)
  const buttonStart = (
    <Button onClick={() => startGame(game, onSuccessStart, onFailureStart)}>
      Comenzar
    </Button>
  )
  const list = (
    <Select
      placeholder='Select Game'
      onChange={e => setGame(e.target.value)}
    >
      { listGames.map((game, index) => (
          <option key={index} value={game.id}>{game.name}</option>
        ))
      }
    </Select>
  )

  if (stage === 'empty') {
    return (
      <Box w="50%">
        Espere a que se cree una partida.
      </Box>
    )
  }

  if (stage === 'running') {
      return (<Redirect to={'/game/'} push />)
    }

  if (context.stage === 'created') {
    // muestra usa lista de los juegos creados no iniciados, tal que soy owner.
    return (
      <Box w='50%'>
        Listo para jugar.
        {!!listGames && list}
        {!!listGames && buttonStart}
      </Box>
    )
  }

  return (
    <Box>Error</Box>
  )
}

export default JoinMenu
