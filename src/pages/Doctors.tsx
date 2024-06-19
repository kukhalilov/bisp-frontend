import DoctorCard from "../components/DoctorCard";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../styles/doctors.css";
import Empty from "../components/Empty";
import Doctor from "../interfaces/Doctor";
import DataContainer from "../components/DataContainer";

export const doctorsSortFields = [
  { value: "firstName", label: "First Name" },
  { value: "lastName", label: "Last Name" },
  { value: "experience", label: "Experience" },
  { value: "fee", label: "Fee" },
  { value: "specialty", label: "Specialization" },
];

const Doctors = () => {
  const renderDoctors = (doctors: Doctor[]) => {
    if (!doctors) {
      return <Empty />;
    }

    return (
      <div className="doctors-card-container">
        {doctors.length > 0 ? (
          doctors.map((doctor) => (
            <DoctorCard doctor={doctor} key={doctor._id} />
          ))
        ) : (
          <Empty />
        )}
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <section className="container doctors">
        <h2 className="page-heading">Our Doctors</h2>
        <DataContainer
          url="/doctors"
          render={renderDoctors}
          sortFields={doctorsSortFields}
        />
      </section>
      <Footer />
    </>
  );
};

export default Doctors;
