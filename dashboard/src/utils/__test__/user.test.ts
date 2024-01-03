import { USER_MOCK } from '@app/mocks';

import { getDataUser } from '..';

describe('getDataUser', () => {
  it('transforms transactions correctly', () => {
    const result = getDataUser([USER_MOCK]);

    const {
      id,
      workTime,
      level,
      position,
      lastActive,
      lastPlace,
      salary,
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
      },
    ]);
  });

  it('transforms transactions with empty data', () => {
    const result = getDataUser();

    expect(result).toEqual([]);
  });
});
