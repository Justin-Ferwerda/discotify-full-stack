/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import Head from 'next/head';
import { getSingleAlbum } from '../../api/albumData';
import { createTrade } from '../../api/tradeData';
import AlbumCard from '../../components/AlbumCard';
import { useAuth } from '../../utils/context/authContext';

function Trade() {
  const router = useRouter();
  const [tradeObject, setTradeObject] = useState([]);
  const [formInput, setFormInput] = useState();
  const { id } = router.query;
  const { user } = useAuth();

  const getUserObject = () => {
    getSingleAlbum(id).then((res) => {
      setTradeObject(res);
    });
  };

  useEffect(() => {
    getUserObject();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.warn(formInput);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      tradeRecipientUser: tradeObject.user.id,
      user: user.id,
      traderAlbum: Number(formInput.albumName),
      tradeeAlbum: tradeObject.id,
    };
    createTrade(payload).then(() => {
      router.push(`/trade/trades/${user.id}`);
    });
  };

  return (
    <>
      <Head>
        <title>Discotify - Create Trade</title>
        <meta name="description" content="meta description for Create Trade Page" />
      </Head>
      <div className="tradeContainer">
        <AlbumCard src={tradeObject.recordImage} albumObj={tradeObject} />
      </div>
      <div className="my albums">
        <Form onSubmit={handleSubmit}>
          <FloatingLabel controlId="floatingSelect" label="album">
            <Form.Select aria-label="album" name="albumName" onChange={handleChange} className="mb-3" value={formInput?.id} required>
              <option value="">Select an Album From Your Collection to Trade</option>
              {user?.albums?.map((album) => (
                <option key={album.id} value={album.id}>
                  {album.album_name} - {album.artist_name}
                </option>
              ))}
            </Form.Select>
          </FloatingLabel>
          <Button type="submit">Request Trade</Button>
        </Form>
      </div>
    </>

  );
}

export default Trade;
