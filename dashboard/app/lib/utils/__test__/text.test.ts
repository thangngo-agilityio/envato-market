// Mocks
import { MOCK_USER_DETAIL } from '@/lib/mocks';

// Utils
import { convertToString } from '@/lib/utils';

describe('convertToString function', () => {
  it('should convert a value to a JSON string', () => {
    const inputObject = MOCK_USER_DETAIL;

    const jsonString = convertToString(inputObject);

    expect(jsonString).toEqual(
      '{"id":"1","_id":"1","title":"What is the issues","avatarURL":"https://cdn-icons-png.flaticon.com/512/5556/5556468.png","password":"123456","phoneNumber":"02342423","country":"LD","city":"DL","address":"123 TMT","postalCode":"1234","firstName":"Abdur","lastName":"Rohman","email":"test@gmail.com","role":"member","description":"description","createdAt":3123123,"isBlock":false,"uid":"1"}',
    );
  });
});
