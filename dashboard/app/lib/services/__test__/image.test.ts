import axios from 'axios';

// Services
import { uploadImage } from '@/lib/services';
import { ERROR_MESSAGES } from '@/lib/constants';

// Mocks
// import { STATISTICAL } from '@/lib/mocks';

jest.mock('axios');

describe('uploadImage', () => {
  it('should upload an image successfully', async () => {
    const mockData = {
      data: { data: { url: 'https://example.com/image.jpg' } },
    };
    (axios.post as jest.Mock).mockResolvedValue(mockData);

    const image = new FormData();
    const result = await uploadImage(image);

    expect(result).toEqual('https://example.com/image.jpg');
  });

  it('should throw an error when upload fails', async () => {
    const errorMessage = 'Update failed';
    (axios.post as jest.Mock).mockRejectedValue(new Error(errorMessage));

    const image = new FormData();

    await expect(uploadImage(image)).rejects.toThrow(
      ERROR_MESSAGES.UPDATE_FAIL.title,
    );
  });
});
