import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const createAlbum = (albumObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/albums.json`, albumObj)
    .then((response) => {
      const payload = { albumFirebaseKey: response.data.name };
      axios.patch(`${dbUrl}/albums/${response.data.name}.json`, payload)
        .then((patchResponse) => resolve(patchResponse.data));
    }).catch(reject);
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
