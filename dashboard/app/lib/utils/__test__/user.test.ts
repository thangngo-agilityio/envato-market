import { MOCK_USER_DETAIL, USER_MOCK } from '@/lib/mocks';
import { formatUserResponse } from '..';

describe('getDataUser', () => {
  it('transforms transactions correctly', () => {
    const result = formatUserResponse([MOCK_USER_DETAIL]);

    const {
      id,
      workTime,
      level,
      position,
      lastActive,
      lastPlace,
      salary,
      jobTitle,
      firstName,
      lastName,
      avatarURL,
      experience,
    } = USER_MOCK;

    expect(result).toEqual([
      {
        id: id,
        workTime: workTime,
        level: level,
        position: position,
        lastActive: lastActive,
        lastPlace: lastPlace,
        salary: salary,
        experience,
        name: `${firstName} ${lastName}`,
        image: avatarURL,
        jobTitle,
      },
    ]);
  });

  it('transforms transactions with empty data', () => {
    const result = formatUserResponse();

    expect(result).toEqual([]);
  });
});
