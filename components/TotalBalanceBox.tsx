import { formatAmount } from '@/lib/utils';
import React from 'react';
import AnimatedCounter from './AnimatedCounter';
import DoughnutChart from './DoughnutChart';


const TotalBalanceBox = ({
  accounts = [],
  totalBanks,
  totalCurrentBalance,
}: TotlaBalanceBoxProps) => {
  const totalBanksText =
    totalBanks > 1
      ? `You have ${totalBanks} Bank Accounts linked`
      : totalBanks === 1
      ? `You have 1 Bank Account linked`
      : `You don't have any account linked, please link your accounts.`;

  return (
    <section className='total-balance'>
      <div className='total-balance-chart'>
        <DoughnutChart accounts={accounts} />
      </div>
      <div className='flx flex-col gap-6'>
        <h2 className='header-2'>{totalBanksText}</h2>
        <div className='flex flex-col gap-2'>
          <p className='total-balance-label'>Total Current Balance</p>
          <div className='total-balance-amount flex-center gap-2'>
            <AnimatedCounter amount={totalCurrentBalance} />
            {/* {formatAmount(totalCurrentBalance)} */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TotalBalanceBox;
