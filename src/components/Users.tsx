import toast from "react-hot-toast";
import Empty from "./Empty";
import User from "../interfaces/User";
import { deleteData } from "../api/api";
import DataContainer from "./DataContainer";
import { useState } from "react";

export const usersSortFields = [
  { value: "firstName", label: "First Name" },
  { value: "lastName", label: "Last Name" },
  { value: "age", label: "Age" },
];

const Users = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const deleteUser = async (userId: string) => {
    try {
      const confirm = window.confirm("Are you sure you want to delete?");
      if (confirm) {
        await toast.promise(deleteData(`/users/${userId}`), {
          success: "User deleted successfully",
          error: "Unable to delete user",
          loading: "Deleting user...",
        });
      }
      setRefreshKey((prev) => prev + 1);
    } catch (error) {
      return error;
    }
  };

  const renderUsers = (users: User[]) => {
    if (!users || users.length === 0) {
      return <Empty />;
    }

    return (
      <div className="user-container">
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Pic</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Mobile No.</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Is Doctor</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {users.map((ele, i) => {
              return (
                <tr key={ele._id}>
                  <td>{i + 1}</td>
                  <td>
                    <img
                      className="user-table-pic"
                      src={ele.pic}
                      alt={ele.firstName}
                    />
                  </td>
                  <td>{ele.firstName}</td>
                  <td>{ele.lastName}</td>
                  <td>{ele.email}</td>
                  <td>{ele.mobile}</td>
                  <td>{ele.age}</td>
                  <td>{ele.gender}</td>
                  <td>{ele.isDoctor ? "Yes" : "No"}</td>
                  <td className="action">
                    <button
                      className="btn user-btn"
                      onClick={() => {
                        deleteUser(ele._id);
                      }}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <section className="user-section">
      <h3 className="home-sub-heading">All Users</h3>
      <div className="admin-data-container">
        <DataContainer
          url="/users"
          render={renderUsers}
          sortFields={usersSortFields}
          key={refreshKey}
        />
      </div>
    </section>
  );
};

export default Users;
