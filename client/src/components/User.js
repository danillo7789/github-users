import { gql, useQuery, NetworkStatus } from "@apollo/client";
import { useParams, Link } from "react-router-dom";

const getUser = gql`
  query UserQuery($login: String) {
    user(login: $login) {
      name
      login
      id
      location
      followers
    }
  }
`;

const User = () => {
  let { login } = useParams();

  const { loading, error, data, networkStatus } = useQuery(getUser, {
    variables: { login },
  });

  if (networkStatus === NetworkStatus.refetch) return "Refetching!";
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
  // console.log(data);
  const { name, id, location, followers } = data.user;

  return (
    <div className="container">
      <h1 className="my-2 text-center">User Details</h1>

      <div className="row">
        <ul className="list-group">
          <li className="list-group-item"><h3>Name: {name}</h3></li>
          <li className="list-group-item"><h5>Username: {login}</h5></li>
          <li className="list-group-item"><h5>Location: {location}</h5></li>
          <li className="list-group-item"><h5>Followers: {followers}</h5></li>
          <li className="list-group-item"><h5>ID: {id}</h5></li>
        </ul>
      </div>

      <Link className="btn btn-primary my-3" to='/'>Back</Link>
    </div>
  );
};

export default User;
