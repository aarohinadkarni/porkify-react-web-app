import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { BsTrash3Fill } from "react-icons/bs";
import * as client from "../client";
import "./index.css"
export function UserTable() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const users = await client.findAllUsers();
    setUsers(users);
  };

  const deleteUser = async (user) => {
    try {
      await client.deleteUser(user);
      setUsers(users.filter((u) => u._id !== user._id));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  if (!user || !user.is_moderator) {
    return <Navigate to="/home" replace />;
  }
  return (
    <div>
      <h1 className="all-users-title users-table">All Users</h1>
      <table className="table users-table">
        <thead>
          <tr style={{border:"none"}}>
            <th className="headers" style={{border:"none"}}>USERNAME </th>
            <th className="headers" style={{border:"none"}}>FIRST NAME</th>
            <th className="headers" style={{border:"none"}}>LAST NAME</th>
            <th className="headers" style={{border:"none"}}>EMAIL</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="users-table">
                <Link className="users-table" to={`/profile/${user._id}`}>{user.username}</Link>
              </td>
              <td className="users-table" style={{color:"#C0EB8F"}}>{user.first_name}</td>
              <td className=" users-table">{user.last_name}</td>
              <td className=" users-table">{user.email}</td>
              <td className="text-nowrap users-table d-flex justify-content-center align-items-center">
                <button
                  onClick={() => deleteUser(user)}
                  className="btn btn-danger me-2 items-center"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
