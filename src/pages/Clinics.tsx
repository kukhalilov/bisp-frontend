import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ClinicCard from "../components/ClinicCard";
import Clinic from "../interfaces/Clinic";
import Modal from "react-modal";
import AddClinicForm from "../components/AddClinicForm";
import "../styles/clinics.css";
import DataContainer from "../components/DataContainer";
import Empty from "../components/Empty";

Modal.setAppElement("#root");

export const clinicsSortFields = [
  { value: "name", label: "Name" },
  { value: "address", label: "Address" },
  { value: "openingHour", label: "Opening Hour" },
  { value: "closingHour", label: "Closing Hour" },
];

const Clinics = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const renderClinics = (clinics: Clinic[]) => {
    if (!clinics) {
      return <Empty />;
    }

    return (
      <div className="clinics-card-container">
        {clinics.length > 0 ? (
          clinics.map((clinic) => (
            <ClinicCard clinic={clinic} key={clinic._id} />
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
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="Modal"
        overlayClassName="Overlay"
      >
        <AddClinicForm closeModal={() => setModalIsOpen(false)} />
        <button
          className="btn close-modal-btn"
          onClick={() => setModalIsOpen(false)}
        >
          Close
        </button>
      </Modal>

      <section className="container clinics">
        <h2 className="page-heading">Clinics</h2>
        <div className="add-clinic">
          <button
            className="btn add-clinic-btn"
            onClick={() => setModalIsOpen(true)}
          >
            Add a clinic
          </button>
        </div>
        <DataContainer
          url="/clinics"
          render={renderClinics}
          sortFields={clinicsSortFields}
        />
      </section>
      <Footer />
    </>
  );
};

export default Clinics;
