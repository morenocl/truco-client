const url = 'http://127.0.0.1:5000'
// const url = 'https://truco-serv.herokuapp.com'

export const register = (body, onSuccess, onFailure) => {
  const path = url + '/user'
  const opt = {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  }

  fetch(path, opt)
    .then(r => {console.log(r); return r.json()})
    .then(r => onSuccess(r))
    .catch(err => onFailure(err))
}

export const login = (body, onSuccess, onFailure) => {
  const path = url + '/user/login'
  const opt = {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  }
  fetch(path, opt)
    .then(r => r.json())
    .then(r => onSuccess(r))
    .catch(err => onFailure(err))
}


export const getGameStarted = (username, onSuccess, onFailure) => {
  console.log('Get game started')
  const path = url + `/game/${username}`
  const opt = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }
  fetch(path, opt)
    .then(r =>  r.json())
    .then(r => {
      if (r.status === 'ok')
       onSuccess(r.id)
      else
        onFailure(r.message)
     })
    .catch(err => onFailure(err))
}


export const getPlayers = (onSuccess, onFailure) => {
  console.log('Get players')
  const path = url + '/user'
  const opt = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }
  fetch(path, opt)
    .then(r =>  r.json())
    .then(r => onSuccess(r.users))
    .catch(err => onFailure(err))
}


export const createGame = (body, onSuccess, onFailure) => {
  console.log('Create game')
  const path = url + '/game'
  const opt = {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  }
  fetch(path, opt)
    .then(r =>  r.json())
    .then(r => {
      if (r.status === 'ok')
       onSuccess(r.id)
      else
        onFailure(r.message)
     })
    .catch(err => onFailure(err))
}


export const startGame = (id, onSuccess, onFailure) => {
  console.log('start game')
  const path = url + `/game/${id}`
  const opt = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
  }
  fetch(path, opt)
    .then(r =>  r.json())
    .then(r => {
      if (r.status === 'ok')
        onSuccess(r)
      else
        onFailure(r.message)
      })
    .catch(err => onFailure(err))
}


export const getListGame = (onSuccess, onFailure) => {
  console.log('Get list player')
  const path = url + '/game'
  const opt = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }
  fetch(path, opt)
    .then(r =>  r.json())
    .then(r => {
      if (r.status === 'ok')
        onSuccess(r.games)
      else
        onFailure(r.message)
      })
    .catch(err => onFailure(err))
}
