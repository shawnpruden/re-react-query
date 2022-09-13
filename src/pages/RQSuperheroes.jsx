import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFetch, useMutate } from '../hooks';

export default function RQSuperheroes() {
  const [name, setName] = useState('');
  const [alterEgo, setAlterEgo] = useState('');

  const onSuccess = ({ data }) => {
    console.log('perform side effect after fetching data', data);
  };

  const onError = (err) => {
    console.log('perform side effect after encountering error', err);
  };

  const { data, isLoading, isFetching, isError, error, refetch } = useFetch(
    onSuccess,
    onError
  );

  const { mutate: addHero } = useMutate();

  // > if data remains the same as cashed data, isLoading is not changed but there is a background refetching to ensure the data is up to date
  // console.log({ isLoading, isFetching });

  const handleClick = () => {
    console.log({ name, alterEgo });

    const hero = { name, alterEgo };

    addHero(hero);
  };

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

              <div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="text"
                  value={alterEgo}
                  onChange={(e) => setAlterEgo(e.target.value)}
                />
                <button onClick={handleClick}>Add Hero</button>
              </div>

              <button onClick={refetch}>Fetch Data</button>
              {/* {data?.data.map(({ name }, index) => (
                <p key={index}>{name}</p>
              ))} */}

              {data.map(({ id, name }) => (
                <p key={id}>
                  <Link
                    to={`/rq-super-heroes/${id}`}
                    style={{ all: 'unset', cursor: 'pointer' }}
                  >
                    {name}
                  </Link>
                </p>
              ))}
            </>
          )}
        </>
      )}
    </>
  );
}
