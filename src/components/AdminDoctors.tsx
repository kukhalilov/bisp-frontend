import toast from "react-hot-toast";
import Empty from "./Empty";
import "../styles/user.css";
import Doctor from "../interfaces/Doctor";
import { deleteData } from "../api/api";
import DataContainer from "./DataContainer";
import { doctorsSortFields } from "../pages/Doctors";
import { useState } from "react";

const AdminDoctors = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const deleteDoctor = async (userId: any) => {
    try {
      const confirm = window.confirm("Are you sure you want to delete?");
      if (confirm) {
        await toast.promise(deleteData(`/doctors/${userId}`), {
          success: "Doctor deleted successfully",
          error: "Unable to delete Doctor",
          loading: "Deleting Doctor...",
        });
      }
      setRefreshKey((prev) => prev + 1);
    } catch (error) {
      return error;
    }
  };

  const renderDoctors = (doctors: Doctor[]) => {
    if (!doctors) {
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
              <th>Experience</th>
              <th>Specialization</th>
              <th>Fee</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {doctors?.map((doctor, i) => {
              return (
                <tr key={doctor?._id}>
                  <td>{i + 1}</td>
                  <td>
                    <img
                      className="user-table-pic"
                      src={doctor?.id?.pic}
                      alt={doctor?.id?.firstName}
                    />
                  </td>
                  <td>{doctor?.id?.firstName}</td>
                  <td>{doctor?.id?.lastName}</td>
                  <td>{doctor?.id?.email}</td>
                  <td>{doctor?.id?.mobile}</td>
                  <td>{doctor?.experience}</td>
                  <td>{doctor?.specialty}</td>
                  <td>{doctor?.fee}</td>
                  <td className="action">
                    <button
                      className="btn user-btn"
                      onClick={() => {
                        deleteDoctor(doctor?.id?._id);
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
    <>
      <section className="user-section">
        <h3 className="home-sub-heading">All Doctors</h3>
        <div className="admin-data-container">
          <DataContainer
            url="/doctors"
            render={renderDoctors}
            sortFields={doctorsSortFields}
            key={refreshKey}
          />
        </div>
      </section>
    </>
  );
};

export default AdminDoctors;
