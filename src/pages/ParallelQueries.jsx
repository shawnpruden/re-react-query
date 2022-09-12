import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';

const getSuperheroes = () => axios.get('http://localhost:4000/superheroes');
const getFriends = () => axios.get('http://localhost:4000/friends');

export default function ParallelQueries() {
  const { data: superheroes } = useQuery(['superheroes'], getSuperheroes);
  const { data: friends } = useQuery(['friends'], getFriends);

  return (
    <div>
      {superheroes?.data.map(({ id, name }) => (
        <p key={id}>{name}</p>
      ))}
      {friends?.data.map(({ id, name }) => (
        <p key={id}>{name}</p>
      ))}
    </div>
  );
}
