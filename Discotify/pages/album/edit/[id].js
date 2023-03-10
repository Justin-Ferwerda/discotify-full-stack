import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { getSingleAlbum } from '../../../api/albumData';
import AlbumForm from '../../../components/forms/AlbumForm';

export default function EditAlbum() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    getSingleAlbum(id).then(setEditItem);
  }, [id]);

  return (
    <>
      <Head>
        <title>Discotify - Edit Album</title>
        <meta name="description" content="meta description for Edit Page" />
      </Head>
      <AlbumForm obj={editItem} />
    </>
  );
}
