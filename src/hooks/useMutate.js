import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const addData = (hero) => axios.post('http://localhost:4000/superheroes', hero); // > mutation func

export default function useMutate() {
  const queryClient = useQueryClient();

  // > addData automatically receives argument from mutate func where it's been used
  return useMutation(addData, {
    onSuccess: (data) => {
      /* 
      queryClient.invalidateQueries(['superheroes']); 
      */
      // ^ refetch query to update ui when new data has been added
      /* 
      queryClient.setQueryData(['superheroes'], (oldData) => ({
        ...oldData,
        data: [...oldData.data, data.data], // > add new hero object from mutation response to the array of superheroes
      }));
      */
      // ^ to save additional network request, update existing query data with new data instead of refetching query to update ui afterwords
    },

    // * Optimistic Updates
    onMutate: async (newHero) => {
      await queryClient.cancelQueries(['superheroes']); // > cancel any outgoing refetches so optimistic update won't be overwritten

      const prevData = queryClient.getQueryData(['superheroes']); // > snapshot prev data

      queryClient.setQueryData(['superheroes'], (oldData) => ({
        ...oldData,
        data: [...oldData.data, { id: oldData?.data?.length + 1, ...newHero }],
      }));

      return { prevData }; // > roll back data in case the mutation errors out
    },
    // ^ will be called before mutation

    onError: (_err, _newHero, context) => {
      queryClient.setQueryData(['superheroes'], context.prevData);
    },
    // ^ rollback

    onSettled: () => {
      queryClient.invalidateQueries(['superheroes']);
    },
    // ^ will be called if the mutation either succeed or failed
  });
}
