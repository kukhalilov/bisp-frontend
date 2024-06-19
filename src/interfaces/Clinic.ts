import Doctor from "./Doctor";
import User from "./User";

export default interface Clinic {
  _id: string;
  name: string;
  address: string;
  phoneNumber: string;
  email: string;
  workingDays: [],
  openingHour: "",
  closingHour: "",
  doctors: Doctor[];
  status: string;
  applicant: User;
}
