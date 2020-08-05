import React, { useEffect } from 'react'

import GameScreen from './GameScreen'
import { ContextApp } from './contextApp'
import { useInterval } from './utils/useInterval'
import { getGameStatus } from './utils/Api'


const GameContainer = ({context, setContext}) => {
  const { id, stage } = context
  const setGameState = (state) => setContext({...context, gameState: state})
  const setStage = stage => setContext({...context, stage: stage})
  const setError = (r) => {console.log('Error get game status:', r); setStage('error')}

  // useEffect(() => {
  //   const init = (actions, board, hand, info) => {
  //     setGameState({actions, board, hand, info})
  //     setStage('running')
  //   }
  //   getGameStatus(id, init, setError)
  // })

  // Fetch data from API every 2 seconds.
  // useInterval(() => { if (stage !== 'frozen') getGameStatus(id, setGameState, setError); }, 2000)
  getGameStatus(id, setGameState, setError)


  console.log('Render container game')
  return (
    <GameScreen />
  )
}

const Game = () => (
  <ContextApp.Consumer>
    {([context, setContext]) => <GameContainer context={context} setContext={setContext}/>}
  </ContextApp.Consumer>
)

export default Game
