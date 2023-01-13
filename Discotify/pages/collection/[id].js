/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Form, FloatingLabel } from 'react-bootstrap';
import Head from 'next/head';
import { getUser } from '../../api/userData';
import AlbumCard from '../../components/AlbumCard';
import UserCard from '../../components/UserCard';

function MyAlbums() {
  const router = useRouter();
  const [albums, setAlbums] = useState([]);
  const [user, setUser] = useState({});
  const [selected, setSelected] = useState();
  const { id } = router.query;
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const getUserObject = () => {
    getUser(id).then((res) => setUser(res)).then(setAlbums(user.albums));
  };

  const handleChange = (e) => {
    setSelected(e.target.value);
    if (e.target.value === 'all-albums') {
      setAlbums(user.albums);
    } else {
      setAlbums(user.albums.filter((album) => album.genre.label === e.target.value));
    }
  };

  useEffect(() => {
    getUserObject();
  }, []);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== '') {
      const filteredData = user.albums.filter((album) => Object.values(album).join('').toLowerCase().includes(searchInput.toLowerCase()));
      setFilteredResults(filteredData);
    } else { setFilteredResults(albums); }
  };

  return (
    <>
      <Head>
        <title>Discotify - My Collection</title>
        <meta name="description" content="meta description for Collection Page" />
      </Head>
      <div className="collectionUserCard">
        <UserCard userObject={user} />
      </div>
      <div className="search">
        <Form.Control icon="search" placeholder="Search Albums" onChange={(e) => searchItems(e.target.value)} />
      </div>
      <div className="sort">
        <FloatingLabel controlId="floatingSelect" label="Sort">
          <Form.Select aria-label="Genre" name="genre" onChange={handleChange} className="mb-3" value={selected} required>
            <option value="all-albums">All Albums</option>
            {user.unique_genres?.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </Form.Select>
        </FloatingLabel>
      </div>
      <div className="myAlbums">
        {searchInput.length > 1 ? (
          <div>
            {filteredResults?.map((album) => (
              <AlbumCard key={album.albumFirebaseKey} src={album.recordImage} albumObj={album} onUpdate={getUserObject} />
            ))}
          </div>
        ) : (
          <div>
            {albums?.map((album) => (
              <AlbumCard key={album.id} src={album.record_image} albumObj={album} onUpdate={getUserObject} />
            ))}
          </div>
        )}
      </div>
    </>

  );
}

export default MyAlbums;
