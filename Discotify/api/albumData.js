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

const getSingleAlbum = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/albums/${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const deleteAlbum = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/albums/${id}`, {
    method: 'DELETE',
  })
    .then(resolve)
    .catch(reject);
});

const updateAlbum = (album) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/albums`, {
    method: 'POST',
    body: JSON.stringify(album),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

export {
  createAlbum, getSingleAlbum, getAlbums, deleteAlbum, updateAlbum,
};
