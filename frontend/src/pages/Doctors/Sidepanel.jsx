import { toast } from "react-toastify";
import convertTime from "../../utils/convertTime";
import { BASE_URL } from "./../../config";
import { useContext, useState } from "react";
import { HashLoader } from "react-spinners";
import { authContext } from "../../context/authContext";

const Sidepanel = ({ doctorId, ticketPrice, timeSlots }) => {
  const { token } = useContext(authContext);
  const [loading, setLoading] = useState(false);

  const bookingHandler = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${BASE_URL}/bookings/checkout-session/${doctorId}`,
        {
          method: "post",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message + "try again");
      }

      if (data.session.url) {
        window.location.href = data.session.url;
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="shadow-panelShadow p-3 lg:p-5 rounded-md">
      <div className="flex items-center justify-between">
        <p className="text__para mt-0 font-semibold">Ticket Price </p>
        <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-textColor font-bold">
          {ticketPrice} KSh
        </span>
      </div>

      <div className="mt-[30px]">
        <p className="text__para mt-0 full-semibold text-headingColor">
          Available Time Slots
        </p>
        <ul className="mt-3">
          {timeSlots?.map((item, index) => (
            <li key={index} className="flex items-center justify-between mb-2">
              <p className="text-[15px] leading-6 text-textColor font-semibold">
                {item.day.charAt(0).toUpperCase() + item.day.slice(1)}
              </p>
              <p className="text-[15px] leading-6 text-textColor font-semibold">
                {convertTime(item.startingTime)} -{" "}
                {convertTime(item.endingTime)}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <button onClick={bookingHandler} className="btn px-2 w-full rounded-md">
        {loading ? <HashLoader size={25} color="#fff" /> : "Book Appointment"}
      </button>
    </div>
  );
};

export default Sidepanel;
