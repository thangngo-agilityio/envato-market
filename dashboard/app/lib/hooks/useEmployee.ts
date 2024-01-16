import { useQuery } from '@tanstack/react-query';

// Services
import { getEmployees } from '@/lib/services';
import { END_POINTS } from '../constants';

export const useEmployee = (searchParam = '') => {
  const query = useQuery({
    queryKey: [END_POINTS.EMPLOYEES, searchParam],
    queryFn: () => getEmployees(searchParam),
  });

  // TODO: update return value later
  return query;
};
