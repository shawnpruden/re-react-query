import axios from 'axios';
import React from 'react';
import { useQuery } from '@tanstack/react-query';

const fetchData = () => {
  return axios.get('http://localhost:4000/superheroes');
};

export default function RQSuperheroes() {
  const { isLoading, data, isError, error } = useQuery(
    ['super-heros'],
    fetchData
  );

  console.log(isLoading, data);

  return (
    <>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          {isError ? (
            <h2>{error.message}</h2>
          ) : (
            <>
              <h2>React Query Superheroes</h2>
              {data?.data.map(({ name }, index) => (
                <p key={index}>{name}</p>
              ))}
            </>
          )}
        </>
      )}
    </>
  );
}
