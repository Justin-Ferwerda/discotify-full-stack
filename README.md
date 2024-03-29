# Welcome to Discotify!

Discotify is my frontend capstone project for NSS E-19. I recently did a refactor to make it a full-stack application connected to a django back end.
It was built with Javascript, react and Next.js on the front end, and Python/Django on the back end.

My focus on this project was using external data to provide most of the functionality and have it be a very simple user-friendly flow through the app.

## Getting Started

In order to access all features of the app, you will need these API keys-

  * [Spotify](https://developer.spotify.com/) - to get album and track info
  * [Bands In Town](https://artists.bandsintown.com/support/api-installation) - for show data
  * [Youtube](https://developers.google.com/youtube/v3) - to get videos for tracks 

BandsinTown and Youtube API keys are optional, as they are only needed for a couple small features, but you will need the Spotify API credentials in order to use the app.

You will also need to utilize Firebase to enable Google Authentication.

[Firebase Instructions](/Firebase.md)

You will place your keys in a .env in the /discotify-full-stack/discotify folder.

[Sample .env](/Discotify/public/images/sampleEnv.png)


The easiest way to get this project running locally is to utilize the Docker containerization I have done.

[Installation using Docker](/DockerInstallation.md)

## Features

### Login
![sign in](Discotify/public/images/logoScreenshot.png)

After logging in, you will be directed to enter an album name. This is the only part of the site that requires a user to type information.

![enter album](Discotify/public/images/albumEnter.png)

After saving an album to your collection, you will be guided to this screen, where you can access the rest of the features of the app.

![home page](Discotify/public/images/homePage.png)

### Users Can -

  * View their Collection
  * Listen to their Albums via Spotify embedded player (You must be logged in to Spotify on your browser to listen to full tracks)
  * Edit and Delete Their Collection
  * Create and Make trades with other users
  * Add albums to their wishlist
  * View other users' collections
  * See Upcoming shows by artists in their collection, and go to buy tickets from whatver ticket agency is hosting the show.

  A small easter egg exists where if you click on an individual track in a tracklist, a youtube video will play that is a live version of that track.


## Code Snippets

Here is a bit of the Spotify Auth work in action- 

```javascript
const spotify = () => new Promise((resolve, reject) => {
  axios('https://accounts.spotify.com/api/token', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${btoa(`${spotifyAuth.clientId}:${spotifyAuth.clientSecret}`)}`,
    },
    data: 'grant_type=client_credentials',
    method: 'POST',
  }).then((response) => resolve(response.data.access_token))
    .catch((error) => reject(error));
});

const spotifySearch = (token, albumTitle) => new Promise((resolve, reject) => {
  const albumName = capitalizeAlbum(albumTitle);
  axios.get(`https://api.spotify.com/v1/search?q=${albumName}&type=album`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    const albumObject = response.data.albums.items.filter((album) => album.name === `${albumTitle}` && album.album_type === 'album');
    resolve(albumObject.shift());
  }).catch((error) => reject(error));
});
```

The Youtube API Call- 

```javascript
const getVideo = (artistAndAlbum) => new Promise((resolve, reject) => {
  axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${artistAndAlbum}&key=${youTubeAuth.apiKey}`)
    .then((response) => resolve(response.data.items.filter((video) => video.snippet.title.toLowerCase().includes('live')).shift()))
    .catch((error) => reject(error));
});
```
## ERD

![ERD](Discotify/public/images/ERD.png)

## Loom Video

[Loom Walkthrough](https://www.loom.com/share/e622aef136794b3e99c83dc90b4baa72)
