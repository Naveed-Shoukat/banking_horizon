import HeaderBox from '@/components/HeaderBox';
import RightSidebar from '@/components/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import { getLoggedInUser } from '@/lib/actions/user.action';
import React from 'react';

const Home = async () => {
  const loggedIn = await getLoggedInUser();
  const firstName = loggedIn?.name.split(' ')[0] || 'Guest';

  return (
    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
          <HeaderBox
            type='greeting'
            title='Welcome'
            user={firstName}
            subText='Access and manage your various accounts & transactions efficiently'
          />
          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1250.35}
          />
        </header>
        RECENT TRANSACTIONS
      </div>

      <RightSidebar user={loggedIn} transasctions={[]} banks={[{currentBalance: 1254.75}, {currentBalance: 7458.96}]}/>
    </section>
  );
};

export default Home;
