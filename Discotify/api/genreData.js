import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getGenres = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/genres`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export default getGenres;
