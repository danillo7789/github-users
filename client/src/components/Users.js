import { gql, useQuery, NetworkStatus } from '@apollo/client';
import UserCard from './UserCard';

const getUsers = gql`
  query UsersQuery {
    users {
      id
      login
    }
  }
`;

const Users = () => {
  const { loading, error, data, networkStatus } = useQuery(getUsers);

  if (networkStatus === NetworkStatus.refetch) return 'Refetching!';
  if (loading) {
    return (
      <div class='d-flex justify-content-center'>
        <div class='m-5 spinner-border text-light' role='status'>
          <span class='visually-hidden'>Loading...</span>
        </div>
      </div>
    );
  }
  if (error) return console.log(JSON.stringify(error, null, 2));
  // console.log(data)

  return (
    <div>
      <div className='display-4 my-3 text-center'>
        <h1>Users</h1>
      </div>

      {data.users.map((user, index) => (
        <UserCard key={index} user={user} />
      ))}
    </div>
  );
};

export default Users;
