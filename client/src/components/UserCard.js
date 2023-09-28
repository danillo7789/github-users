import { Link } from "react-router-dom";

const UserCard = ({ user: {login, id} }) => {
  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-10">
          <h3>
            Username: {login}{" "}
          </h3>
          <h5>ID: {id} </h5>
        </div>

        <div className="col-md-2">
          <Link to={`/user/${login}`} className="btn btn-info mt-3">
            User details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
