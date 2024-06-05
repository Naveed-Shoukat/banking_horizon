import HeaderBox from '@/components/HeaderBox';
import RightSidebar from '@/components/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import React from 'react';

const Home = () => {
  const loggedIn = { firstName: 'Naveed', lastName: 'Shaukat', email:'shoukat.naveed@gmail.com' };

  return (
    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
          <HeaderBox
            type='greeting'
            title='Welcome'
            user={loggedIn.firstName || 'Guest'}
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
