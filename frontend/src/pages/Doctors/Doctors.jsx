import React, { useEffect, useState } from 'react';
import DoctorCard from './../../components/Doctors/DoctorCard';
import Testimonial from '../../components/Testimonial/Testimonial';
import useFetchData from '../../hooks/useFetchData';
import Loader from '../../components/Loader/Loading';
import Error from '../../components/Error/Error';
import { BASE_URL } from '../../config';

const Doctors = () => {
  const [query, setQuery] = useState('');
  const [debounceQuery, setDebounceQuery] = useState('');

  const handleSearch = () => {
    setQuery(query.trim());
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceQuery(query);
    }, 700);
    return () => clearTimeout(timeout);
  }, [query]);

  const { data: doctors, loading, error } = useFetchData(
    `${BASE_URL}/doctors?query=${debounceQuery}`
  );

  return (
    <>
      <section className="bg-[#fff9ea]">
        <div className="container text-center">
          <h2 className="heading">Find a Doctor</h2>
          <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
            <input
              type="search"
              className="py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor"
              placeholder="Search doctor by name or specialization"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
            />
            <button className="btn mt-0 rounded-[0px] rounded-r-md" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          {loading && <Loader />}
          {error && <Error />}

          {!loading && !error && doctors.length === 0 && (
            <p>Not found. Please refine your search.</p>
          )}

          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:grid-cols-4">
              {doctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center">What our patients say</h2>
            <p className="text__para text-center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed Lorem
            </p>
          </div>

          {/* Render actual testimonials here */}
          <Testimonial />
        </div>
      </section>
      {/* End of testimonials */}
    </>
  );
};

export default Doctors;
