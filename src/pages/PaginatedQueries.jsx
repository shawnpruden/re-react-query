import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const getColors = ({ queryKey }) => {
  return axios.get(
    `http://localhost:4000/colors?_limit=2&_page=${queryKey[1]}`
  );
};

export default function PaginatedQueriesPage() {
  const [page, setPage] = useState(1);

  const { isLoading, isError, error, data, isFetching } = useQuery(
    ['colors', page],
    getColors,
    { keepPreviousData: true }
  );

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <div>
        {data?.data.map((color) => (
          <div key={color.id}>
            <h2>
              {color.id}. {color.label}
            </h2>
          </div>
        ))}
      </div>

      <div>
        <button
          onClick={() => setPage((prevState) => prevState - 1)}
          disabled={page === 1}
        >
          Prev
        </button>
        &nbsp; &nbsp; &nbsp;
        <button
          onClick={() => setPage((prevState) => prevState + 1)}
          disabled={page === 4}
        >
          Next
        </button>
      </div>

      <br />
      {isFetching && 'Loading...'}
    </>
  );
}
