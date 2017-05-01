// import { store } from '../index.js';

export function api(action : Object = {}) {
  // const token = store.getState().landtApp.auth.token console.log('calling api')

  const errors = []

  if (!action.method) {
    action.method = 'GET'
  }

  if (!action.endpoint) {
    errors.push('endpoint')
  }

  if (!action.payload && (action.method !== 'GET' && action.method !== 'DELETE')) {
    errors.push('payload')
  }

  if (errors.length) {
    throw new Error(`Error! You must pass \`${errors.join('`, `')}\``);
  }

  const headers = Object.assign({}, {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }, action.headers)

  return new Promise((resolve, reject) => {
    var params = {
      headers,
      method: action.method
    }

    if (params.method !== 'GET') {
      params.body = JSON.stringify(action.payload);
    }

    if (action.external) {
      params = {
        method: action.method,
        body: action.payload
      }
    }

    fetch(action.endpoint, params).then(response => {
      if (response.status >= 400) {
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
      } else {
        return response;
      }
    }).then(response => {
      const contentType = response
        .headers
        .get('content-type');
      if (contentType && contentType.indexOf('application/json') > -1) {
        return response.json();
      }

      return response.text();
    }).then(data => {
      resolve(data);
    }).catch(error => {
      /* istanbul ignore else */
      if (error.response) {
        const contentType = error
          .response
          .headers
          .get('content-type');

        if (contentType && contentType.indexOf('application/json') > -1) {
          error
            .response
            .json()
            .then(json => {
              reject({status: 'FAIL', code: error.response.status, error: error.response.statusText, data: json})
            })

          return;
        }

        error
          .response
          .text()
          .then(text => reject({status: 'FAIL', code: error.response.status, error: error.response.statusText, data: text}))
      }
    })
  })
}