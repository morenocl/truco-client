
import React,  { useState, createContext } from 'react';

const defaultContextApp = {
  auth: false,
  username: '',
}

export const ContextApp = createContext([defaultContextApp, ()=>{console.log('context default')}])

export const ContextAppProvider = ({ children }) => {
  const [context, setContext] = useState(defaultContextApp)

  return (
    <ContextApp.Provider value={[context, setContext]}>
      {children}
    </ContextApp.Provider>
  )
}
