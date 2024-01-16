// Constants
import { IMAGES } from '@/lib/constants';

// Utils
import { MESSAGE_TIME_FORMAT } from '.';

// Components
import { FallbackImage } from '@/ui/components';

export const MEMBER_CHAT = [
  {
    id: 'user1',
    avatar: 'https://example.com/avatar1.jpg',
    name: 'Kien Nguyen',
    status: 'Online',
    localeTime: MESSAGE_TIME_FORMAT,
    icon: (
      <FallbackImage w={5} h={5} src="icons/file.svg" alt={IMAGES.ATTACH.alt} />
    ),
    statusColor: 'online',
  },
  {
    id: 'user2',
    avatar: 'https://example.com/avatar2.jpg',
    name: 'Huy Pham',
    status: 'Away',
    localeTime: MESSAGE_TIME_FORMAT,

    icon: (
      <FallbackImage w={5} h={5} src="icons/file.svg" alt={IMAGES.ATTACH.alt} />
    ),
    statusColor: 'offline',
  },
];
