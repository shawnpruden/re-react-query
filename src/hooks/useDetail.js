import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const fetchData = ({ queryKey }) => {
  const id = queryKey[1];

  return axios.get(`http://localhost:4000/superheroes/${id}`);
};

export default function useDetail(id) {
  return useQuery(['detail', id], fetchData, {
    select: ({ data }) => data,
  });
}
