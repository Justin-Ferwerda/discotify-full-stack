import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const createWishlist = (wish) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/wishlist`, {
    method: 'POST',
    body: JSON.stringify(wish),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const deleteWish = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/wishlist/${id}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
    },
  })
    .then(resolve)
    .catch(reject);
});

const getUserWishlist = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/wishlist.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const getWishByFirebaseKey = (albumFirebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/wishlist.json?orderBy="albumFirebaseKey"&equalTo="${albumFirebaseKey}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

export {
  createWishlist, getUserWishlist, getWishByFirebaseKey, deleteWish,
};
