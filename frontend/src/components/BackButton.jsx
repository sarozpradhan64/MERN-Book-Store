import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

const BackButton = ({ destination = "/" }) => {
  return (
    <div className="flex">
      <Link
        to={destination}
        className="flex text-indigo-700 px-4 py-1 rounded-lg w-fit"
      >
        <BsArrowLeft className="text-2xl" />&nbsp; Back
      </Link>
    </div>
  );
};

export default BackButton;
