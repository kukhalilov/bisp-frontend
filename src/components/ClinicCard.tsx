import React from "react";
import Clinic from "../interfaces/Clinic";

interface ClinicCardProps {
  clinic: Clinic;
}

export const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const ClinicCard: React.FC<ClinicCardProps> = ({ clinic }) => {
  return (
    <div className="clinic-card">
      <h3 className="clinic-name">{clinic.name}</h3>
      <p>
        <span className="clinic-label">Address:</span>{" "}
        <span className="clinic-info">{clinic.address}</span>
      </p>
      <p>
        <span className="clinic-label">Phone:</span>{" "}
        <span className="clinic-info">{clinic.phoneNumber}</span>
      </p>
      <p>
        <span className="clinic-label">Email:</span>{" "}
        <span className="clinic-info">{clinic.email}</span>
      </p>
      <p>
        <span className="clinic-label">Working Days:</span>{" "}
        <span className="clinic-info">
          {clinic.workingDays.map((d) => weekDays[d]).join(", ")}
        </span>
      </p>
      <p>
        <span className="clinic-label">Opening Hour:</span>{" "}
        <span className="clinic-info">{clinic.openingHour}</span>
      </p>
      <p>
        <span className="clinic-label">Closing Hour:</span>{" "}
        <span className="clinic-info">{clinic.closingHour}</span>
      </p>
    </div>
  );
};

export default ClinicCard;
