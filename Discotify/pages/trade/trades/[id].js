/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { getUser } from '../../../api/userData';
import TradeCard from '../../../components/TradeCard';

function Trades() {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState();

  const getUserObject = async () => {
    const theUser = await getUser(id);
    setUser(theUser);
  };

  useEffect(() => {
    getUserObject();
  }, []);

  return (
    <>
      <Head>
        <title>Discotify - Trades</title>
        <meta name="description" content="meta description for Trades Page" />
      </Head>
      <div className="trade-page">
        {user?.trades?.length || user?.tradeRequests?.length ? (
          <>
            <div className="tradeRequestContainer">
              {user.trades?.map((trade) => (
                <TradeCard key={trade.id} tradeObj={trade} onUpdate={getUserObject} />
              ))}
            </div>
            <div className="tradeOfferContainer">
              {user.tradeRequests?.map((trade) => (
                <TradeCard key={trade.id} tradeObj={trade} onUpdate={getUserObject} />
              ))}
            </div>
          </>
        ) : (<div className="noTradesText"><div className="tText">Looks like you have no trades. Check out the community page to view other people&apos;s collections!</div></div>)}
      </div>

    </>

  );
}

export default Trades;
