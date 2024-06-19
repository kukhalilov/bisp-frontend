import toast from "react-hot-toast";
import Empty from "./Empty";
import Doctor from "../interfaces/Doctor";
import Clinic from "../interfaces/Clinic";
import { putData } from "../api/api";
import DataContainer from "./DataContainer";
import { weekDays } from "./ClinicCard";
import { doctorsSortFields } from "../pages/Doctors";
import { clinicsSortFields } from "../pages/Clinics";
import { useState } from "react";

const AdminApplications = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  
  const acceptDoctorApplication = async (id: any) => {
    try {
      const confirm = window.confirm("Are you sure you want to accept?");
      if (confirm) {
        await toast.promise(putData(`/doctors/accept/${id}`), {
          loading: "Accepting application...",
          success: "Application accepted",
          error: "Error accepting application",
        });
      }
      setRefreshKey(prevKey => prevKey + 1);
    } catch (error) {
      return error;
    }
  };

  const rejectDoctorApplication = async (id: any) => {
    try {
      const confirm = window.confirm("Are you sure you want to reject?");
      if (confirm) {
        await toast.promise(putData(`/doctors/reject/${id}`), {
          loading: "Rejecting application...",
          success: "Application rejected",
          error: "Error rejecting application",
        });
      }
      setRefreshKey(prevKey => prevKey + 1);
    } catch (error) {
      return error;
    }
  };

  const acceptClinicApplication = async (id: any) => {
    try {
      const confirm = window.confirm("Are you sure you want to accept?");
      if (confirm) {
        await toast.promise(putData(`/clinics/accept/${id}`), {
          loading: "Accepting application...",
          success: "Application accepted",
          error: "Error accepting application",
        });
      }
      setRefreshKey(prevKey => prevKey + 1);
    } catch (error) {
      return error;
    }
  };

  const rejectClinicApplication = async (id: any) => {
    try {
      const confirm = window.confirm("Are you sure you want to reject?");
      if (confirm) {
        await toast.promise(putData(`/clinics/reject/${id}`), {
          loading: "Rejecting application...",
          success: "Application rejected",
          error: "Error rejecting application",
        });
      }
      setRefreshKey(prevKey => prevKey + 1);
    } catch (error) {
      return error;
    }
  };

  const renderDoctorApplications = (doctors: Doctor[]) => {
    if (!doctors || doctors.length === 0) {
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
              <th>Action</th>
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
                      src={
                        doctor?.id?.pic ||
                        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                      }
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
                      className="btn user-btn accept-btn"
                      onClick={() => {
                        acceptDoctorApplication(doctor?.id?._id);
                      }}
                    >
                      Accept
                    </button>
                    <button
                      className="btn user-btn reject-btn"
                      onClick={() => {
                        rejectDoctorApplication(doctor?.id?._id);
                      }}
                    >
                      Reject
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

  const renderClinicApplications = (clinics: Clinic[]) => {
    if (!clinics || clinics.length === 0) {
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
                    {clinic.applicant
                      ? `${clinic.applicant.firstName} ${clinic.applicant.lastName}`
                      : "Unknown"}
                  </td>
                  <td className="action">
                    <button
                      className="btn user-btn accept-btn"
                      onClick={() => {
                        acceptClinicApplication(clinic._id);
                      }}
                    >
                      Accept
                    </button>
                    <button
                      className="btn user-btn reject-btn"
                      onClick={() => {
                        rejectClinicApplication(clinic._id);
                      }}
                    >
                      Reject
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
      <h3 className="home-sub-heading">All Doctor Applications</h3>
      <div className="admin-data-container">
        <DataContainer
          url="/doctors/pending-doctors"
          render={renderDoctorApplications}
          sortFields={doctorsSortFields}
          key={refreshKey}
        />
      </div>

      <h3 className="home-sub-heading">All Clinic Applications</h3>
      <div className="admin-data-container">
        <DataContainer
          url="/clinics/pending-clinics"
          render={renderClinicApplications}
          sortFields={clinicsSortFields}
          key={refreshKey}
        />
      </div>
    </section>
  );
};

export default AdminApplications;
