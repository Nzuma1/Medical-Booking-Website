import { useState, useEffect, useContext } from "react";
import { authContext } from "../context/authContext";

const useFetchData = (url) => {
  const { token } = useContext(authContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const result = await res.json();

        if (!res.ok) {
          throw new Error(result.message + "🤢");
        }

        setData(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url, token]);

  return {
    data,
    loading,
    error,
  };
};

export default useFetchData;
