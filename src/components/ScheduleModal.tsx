import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { addMinutes } from "date-fns";
import Modal from "react-modal";
import Doctor from "../interfaces/Doctor";
import "../styles/scheduleModal.css";

interface ScheduleModalProps {
  setModalOpen: (open: boolean) => void;
  doctor: Doctor;
}

const localizer = momentLocalizer(moment);
Modal.setAppElement("#root");

const ScheduleModal: React.FC<ScheduleModalProps> = ({
  setModalOpen,
  doctor,
}) => {
  const events = doctor.appointments.map((appointment) => {
    const [hours, minutes] = appointment.time.split(":").map(Number);
    const startTime = new Date(appointment.date);
    startTime.setHours(hours, minutes);
    const endTime = addMinutes(startTime, appointment.duration);

    return {
      title: "Appointment",
      start: startTime,
      end: endTime,
    };
  });

  return (
    <Modal
      isOpen={true}
      onRequestClose={() => setModalOpen(false)}
      contentLabel="Doctor Schedule"
      className="schedule-modal"
      overlayClassName="schedule-overlay"
    >
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 450 }}
      />
      <div className="schedule-action flex-center">
        <button className="btn" onClick={() => setModalOpen(false)}>
          Close
        </button>
      </div>
    </Modal>
  );
};

export default ScheduleModal;
