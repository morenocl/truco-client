import React, { useContext, useEffect } from 'react'

import GameScreen from './GameScreen'
import { ContextApp } from './contextApp'
import { useInterval } from './utils/useInterval'
import { getGameStatus } from './utils/Api'
import { getAction } from './Actions'

const Game = () => {
  const [context, setContext] = useContext(ContextApp)
  const { game, username, stage } = context
  const setStage = stage => setContext({...context, stage: stage})
  const setError = (r) => {console.log('Error get game status:', r); setStage('error')}

  const setGameState = (gameState, stage='running') => {
    const myIndex = gameState.players_info.findIndex(p => p.player === username)
    let currentPlayer = gameState.players_info.splice(myIndex, 1)
    currentPlayer = currentPlayer[0]
    for (let i in currentPlayer.actions) {
      const func = getAction(currentPlayer.actions[i])
      currentPlayer.actions[i] = {...currentPlayer.actions[i], func: func(game.id, username)}
    }
    setContext({
      ...context,
      stage: stage,
      game: {
        ...context.game,
        ...gameState,
        currentPlayer: currentPlayer
      }
    })
  }

  useEffect(() => {
    const init = (s) => {
     setGameState(s, 'running')
    }
    getGameStatus(game.id, username, init, setError)
  }, [])

  // Fetch data from API every 2 seconds.
  useInterval(() => { if (stage !== 'frozen') getGameStatus(game.id, username, setGameState, setError) }, 5000)

  // if (stage === 'running') {
  //   const playersInfo = game.players_info
  //   const myIndex = playersInfo.findIndex(p => p.player === username)
  //   let currentPlayer = playersInfo.splice(myIndex, 1)
  //   currentPlayer = currentPlayer[0]
  //   console.log('Container currentPlayer:', myIndex, currentPlayer)
  //   console.log('Container playersInfo', playersInfo)
  // }
  console.log('Render container game')
  if (stage === 'started')
    return <></>
  if (stage === 'running')
    return (
      <GameScreen
        currentPlayer={game.currentPlayer}
        playersInfo={game.players_info}
        name={game.name}
        points={game.points}
        turn={game.turn}
        username={username}
        winner={game.win}
      />
    )

  return <>Error</>
}

export default Game
