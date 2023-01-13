/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Avatar } from '@mui/material';
import { useAuth } from '../utils/context/authContext';

function UserCard({ userObject }) {
  const router = useRouter();
  const { user } = useAuth();

  const handleClick = () => {
    router.push(`/collection/${userObject.id}`);
  };

  return (
    <div className="usercard">
      <Card className="userCard">
        <Card.Body>
          <Avatar alt={userObject.userName} src={userObject.image} sx={{ width: 75, height: 75 }} />
          <Card.Title>
            {userObject.userName}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted"><strong>Member Since: </strong>{userObject.memberSince}</Card.Subtitle>
          <Card.Text>
            <strong>Favorite Genre: {user.favoriteGenre.label} </strong>
          </Card.Text>
          {userObject.id === user.id ? (
            <div />
          ) : router.asPath === `/collection/${userObject.id}` ? (
            <div />
          ) : (
            <div>
              <Button className="view-collection-btn" variant="outline-secondary" onClick={handleClick}>View Collection</Button>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

UserCard.propTypes = {
  userObject: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    memberSince: PropTypes.string,
    favoriteGenre: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
};

export default UserCard;
