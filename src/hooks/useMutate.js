import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const addData = (hero) => axios.post('http://localhost:4000/superheroes', hero);

export default function useMutate() {
  const queryClient = useQueryClient();

  // > addData automatically receives argument from mutate func where it's been used
  return useMutation(addData, {
    onSuccess: (data) => {
      /* 
      queryClient.invalidateQueries(['superheroes']); // > refetch query to update ui when new data has been added
      */

      // > to save additional network request, update existing query data with new data instead of refetching query to update ui afterwords
      queryClient.setQueryData(['superheroes'], (oldData) => ({
        ...oldData,
        data: [...oldData.data, data.data], // > add new hero object from mutation response to the array of superheroes
      }));
    },
  });
}
