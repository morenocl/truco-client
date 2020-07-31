
const PLAYERS = [
  {
    username: 'user1',
    team: 'ellos',
    cards: [],
    playedCards: [{n: 4, p:'C'}, {n: 1, p:'E'}],
  },
  {
    username: 'user2',
    team: 'nos',
    cards: [],
    playedCards: [{n: 4, p:'C'}, {n: 1, p:'E'}],
  },
  {
    username: 'user3',
    team: 'ellos',
    cards: [],
    playedCards: [{n: 4, p:'C'}, {n: 1, p:'E'}],
  },
  {
    username: 'user2',
    team: 'nos',
    cards: [{n: ' ', p: ' '}],
    playedCards: [{n: 4, p:'C'}, {n: 1, p:'E'}],
  },
  {
    username: 'user3',
    team: 'ellos',
    cards: [],
    playedCards: [{n: 4, p:'C'}, {n: 1, p:'E'}],
  },
]

const ACTIONS = [
  {
    type: 'envido',
    payload: '29',
  },
  {
    type: 'truco',
    payload: '',
  },
  {
    type: 'Fin Turno',
    payload: '',
  },
  {
    type: 'Al Mazo',
    payload: '',
  },
  {
    type: 'Fin Turno',
    payload: '',
  },
  {
    type: 'Fin Turno',
    payload: '',
  },
]

const data = {
  timeout: 100,
  users: [
    { username: 'chris', password: '1234'},
    { username: 'user1', password: '1234'},
    { username: 'user2', password: '1234'},
    { username: 'user3', password: '1234'},
    { username: 'user4', password: '1234'},
  ],
  game: {
    players: PLAYERS,
    hand: ['carta1', 'carta2', 'carta3']
  },
  actions: ACTIONS,
  info: {
    username: 'chris',
    points: [15, 10],
    cards: [{n: 1, p:'E'}, {n: 3, p:'B'}],
    playedCards: [{n: 4, p:'C'}],
  }
}

export default data
