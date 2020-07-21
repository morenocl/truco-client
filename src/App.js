import React from 'react'

import { ContextAppProvider } from './contextApp'
import SignIn from './SignIn'


function App() {
  return (
    <ContextAppProvider>
      <div className="App" align='center'>
        <SignIn />
      </div>
    </ContextAppProvider>
  )
}

export default App
