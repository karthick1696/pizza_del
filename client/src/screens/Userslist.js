// eslint disable react-hooks\exhaustive-deps
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Error from "../components/Error";
import Loading from "../components/Loading";
import { deleteUser, getAllUsers } from "../actions/userActions";

export default function Userslist() {
  const dispatch = useDispatch();
  const usersstate = useSelector((state) => state.getAllUsersReducer);
  const loginState = useSelector((state) => state.loginUserReducer);
  const { error, loading, users } = usersstate;
  const { currentUser } = loginState;
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);
  return (
    <div>
      <h1>Users list</h1>
      {loading && <Loading />}
      {error && <Error error="Something went wrong" />}
      <table className="table table-striped table-bordered table-responsive-sm">
        <thead className="thead-dark">
          <tr>
            <th>User Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {users &&
            users.map((user, idx) => {
              const isActiveUser = user?._id === currentUser?._id
              return (
                <tr key={`users${idx}`}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {
                      !isActiveUser ? (
                        <i
                          className="fa fa-trash"
                          onClick={() => {
                            dispatch(deleteUser(user._id));
                          }}
                        ></i>
                      ) : null
                    }
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
