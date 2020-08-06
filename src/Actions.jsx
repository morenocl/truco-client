import { playAction } from './utils/Api'


const onSuccess = () => {}
const onFailure = () => {}

export const getAction = (action) => {
  switch (action.type) {
    case 'end_turn':
      console.log('get action: end_turn.')
      return (id, username) => () => {
        console.log('end_turn clicked')
        playAction(id, username, action, onSuccess, onFailure)
      }
    default:
      console.log('No action to ', action)
      return () => {}
  }
}
