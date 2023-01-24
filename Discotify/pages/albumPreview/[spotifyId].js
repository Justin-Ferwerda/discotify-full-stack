import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Head from 'next/head';
import { getAlbums } from '../../api/albumData';
import SpotifyPlayer from '../../components/SpotifyPlayer';
import { useAuth } from '../../utils/context/authContext';
import { createWishlist } from '../../api/wishListData';

function AlbumPreview() {
  const router = useRouter();
  const { spotifyId } = router.query;
  const [albums, setAlbums] = useState([]);
  const { user } = useAuth();

  const handleClick = () => {
    router.push(`/album/saveToCollection/${spotifyId}`);
  };

  const setState = () => {
    getAlbums().then(setAlbums);
    console.warn(albums);
  };

  const addWishlist = () => {
    const albumToAdd = albums.filter((album) => album.spotify === spotifyId);
    const payload = {
      albumId: albumToAdd.id,
      userId: user.id,
    };
    createWishlist(payload);
    window.confirm(`added ${albumToAdd.albumName} by ${albumToAdd.artistName} to your wishlist!`);
    router.push('/');
  };

  useEffect(() => {
    setState();
  }, []);

  return (
    <>
      <Head>
        <title>Discotify - Preview</title>
        <meta name="description" content="meta description for Album Preview Page" />
      </Head>
      {albums?.some((album) => album.spotify === spotifyId) ? (
        <div>
          <h2 className="album-owned">Sorry album is already owned, would you like to add this album to your wishlist?</h2>
          <Button onClick={addWishlist}>Yes</Button>
          <Button onClick={() => router.push('/')}>Maybe Later</Button>
        </div>
      ) : (
        <div className="albumPreviewPage">
          <div className="preview-player">
            <SpotifyPlayer spotifyId={spotifyId} height={360} />
          </div>
          <Button className="save-to-collection-btn" onClick={handleClick}>Save To Collection</Button>
        </div>
      )}
    </>

  );
}

export default AlbumPreview;
