import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const getUserByEmail = ({ queryKey }) =>
  axios.get(`http://localhost:4000/users/${queryKey[1]}`);

const getCoursesByChannelId = ({ queryKey }) =>
  axios.get(`http://localhost:4000/channels/${queryKey[1]}`);

export default function DependentQueries({ email }) {
  const { data: user } = useQuery(['user', email], getUserByEmail);

  const channelId = user?.data.channelId;

  useQuery(['courses', channelId], getCoursesByChannelId, {
    enabled: !!channelId,
  });

  console.log(channelId);
  return <div>DependentQueries</div>;
}
