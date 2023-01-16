/* eslint-disable no-nested-ternary */
/* eslint-disable @next/next/no-img-element */
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import TracklistModal from './TracklistModal';
import {
  createWishlist, deleteWish,
} from '../api/wishListData';
import SpotifyPlayer from './SpotifyPlayer';
import { deleteAlbum } from '../api/albumData';
import { useAuth } from '../utils/context/authContext';

function AlbumCard({
  // eslint-disable-next-line no-unused-vars
  src, albumObj, onUpdate, router,
}) {
  const { user } = useAuth();

  const deleteThisAlbum = () => {
    if (window.confirm(`Delete ${albumObj.albumName}?`)) {
      deleteAlbum(albumObj.id).then(() => onUpdate());
    }
  };

  const addToWishlist = () => {
    if (user.wishlist?.some((wish) => wish.album.id === albumObj.id)) {
      alert('Album already in Wishlist!');
    } else {
      const payload = {
        albumId: albumObj.id,
        userId: user.id,
      };
      createWishlist(payload).then(() => onUpdate());
      window.confirm(`added ${albumObj.albumName} by ${albumObj.artistName} to your wishlist!`);
    }
  };

  const removeFromWishlist = () => {
    deleteWish(albumObj.id).then(() => {
      onUpdate();
    });
  };

  return (
    <div className="albumCard border border-dark">
      <Flippy
        flipOnHover={false}
        flipOnClick
        flipDirection="horizontal"
        style={{ width: '300px', height: '300px' }}
      >
        <FrontSide className="cardFront">
          <img src={src} alt="album cover" />
        </FrontSide>
        <BackSide className="cardBack" style={{ backgroundColor: '#fff6ea' }}>
          <TracklistModal className="modal" obj={albumObj} />
          <h6 className="artistName">{albumObj.artistName}</h6>
          <h6 className="albumName">{albumObj.albumName}</h6>
          <h6>released: {albumObj.releaseDate}</h6>
          <SpotifyPlayer height={80} spotifyId={albumObj?.spotify} />
          <img className="albumCardUserImage" src={albumObj?.user?.image} alt="headshot" />
          <div className="cardButtons">
            {router === `/trade/trades/${user?.id}` ? (<div />) : albumObj?.user?.id === user?.id ? (
              <>
                <Link href={`/album/edit/${albumObj?.id}`} passHref>
                  <IconButton aria-label="edit" className="edit-btn">
                    <EditIcon style={{ color: 'black' }} />
                  </IconButton>
                </Link>
                <IconButton aria-label="delete" className="delete-btn " onClick={deleteThisAlbum}>
                  <DeleteIcon style={{ color: 'black' }} />
                </IconButton>
              </>
            ) : router === `/wishlist/${user.id}` ? (
              <>
                <Button size="sm" className="remove-wishlist-btn" variant="outline-secondary" onClick={removeFromWishlist}>Remove From Wishlist</Button>
                <Link href={`/trade/${albumObj?.id}`} passHref>
                  <Button size="sm" className="trade-btn" variant="outline-secondary">TRADE</Button>
                </Link>
              </>
            ) : router === `/trade/${albumObj?.id}` ? (<div />) : (
              <Button className="add-to-wishlist-btn" size="sm" variant="outline-secondary" onClick={addToWishlist}>Add to Wishlist</Button>
            )}
          </div>

        </BackSide>
      </Flippy>
    </div>
  );
}

AlbumCard.propTypes = {
  src: PropTypes.string,
  onUpdate: PropTypes.func,
  albumObj: PropTypes.shape({
    artistName: PropTypes.string,
    albumName: PropTypes.string,
    releaseDate: PropTypes.string,
    spotify: PropTypes.string,
    id: PropTypes.number,
    user: PropTypes.shape({
      image: PropTypes.string,
      id: PropTypes.number,
    }),
  }).isRequired,
  router: PropTypes.string,
};

AlbumCard.defaultProps = {
  router: '',
  onUpdate: null,
  src: '',
};

export default AlbumCard;
