
import React,  { useState, createContext } from 'react';

const defaultContextApp = {
  auth: false,
  username: '',
  stage: 'empty',
}

export const ContextApp = createContext([
  defaultContextApp,
  (r) => {
    console.log('New context:', {...defaultContextApp, ...r})
    return {...defaultContextApp, ...r}
  }
])

export const ContextAppProvider = ({ children }) => {
  const [context, setContext] = useState(defaultContextApp)

  return (
    <ContextApp.Provider value={[context, setContext]}>
      {children}
    </ContextApp.Provider>
  )
}
