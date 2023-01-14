/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import AlbumCard from '../../components/AlbumCard';
import { getUser } from '../../api/userData';

function WishList() {
  const router = useRouter();
  const [user, setUser] = useState({});
  const { id } = router.query;

  const getUserObject = async () => {
    const theUser = await getUser(id);
    setUser(theUser);
  };

  const wishlist = user?.wishlist?.map((wish) => wish.album);

  useEffect(() => {
    getUserObject();
  }, []);

  return (
    <>
      <Head>
        <title>Discotify - Wishlist</title>
        <meta name="description" content="meta description for Wishlist Page" />
      </Head>
      <h2 className="wishlist-title">My Wishlist</h2>
      {wishlist?.length ? (
        <div className="wishlist-container" id="wishListContainer">
          {wishlist.map((album) => (
            <AlbumCard key={album.id} src={album.record_image} albumObj={album} onUpdate={getUserObject} router={router.asPath} />
          ))}
        </div>
      ) : (
        <div className="noTradesText"><div className="tText">Go to the Community Page to add Albums to Your Wishlist!</div></div>
      )}
    </>

  );
}

export default WishList;
