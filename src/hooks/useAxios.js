import { useState, useEffect } from "react";

const useAxios = () => {
  const [response, setResponse] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [controller, setController] = useState();

  const axiosFetch = async (configObj) => {
    const { axiosInstance, method, url, requestConfig = {} } = configObj;

    try {
      setLoading(true);
      const ctrl = new AbortController();
      setController(ctrl);
      const res = await axiosInstance[method.toLowerCase()](url, {
        ...requestConfig,
        signal: ctrl.signal,
      });
      setResponse(res.data);
      return true;
    } catch (err) {
      if (err.isAxiosError) {
        if (err.response) {
          setErrorMessage(err.response.data.error);
        }
      }
      setErrorMessage(err.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // useEffect cleanup function
    return () => controller && controller.abort();
  }, [controller]);

  return [response, errorMessage, loading, axiosFetch];
};

export default useAxios;
