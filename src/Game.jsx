import React, { useContext, useEffect } from 'react'

import GameScreen from './GameScreen'
import { ContextApp } from './contextApp'
import { useInterval } from './utils/useInterval'
import { getGameStatus } from './utils/Api'


const Game = () => {
  const [context, setContext] = useContext(ContextApp)
  const { game, username, stage } = context
  const setGameState = (game, stage='running') => setContext({...context, stage: stage, game: {...context.game, ...game}})
  const setStage = stage => setContext({...context, stage: stage})
  const setError = (r) => {console.log('Error get game status:', r); setStage('error')}

  useEffect(() => {
    console.log('Exect use effect')
    const init = (s) => {
     setGameState(s, 'running')
    }
    getGameStatus(game.id, username, init, setError)
  }, [])

  // Fetch data from API every 2 seconds.
   useInterval(() => { if (stage !== 'frozen') getGameStatus(game.id, username, setGameState, setError) }, 5000)


  console.log('Render container game')
  if (stage === 'started')
    return <></>
  if (stage === 'running')
    return (
      <GameScreen
        actions={[] /*game.actions*/}
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

// const Game = () => (
//   <ContextApp.Consumer>
//     {([context, setContext]) => <GameContainer context={context} setContext={setContext}/>}
//   </ContextApp.Consumer>
// )

export default Game
