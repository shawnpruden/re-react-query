import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const addData = (hero) => axios.post('http://localhost:4000/superheroes', hero);

export default function useMutate() {
  return useMutation(addData); // > addData automatically receives argument from mutate func where it's been used
}
