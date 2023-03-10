import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { getAlbum, spotify } from '../../../api/spotifyData';
import AlbumForm from '../../../components/forms/AlbumForm';
import { useAuth } from '../../../utils/context/authContext';

export default function EditPlayer() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { spotifyId } = router.query;
  const { user } = useAuth();

  const getAlbumInfo = async () => {
    const token = await spotify();
    getAlbum(token, spotifyId).then((response) => {
      const object = {
        artistName: response.artists[0].name,
        albumName: response.name,
        releaseDate: response.release_date,
        recordImage: response.images[1].url,
        spotifyId,
        trackList: response.tracks.items,
        userId: user.id,
      };
      setEditItem(object);
      console.warn(object);
    });
  };

  useEffect(() => {
    getAlbumInfo();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>Discotify - Save Album</title>
        <meta name="description" content="meta description for Save Page" />
      </Head>
      <AlbumForm obj={editItem} />
    </>
  );
}
