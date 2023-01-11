import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const createAlbum = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/albums`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const getAlbums = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/albums`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleAlbum = (albumFirebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/albums/${albumFirebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

export {
  createAlbum, getSingleAlbum, getAlbums,
};
