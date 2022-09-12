import { useParams } from 'react-router-dom';
import { useDetail } from '../hooks';

export default function RQSuperhero() {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useDetail(id);

  return (
    <>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          {isError ? (
            <h2>{error.message}</h2>
          ) : (
            <p>
              {data.name} - {data.alterEgo}
            </p>
          )}
        </>
      )}
    </>
  );
}
