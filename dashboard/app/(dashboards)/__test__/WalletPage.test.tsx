// Pages
import MyWalletPage from '../my-wallets/page';

const { render } = testLibReactUtils;

describe('MyWalletPage render', () => {
  test('Should render match with snapshot.', () => {
    const { container } = render(<MyWalletPage />);

    expect(container).toMatchSnapshot();
  });
});
