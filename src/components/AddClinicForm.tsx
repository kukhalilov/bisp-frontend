import { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { postData } from "../api/api";
import { useSelector } from "react-redux";
import User from "../interfaces/User";
import { RootState } from "../redux/store";
import { weekDays } from "./ClinicCard";

interface IProps {
    closeModal: () => void;
}

const AddClinicForm: React.FC<IProps> = ({closeModal}) => {
  const user = useSelector(
    (state: RootState) => state.root.userInfo
  ) as User;

  const [formDetails, setFormDetails] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    email: "",
    workingDays: [] as number[],
    openingHour: "",
    closingHour: "",
    applicant: user._id,
  });

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (formDetails.workingDays.includes(Number(value))) {
      setFormDetails({
        ...formDetails,
        workingDays: formDetails.workingDays.filter(
          (day) => day !== Number(value)
        ),
      });
    } else {
      setFormDetails({
        ...formDetails,
        workingDays: [...formDetails.workingDays, Number(value)],
      });
    }
  };

  const formSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const {
        name,
        address,
        phoneNumber,
        email,
        workingDays,
        openingHour,
        closingHour,
        applicant,
      } = formDetails;

      if (
        !name ||
        !address ||
        !phoneNumber ||
        !email ||
        workingDays.length === 0 ||
        !openingHour ||
        !closingHour
      ) {
        return toast.error("Input field should not be empty");
      }
      await toast.promise(
        postData(`/clinics/apply`, {
          name,
          address,
          phoneNumber,
          email,
          workingDays,
          openingHour,
          closingHour,
          applicant
        }),
        {
          loading: "Submitting application...",
          success: () => {
            closeModal();
            return "Thank You for submitting the application.";
          },
          error: "Unable to submit application",
        }
      );
    } catch (error) {
      return error;
    }
  };

  return (
    <form className="add-clinic-form" onSubmit={formSubmit}>
      <div className="form-field">
        <label htmlFor="name" className="form-label">
          Clinic Name:
        </label>
        <input
          type="text"
          name="name"
          className="form-input"
          placeholder="Enter clinic name"
          value={formDetails.name}
          onChange={onInputChange}
        />
      </div>
      <div className="form-field">
        <label htmlFor="address" className="form-label">
          Address:
        </label>
        <input
          type="text"
          name="address"
          className="form-input"
          placeholder="Enter clinic address"
          value={formDetails.address}
          onChange={onInputChange}
        />
      </div>
      <div className="form-field">
        <label htmlFor="phoneNumber" className="form-label">
          Phone Number:
        </label>
        <input
          type="text"
          name="phoneNumber"
          className="form-input"
          placeholder="Enter clinic phone number"
          value={formDetails.phoneNumber}
          onChange={onInputChange}
        />
      </div>
      <div className="form-field">
        <label htmlFor="email" className="form-label">
          Email:
        </label>
        <input
          type="text"
          name="email"
          className="form-input"
          placeholder="Enter clinic email"
          value={formDetails.email}
          onChange={onInputChange}
        />
      </div>
      <div className="form-field">
        <label className="form-label">Working Days:</label>
        <div className="form-input week-day-input">
          {weekDays.map((day, index) => (
            <span key={index} className="week-day-span">
              <label htmlFor={`day-${index}`} className="week-day-label">
                {day}
              </label>
              <input
                type="checkbox"
                id={`day-${index}`}
                value={index}
                checked={formDetails.workingDays.includes(index)}
                onChange={handleCheckboxChange}
              />
            </span>
          ))}
        </div>
      </div>
      <div className="form-field">
        <label htmlFor="openingHour" className="form-label">
          Opening Hour:
        </label>
        <input
          type="time"
          name="openingHour"
          className="form-input"
          placeholder="Enter Opening Hour"
          value={formDetails.openingHour}
          onChange={onInputChange}
        />
      </div>
      <div className="form-field">
        <label htmlFor="closingHour" className="form-label">
          Closing Hour:
        </label>
        <input
          type="time"
          name="closingHour"
          className="form-input"
          placeholder="Enter Closing Hour"
          value={formDetails.closingHour}
          onChange={onInputChange}
        />
      </div>
      <button type="submit" className="btn">
        Add
      </button>
    </form>
  );
};

export default AddClinicForm;
