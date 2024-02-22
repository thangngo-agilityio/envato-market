import dynamic from 'next/dynamic';

const TransactionSection = dynamic(
  () => import('@/ui/sections/TransactionSection'),
);

const Transactions = () => <TransactionSection />;

export default Transactions;
