import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const fetchData = () => {
  return axios.get('http://localhost:4000/superheroes');
};

export default function RQSuperheroes() {
  const onSuccess = ({ data }) => {
    console.log('perform side effect after fetching data', data);
  };

  const onError = (err) => {
    console.log('perform side effect after encountering error', err);
  };

  const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    ['super-heros'],
    fetchData,
    {
      /*
      cacheTime: 5000, // > default is 5 mins, data will be cashed for 5s (with background refetching) after user left current page; isLoading remains false

      staleTime: 30000, // > default is 0, from fresh to stale after 30s (without background refetching within 30s / no additional requests); isLoading and isFetching both remain false
      */
      /*
      refetchOnMount: 'always', // > default is true, no matter the query data is stale or not, the query will always refetch the data when component mounts

      refetchOnWindowFocus: true, // > default is true, anytime the window loses focus and gain focus again a background refetching is initiated

      refetchInterval: 2000, // > default is false, refetch data every 2s; pauses if window loses its focus
      refetchIntervalInBackground: true, // > default is false, continue to refetch data even when window is not in focus
      */
      /* 
      enabled: false, // > disabled fetching on mount
      */

      onSuccess,
      onError, // > retry 3 times before calling this func
      select: ({ data }) => data.map((hero) => hero.name), // > data transformation; return data contains an array of name
    }
  );

  // > if data remains the same as cashed data, isLoading is not changed but there is a background refetching to ensure the data is up to date
  console.log({ isLoading, isFetching });

  return (
    <>
      {isFetching ? (
        <h2>Loading...</h2>
      ) : (
        <>
          {isError ? (
            <h2>{error.message}</h2>
          ) : (
            <>
              <h2>React Query Superheroes</h2>
              <button onClick={refetch}>Fetch Data</button>
              {/* {data?.data.map(({ name }, index) => (
                <p key={index}>{name}</p>
              ))} */}

              {data.map((heroName, index) => (
                <p key={index}>{heroName}</p>
              ))}
            </>
          )}
        </>
      )}
    </>
  );
}
