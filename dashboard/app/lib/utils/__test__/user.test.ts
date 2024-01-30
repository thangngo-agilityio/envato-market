// Mocks
import { MOCK_USER_DETAIL, MOCK_USER_DETAIL_WITHOUT_IMAGE } from '@/lib/mocks';

// Utils
import { formatUserResponse } from '@/lib/utils';

// Constants
import { IMAGES } from '@/lib/constants';

describe('formatUserResponse', () => {
  it('transforms transactions correctly', () => {
    const result = formatUserResponse([MOCK_USER_DETAIL]);

    expect(result).toEqual([
      {
        id: '1',
        image: 'https://cdn-icons-png.flaticon.com/512/5556/5556468.png',
        name: 'Abdur Rohman',
        email: 'test@gmail.com',
        createdAt: 'Jan 01, 1970',
        isBlock: false,
        uid: '1',
      },
    ]);
  });

  it('transforms transactions without image', () => {
    const result = formatUserResponse([MOCK_USER_DETAIL_WITHOUT_IMAGE]);

    expect(result).toEqual([
      {
        id: '1',
        image: IMAGES.AVATAR.url,
        name: 'Abdur Rohman',
        email: 'test@gmail.com',
        createdAt: 'Jan 01, 1970',
        isBlock: false,
        uid: '2',
      },
    ]);
  });

  it('transforms transactions with empty data', () => {
    const result = formatUserResponse();

    expect(result).toEqual([]);
  });
});
