import React, { useEffect } from 'react'

import GameScreen from './GameScreen'
import { ContextApp } from './contextApp'
import { useInterval } from './utils/useInterval'
import { getGameStatus } from './utils/Mock'


const GameContainer = ({context, setContext}) => {
  const { stage } = context
  const setState = (state) => setContext({...context, gameState: state})
  const setStage = stage => setContext({...context, stage: stage})
  const setError = () => {}

  // useEffect(() => {
  //   const init = (actions, board, hand, info) => {
  //     setState({actions, board, hand, info})
  //     setStage('running')
  //   }
  //   getGameStatus(init, setError)
  // })

  // Fetch data from API every 2 seconds.
  // useInterval(() => { if (stage !== 'frozen') getGameStatus(setState, setError); }, 2000)


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
