import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { createAlbum, updateAlbum } from '../../api/albumData';
import getGenres from '../../api/genreData';
import { useAuth } from '../../utils/context/authContext';

function AlbumForm({ obj }) {
  const [formInput, setFormInput] = useState();
  const [genres, setGenres] = useState([]);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    getGenres().then(setGenres);
    setFormInput(obj);
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'genre') {
      setFormInput((prevState) => ({
        ...prevState,
        [name]: genres.filter((genre) => genre.id === Number(value)).shift(),
      }));
    } else {
      setFormInput((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      updateAlbum(formInput)
        .then(() => router.push(`/collection/${user.id}`));
    } else {
      const payload = {
        ...formInput,
      };
      createAlbum(payload).then(() => router.push(`/collection/${user.id}`));
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <h2 className="text-black mt-5">{
          obj.id ? 'Update' : 'Add'
} Album
        </h2>
        <FloatingLabel controlId="floatingInput1" label="Artist Name" className="mb-3">
          <Form.Control type="text" placeholder="Artist Name" name="artistName" value={formInput?.artistName} onChange={handleChange} required />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput2" label="Album Name" className="mb-3">
          <Form.Control type="text" placeholder="Album Name" name="albumName" value={formInput?.albumName} onChange={handleChange} required />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput3" label="Release Date" className="mb-3">
          <Form.Control type="text" placeholder="Release Date" name="release_date" value={formInput?.releaseDate} onChange={handleChange} required />
        </FloatingLabel>

        <FloatingLabel controlId="floatingSelect" label="genre">
          <Form.Select aria-label="Genre" name="genre" onChange={handleChange} className="mb-3" value={formInput?.genre?.id} required>
            <option value="">Select a Genre</option>
            {genres?.map((genre) => (
              <option key={genre.label} value={genre.id}>
                {genre.label}
              </option>
            ))}
          </Form.Select>
        </FloatingLabel>
        <Button className="add-album-btn" type="submit">{obj.id ? 'Update' : 'Add'} Album</Button>
      </Form>
    </div>
  );
}

AlbumForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    genre: PropTypes.shape({}),
  }),
};

AlbumForm.defaultProps = {
  obj: {},
};

export default AlbumForm;
