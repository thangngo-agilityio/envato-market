import axios from 'axios';

// constants
import { ERROR_MESSAGES } from '@app/constants';

export const uploadImage = async (image: FormData): Promise<string> => {
  try {
    const response = await axios.post(
      `${process.env.VITE_UPLOAD_URL}?key=${process.env.VITE_UPLOAD_KEY}`,
      image,
    );

    return response.data.data.url;
  } catch (error) {
    throw new Error(ERROR_MESSAGES.UPDATE_FAIL.title);
  }
};
