import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const addData = (hero) => axios.post('http://localhost:4000/superheroes', hero);

export default function useMutate() {
  const queryClient = useQueryClient();

  return useMutation(addData, {
    onSuccess: () => {
      queryClient.invalidateQueries(['superheroes']); // > refetch query when new data has been added
    },
  }); // > addData automatically receives argument from mutate func where it's been used
}
