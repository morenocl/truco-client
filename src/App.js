import React, { useContext } from 'react'

import { ContextAppProvider } from './contextApp'
import { ContextApp } from './contextApp'
import Routes from './Routes'


function App() {
  const [context, setContext] = useContext(ContextApp)

  return (
    <ContextAppProvider>
      <div className="App" align='center'>
        <Routes auth={context['auth']}/>
      </div>
    </ContextAppProvider>
  )
}

export default App
