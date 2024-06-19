import toast from "react-hot-toast";
import Empty from "./Empty";
import "../styles/user.css";
import Clinic from "../interfaces/Clinic";
import { deleteData } from "../api/api";
import DataContainer from "./DataContainer";
import { weekDays } from "./ClinicCard";
import User from "../interfaces/User";
import { clinicsSortFields } from "../pages/Clinics";
import { useState } from "react";

const AdminClinics = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const deleteClinic = async (clinicId: any) => {
    try {
      const confirm = window.confirm("Are you sure you want to delete?");
      if (confirm) {
        await toast.promise(deleteData(`/clinics/${clinicId}`), {
          success: "Clinic deleted successfully",
          error: "Unable to delete Clinic",
          loading: "Deleting Clinic...",
        });
      }
      setRefreshKey((prev) => prev + 1);
    } catch (error) {
      return error;
    }
  };

  const renderClinics = (clinics: Clinic[]) => {
    if (!clinics) {
      return <Empty />;
    }

    return (
      <div className="user-container">
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Working Days</th>
              <th>Opening Hour</th>
              <th>Closing Hour</th>
              <th>Applicant</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {clinics?.map((clinic, i) => {
              const applicant = clinic.applicant as User;
              return (
                <tr key={clinic._id}>
                  <td>{i + 1}</td>
                  <td>{clinic.name}</td>
                  <td>{clinic.address}</td>
                  <td>{clinic.phoneNumber}</td>
                  <td>{clinic.email}</td>
                  <td>
                    {clinic.workingDays
                      .map((dayIndex) => weekDays[dayIndex])
                      .join(", ")}
                  </td>
                  <td>{clinic.openingHour}</td>
                  <td>{clinic.closingHour}</td>
                  <td>
                    {applicant
                      ? `${applicant.firstName} ${applicant.lastName}`
                      : "Unknown"}
                  </td>
                  <td className="action">
                    <button
                      className="btn user-btn"
                      onClick={() => {
                        deleteClinic(clinic._id);
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
      <h3 className="home-sub-heading">All Clinics</h3>
      <div className="admin-data-container">
        <DataContainer
          url="/clinics"
          render={renderClinics}
          sortFields={clinicsSortFields}
          key={refreshKey}
        />
      </div>
    </section>
  );
};

export default AdminClinics;
