// Constants
import { UPLOAD_IMAGE_API } from '@/lib/constants';

// Services
import { HttpService } from '@/lib/services';

export const UploadImageHttpService = new HttpService(UPLOAD_IMAGE_API);
