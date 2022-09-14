import React, { Fragment } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchColors = ({ pageParam = 1 }) =>
  axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`);

export default function InfiniteQueries() {
  const {
    isLoading,
    isError,
    error,
    data,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage, // > will be true while fetching next page with fetchNextPage
  } = useInfiniteQuery(['colors'], fetchColors, {
    getNextPageParam: (_lastPage, pages) =>
      pages.length < 4 ? pages.length + 1 : undefined,
  });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <div>
        {data?.pages.map(({ data }, index) => {
          // > { data } = group
          return (
            <Fragment key={index}>
              {data.map(({ id, label }) => (
                <h2 key={id}>
                  {id} {label}
                </h2>
              ))}
            </Fragment>
          );
        })}
      </div>

      <div>
        <button onClick={fetchNextPage} disabled={!hasNextPage}>
          Load More
        </button>
      </div>

      <div>{isFetching && !isFetchingNextPage ? 'Fetching' : null}</div>
    </>
  );
}
