// Mocks
import { CONVERSATION_PROPS } from '@/lib/mocks';
import { Conversation } from '../..';

describe('ChatMember component', () => {
  test('Should render match with snapshot.', () => {
    const { container } = render(<Conversation {...CONVERSATION_PROPS} />);

    expect(container).toMatchSnapshot();
  });
});
