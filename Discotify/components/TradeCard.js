/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { deleteTrade, resolveTrade } from '../api/tradeData';

function TradeCard({ tradeObj, onUpdate }) {
  const { user } = useAuth();

  const deleteThisTrade = () => {
    deleteTrade(tradeObj.id).then(() => {
      onUpdate();
    });
  };

  const approveTrade = () => {
    const payload = {
      user1: tradeObj.user.id,
      album1: tradeObj.tradee_album.id,
      user2: tradeObj.trade_recipient_user.id,
      album2: tradeObj.trader_album.id,
      trade: tradeObj.id,
    };
    resolveTrade(payload).then(() => {
      onUpdate();
    });
  };

  return (
    <div className="tradeCard border border-dark">
      <img src={tradeObj?.trader_album?.record_image} alt="record" className="border border-dark" />
      <SyncAltIcon />
      <img src={tradeObj?.tradee_album?.record_image} alt="record" className="border border-dark" />
      {tradeObj.user.id === user?.id ? (
        <div className="trade-btn-container">
          <Button className="rescind-trade-btn" onClick={deleteThisTrade}>Rescind Trade</Button>
        </div>
      ) : (
        <div className="trade-btn-container">
          <Button className="approve-trade-btn" onClick={approveTrade}>Approve Trade</Button>
          <Button className="deny-trade-btn" onClick={deleteThisTrade}>Deny Trade</Button>
        </div>
      )}
    </div>
  );
}

TradeCard.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  tradeObj: PropTypes.shape({
    id: PropTypes.number,
    user: PropTypes.shape({
      id: PropTypes.number,
    }),
    trader_album: PropTypes.shape({
      id: PropTypes.number,
      record_image: PropTypes.string,
    }),
    tradee_album: PropTypes.shape({
      id: PropTypes.number,
      record_image: PropTypes.string,
    }),
    trade_recipient_user: PropTypes.shape({
      id: PropTypes.number,
    }),

  }).isRequired,
};

export default TradeCard;
