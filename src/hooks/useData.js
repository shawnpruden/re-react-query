import axios from 'axios';

import { useQuery } from '@tanstack/react-query';

const fetchData = () => axios.get('http://localhost:4000/superheroes');

export default function useData(onSuccess, onError) {
  return useQuery(['super-heros'], fetchData, {
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

    /* 
    select: ({ data }) => data.map((hero) => hero.name), // > data transformation; return data contains an array of name
    */

    select: ({ data }) => data,
  });
}
