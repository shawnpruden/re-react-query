import axios from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const fetchData = ({ queryKey }) => {
  const id = queryKey[1];

  return axios.get(`http://localhost:4000/superheroes/${id}`);
};

export default function useDetail(id) {
  const queryClient = useQueryClient(); // > get access to query cache and set initial data

  return useQuery(['detail', id], fetchData, {
    select: ({ data }) => data,

    initialData: () => {
      const hero = queryClient
        .getQueryData(['superheroes'])
        ?.data?.find((hero) => hero.id === parseInt(id));

      console.log(hero);

      return hero ? { data: hero } : undefined; // > if undefined, it will display a loading indicator
    },
  });
}
