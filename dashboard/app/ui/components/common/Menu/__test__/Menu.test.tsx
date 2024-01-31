// component
import { HELP_ITEM_LIST, OTHER_ITEM_LIST, ROUTES } from '@/lib/constants';
import Menu from '..';
import userEvent from '@testing-library/user-event';
import * as navigation from 'next/navigation';

describe('Menu component', () => {
  test('renders Logo with content', () => {
    const { container } = testLibReactUtils.render(
      <Menu listItem={HELP_ITEM_LIST} />,
    );
    expect(container).toMatchSnapshot();
  });

  test('handle logout', async () => {
    const routerPushMock = jest.fn();
    jest.spyOn(navigation, 'useRouter').mockReturnValue({
      push: routerPushMock,
    } as unknown as ReturnType<typeof navigation.useRouter>);
    const { getByText } = testLibReactUtils.render(
      <Menu listItem={OTHER_ITEM_LIST} />,
    );

    const signOut = getByText(/sign out/i);

    await userEvent.click(signOut);
    testLibReactUtils.waitFor(() => {
      expect(routerPushMock).toHaveBeenCalledWith(`/${ROUTES.SIGN_OUT}`);
    });
  });
});
