import {
  act,
  fireEvent,
  render,
  renderHook,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';

import { Control, useForm } from 'react-hook-form';

// Components
import { UpdateProfile } from '@/ui/components';

// Interfaces
import { TUserDetail } from '@/lib/interfaces';

// Constants
import { ERROR_MESSAGES } from '@/lib/constants';

// Services
import * as services from '@/lib/services/image';

const { result } = renderHook(() => useForm<TUserDetail>());

const setup = () => {
  const control: Control<TUserDetail> = result.current.control;
  const props = {
    control,
    onUploadError: jest.fn(),
  };

  return render(<UpdateProfile {...props} />);
};

const uploadImageMock = jest.fn();

jest.mock('@/lib/services/image', () => ({
  ...jest.requireActual('@/lib/services/image'),
  uploadImage: () => uploadImageMock,
}));

const onUploadErrorMock = jest.fn();

describe('UpdateProfile component', () => {
  beforeEach(() => {
    uploadImageMock.mockReturnValue('mock-url');
  });

  it('Profile component renders correctly', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });

  it('should not show an error message when uploading a valid file', async () => {
    const { container } = setup();

    uploadImageMock.mockResolvedValue('mock-url');

    const fileInput = container.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;

    const file = new File(['file contents'], 'test-image.png', {
      type: 'image/png',
    });

    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => expect(onUploadErrorMock).not.toHaveBeenCalled());
  });

  it('should show an error message when uploading an invalid file', async () => {
    const { container } = render(
      <UpdateProfile
        control={result.current.control}
        onUploadError={onUploadErrorMock}
      />,
    );

    const fileInput = container.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;

    const file = new File(['file contents'], 'test-image.txt', {
      type: 'text/plain',
    });

    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [file] } });
    });

    expect(onUploadErrorMock).toHaveBeenCalledWith(ERROR_MESSAGES.UPLOAD_IMAGE);
  });

  it('should show an error message when uploading an empty file', async () => {
    const { container } = render(
      <UpdateProfile
        control={result.current.control}
        onUploadError={onUploadErrorMock}
      />,
    );

    const fileInput = container.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;

    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [] } });
    });

    expect(onUploadErrorMock).toHaveBeenCalledWith(ERROR_MESSAGES.UPLOAD_IMAGE);
  });

  it('should show an error message when uploading large images', async () => {
    const { container } = render(
      <UpdateProfile
        control={result.current.control}
        onUploadError={onUploadErrorMock}
      />,
    );

    uploadImageMock.mockResolvedValue('mock-url');

    const fileInput = container.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;

    const largeFile = new File(['file contents'], 'large-image.png', {
      type: 'image/png',
    });

    Object.defineProperty(largeFile, 'size', {
      value: 6 * 1024 * 1024,
      writable: false,
    });

    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [largeFile] } });
    });

    expect(onUploadErrorMock).toHaveBeenCalledWith(
      ERROR_MESSAGES.UPLOAD_IMAGE_SIZE,
    );
  });

  it('should show an error message when uploading large images', async () => {
    jest.spyOn(services, 'uploadImage').mockImplementation(() => {
      throw new Error(ERROR_MESSAGES.UPDATE_FAIL.title);
    });

    const { container } = render(
      <UpdateProfile
        control={result.current.control}
        onUploadError={onUploadErrorMock}
      />,
    );

    const fileInput = container.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;

    const validFile = new File(['file contents'], 'valid-image.png', {
      type: 'image/png',
    });

    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [validFile] } });
    });

    expect(onUploadErrorMock).toHaveBeenCalledWith(
      ERROR_MESSAGES.UPDATE_FAIL.title,
    );
  });
});
