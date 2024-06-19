import "../styles/doctorcard.css";
import { useState } from "react";
import BookAppointment from "../components/BookAppointment";
import { toast } from "react-hot-toast";
import Doctor from "../interfaces/Doctor";
import ScheduleModal from "./ScheduleModal";

interface IProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<IProps> = ({ doctor }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);

  const handleModal = () => {
    if (localStorage.getItem("token") === "") {
      return toast.error("You must log in first");
    }
    setModalOpen(true);
  };

  return (
    <div className="card">
      <div className="card-top">
        <div className="card-img">
          <img src={doctor?.id?.pic} alt="profile" />
        </div>
        <h3
          className="card-name"
          title={`${doctor?.id?.firstName + " " + doctor?.id?.lastName}`}
        >
          Dr. {doctor?.id?.firstName + " " + doctor?.id?.lastName}
        </h3>
      </div>
      <div className="card-middle">
        <p className="specialization" title={doctor?.specialty}>
          {doctor?.specialty}
        </p>
        <p
          className="experience"
          title={`${doctor?.experience} years of experience`}
        >
          {doctor?.experience} years of experience
        </p>
        <p className="fee" title={`$ ${doctor?.fee} per hour`}>
          $ {doctor?.fee} per hour
        </p>
      </div>
      <button className="btn appointment-btn" onClick={handleModal}>
        Book Appointment
      </button>
      {modalOpen && (
        <BookAppointment setModalOpen={setModalOpen} doctor={doctor} />
      )}
      <button className="btn schedule-btn" onClick={() => setScheduleModalOpen(true)}>
        View Schedule
      </button>
      {scheduleModalOpen && (
        <ScheduleModal setModalOpen={setScheduleModalOpen} doctor={doctor} />
      )}
    </div>
  );
};

export default DoctorCard;
