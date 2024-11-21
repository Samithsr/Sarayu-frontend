import { useEffect, useState } from "react";
import apiClient from "./apiClient";

const useApi = ({ method, url, params, dp }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  useEffect(
    () => {
      callApi();
    },
    dp ? dp : []
  );
  const callApi = async () => {
    try {
      const res = await apiClient[method](url, params);
      setData(res?.data?.data);
    } catch (error) {
      setError(error?.response?.data?.error);
    }
  };
  return { data, error };
};

export default useApi;
