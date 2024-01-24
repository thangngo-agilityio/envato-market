import { SHOW_TIME, STATUS } from '@/lib/constants';
import { customToast } from '@/lib/utils';

describe('customToast function', () => {
  it('should return a toast object with specified title, description, status, and default options', () => {
    // Arrange
    const title = 'Test Title';
    const description = 'Test Description';
    const status: STATUS = STATUS.SUCCESS;

    const result = customToast(title, description, status);

    expect(result).toEqual({
      title: title,
      description: description,
      status: status,
      duration: SHOW_TIME,
      isClosable: true,
      position: 'top-right',
    });
  });

  it('should return a toast object with default options if no title, description, or status is provided', () => {
    const result = customToast();

    expect(result).toEqual({
      title: undefined,
      description: undefined,
      status: undefined,
      duration: SHOW_TIME,
      isClosable: true,
      position: 'top-right',
    });
  });
});
