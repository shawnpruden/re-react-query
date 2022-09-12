import { useQueries } from '@tanstack/react-query';
import axios from 'axios';

const fetchData = ({ queryKey }) =>
  axios.get(`http://localhost:4000/superheroes/${queryKey[1]}`);

export default function DynamicParallel({ ids }) {
  const results = useQueries({
    queries: ids.map((id) => ({
      queryKey: ['superhero', id],
      queryFn: fetchData,
    })),
  });

  console.log(results);

  return <div>DynamicParallel</div>;
}
