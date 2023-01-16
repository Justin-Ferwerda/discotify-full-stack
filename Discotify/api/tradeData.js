import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const createTrade = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/trades`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const resolveTrade = (data) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/trades/resolve_trade`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

const deleteTrade = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/trades/${id}`, {
    method: 'DELETE',
  })
    .then(resolve)
    .catch(reject);
});

export {
  createTrade, resolveTrade, deleteTrade,
};
