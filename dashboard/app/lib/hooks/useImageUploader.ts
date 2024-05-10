// Libs
import { useMutation } from '@tanstack/react-query';

// Types
import { IUploadImageResponse } from '@/lib/interfaces';

// Constants
import { SEARCH_PARAM } from '@/lib/constants';

// Utils
import { getSearchParam } from '@/lib/utils';

// Services
import { UploadImageHttpService } from '@/lib/services';

export const useUploadImage = () => {
  const { mutate: uploadImage, ...rest } = useMutation({
    mutationFn: (payload: FormData) =>
      UploadImageHttpService.post<IUploadImageResponse>({
        path: '',
        data: payload,
        searchParam: getSearchParam({ key: SEARCH_PARAM.UPLOAD_IMAGE }),
      }),
  });

  return { ...rest, uploadImage };
};
