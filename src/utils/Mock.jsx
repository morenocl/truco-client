import data from './Data'

const mkPromise = (x) => (
  new Promise((res) => {
    setTimeout(() => {
      console.log('Got response')
      res(x && JSON.parse(JSON.stringify(data[x])))
    }, Math.random() * data.timeout)
  })
)

export const register = (form, onSuccess, onFailure) => {
  const username = form.username
  const password = form.password
  console.log('Signing up', username, password)

  mkPromise()
    .then(() => {
      // Check if user is registered.
      const found = data.users.find((user) => user.username === username)
      if (found) {
        onFailure(Error('User is already registered'))
      } else {
        // Register.
        data.users = [...data.users, { username, password }]
        onSuccess()
      }
    })
}

export const login = (form, onSuccess, onFailure) => {
  const username = form.username
  const password = form.password
  console.log('Logging in', username, password);

   mkPromise()
     .then(() => {
       // Check if user is registered.
       const user = data.users.find((x) => x.username === username);
       const pass = data.users.find((x) => x.password === password);
       if (user && pass) {
         onSuccess({ token: 'token' });
       } else if (!user) {
         onFailure(Error('Failed to login: You are not registered'));
       } else if (!pass) {
         onFailure(Error('Failed to login: Password invalid'));
       }
     });
}

export const getPlayers = (onSuccess, onFailure) => {
  console.log('Getting players.')
  mkPromise()
    .then(() => {
      const users = data.users
      onSuccess(users)
    })
}

export const createGame = (user, title, numPlayers, nos, ellos, onSuccess, onFailure) => {
  console.log('Creating game:', user, title, numPlayers, nos, ellos)

  mkPromise()
    .then(() => {
      data.game = { title, numPlayers, nos, ellos, game_started: false, owner: user }
      onSuccess()
      console.log(data.game)
    })
}

export const getGameStarted = (onSuccess, onFailure) => {
  console.log('Got game_started:')
  const isEmpty = (dict) => Object.keys(dict).length === 0

  mkPromise()
    .then(() => {
      console.log('Estado Game: ', isEmpty(data.game))
      if (isEmpty(data.game)) {
        onFailure()
      } else {
        const is_started = data.game['game_started']
        onSuccess(is_started)
      }
    })
}

export const startGame = () => {
  console.log('Set start game.')
  mkPromise()
    .then(() => {
      data.game = {...data.game, game_started: true}
    })
}

export const getGameStatus = (onSuccess, onFailure) => {
  console.log('got game status')

  const actions = data.actions
  const board = data.board
  const hand = data.hand
  const info = data.info

  mkPromise()
    .then(() => {
      onSuccess(actions, board, hand, info)
    })
}
