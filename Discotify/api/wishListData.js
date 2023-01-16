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

const deleteWish = (albumid) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/wishlist/${albumid}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
    },
  })
    .then(resolve)
    .catch(reject);
});

export {
  createWishlist, deleteWish,
};
