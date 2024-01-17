import dynamic from 'next/dynamic';

//
import InboxSection from '@/ui/sections/Inbox';

const Inbox = dynamic(() => Promise.resolve(InboxSection), {
  ssr: false,
});

export default Inbox;
