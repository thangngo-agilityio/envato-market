import ListMessages from '../ListMessage';

const { render } = testLibReactUtils;

describe('ListMessages render', () => {
  test('Should render match with snapshot.', () => {
    const { container } = render(
      <ListMessages
        messages={[
          {
            date: {
              nanoseconds: 1,
              seconds: 12,
            },
            id: '12',
            senderId: '1',
            text: 'Hello',
          },
        ]}
      />,
    );

    expect(container).toMatchSnapshot();
  });
});
