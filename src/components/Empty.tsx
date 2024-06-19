import { FaRegSadCry } from "react-icons/fa";

const Empty = () => {
  return (
    <div className="flex-center nothing">
      <FaRegSadCry className="nothing-icon" size={50} />
      <p>Nothing to show</p>
    </div>
  );
};

export default Empty;
