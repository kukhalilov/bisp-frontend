import { useState } from "react";
import "../styles/bookappointment.css";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";
import { postData } from "../api/api";
import Doctor from "../interfaces/Doctor";
import { useSelector } from "react-redux";
import User from "../interfaces/User";
import { RootState } from "../redux/store";
import { duration } from "moment";

interface FormDetails {
  date: string;
  time: string;
  duration: number;
}

const BookAppointment = ({
  setModalOpen,
  doctor,
}: {
  setModalOpen: (open: boolean) => void;
  doctor: Doctor;
}) => {
  const [formDetails, setFormDetails] = useState<FormDetails>({
    date: "",
    time: "",
    duration: 0,
  });

  const userInfo = useSelector(
    (state: RootState) => state.root.userInfo
  ) as User;

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    return setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  const book = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      if (doctor?.id?._id === userInfo?._id) {
        toast.error("You cannot book an appointment with yourself");
      } else if (formDetails.date === "" || formDetails.time === "") {
        return toast.error("Input field should not be empty");
      } else if (formDetails.duration < 30) {
        return toast.error("Duration should be at least 30 minutes")
      } else {
        await toast.promise(
          postData("/appointments/book", {
            doctorId: doctor?._id,
            userId: userInfo?._id,
            date: formDetails.date,
            time: formDetails.time,
            duration: Number(formDetails.duration),
            doctorName: doctor?.id?.firstName,
            doctorSurname: doctor?.id?.lastName,
            userName: userInfo.firstName,
            userSurname: userInfo.lastName,
          }),
          {
            success: "Appointment booked successfully",
            error: "Unable to book appointment",
            loading: "Booking appointment...",
          }
        );
      }
      setModalOpen(false);
    } catch (error) {
      return error;
    }
  };

  return (
    <>
      <div className='modal flex-center'>
        <div className='modal__content'>
          <h2 className='page-heading'>Book Appointment</h2>
          <IoMdClose
            onClick={() => {
              setModalOpen(false);
            }}
            className='close-btn'
          />
          <div className='container flex-center book'>
            <form className='register-form'>
              <input
                type='date'
                name='date'
                className='form-input'
                value={formDetails.date}
                onChange={inputChange}
              />
              <input
                type='time'
                name='time'
                className='form-input'
                value={formDetails.time}
                onChange={inputChange}
              />
              <input
                type='number'
                name='duration'
                className='form-input'
                value={formDetails.duration}
                onChange={inputChange}
                placeholder="Enter duration in minutes"
              />
              <button type='submit' className='btn form-btn' onClick={book}>
                book
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookAppointment;
