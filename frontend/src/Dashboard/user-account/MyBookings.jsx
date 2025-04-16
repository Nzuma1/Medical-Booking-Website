import React, { useContext } from "react";
import { authContext } from "../../context/authContext";
import useFetchData from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";
import DoctorCard from "../../components/Doctors/DoctorCard";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import { Link } from "react-router-dom";

const MyBookings = () => {
  const { token } = useContext(authContext);
  const {
    data: appointments,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/users/appointments/my-appointments`, token);

  return (
    <div>
      {loading && !error && <Loading />}
      {error && !loading && <Error errMessage={error} />}

      {!loading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {appointments.map((doctor) => (
            <DoctorCard doctor={doctor} key={doctor.id} />
          ))}
        </div>
      )}

      {!loading && !error && appointments.length === 0 && (
        <Link to="/doctors">
          <h2 className="mt-5 text-center leading-7 text-[20px] font-semibold text-primaryColor">
            No appointments bookedyet, in need of a doctor🤷‍♂️
          </h2>
        </Link>
      )}
    </div>
  );
};

export default MyBookings;
