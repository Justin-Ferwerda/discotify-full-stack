import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getUser = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/users/${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getAllUsers = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/users`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export { getUser, getAllUsers };
