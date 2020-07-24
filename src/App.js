import React from 'react'

import { ContextAppProvider } from './contextApp'
import Routes from './Routes'


function App() {
  return (
    <ContextAppProvider>
      <div className="App" align='center'>
        {/* console.log('Context auth', context['auth']) */}
        <Routes />
      </div>
    </ContextAppProvider>
  )
}

export default App
