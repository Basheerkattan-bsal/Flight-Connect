import axios from "axios";

export const getAirport = params => {
  const { latitude, longitude } = params;

  const out = axios.get(
    `http://localhost:1338/api/local-airport/?latitude=${latitude}&longitude=${longitude}`
  );

  return out;
};
