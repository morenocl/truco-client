const url = 'http://127.0.0.1:5000'

export const register = (body, onSuccess, onFailure) => {
  const path = url + '/user'
  const opt = {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  }
  fetch(path, opt)
    .then(r => r.json())
    .then(r => onSuccess(r))
    .cath(err => onFailure(err))
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
    .cath(err => onFailure(err))
}
