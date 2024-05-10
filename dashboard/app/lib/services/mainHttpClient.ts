// Constants
import { STATISTICAL_API } from '@/lib/constants';

// Services
import { HttpService } from '@/lib/services';

export const MainHttpService = new HttpService(STATISTICAL_API);
