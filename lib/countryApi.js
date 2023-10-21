import axios from "axios";

// const baseUrl = "https://countriesnow.space/api/v0.1/countries";

// axios.defaults.baseURL = baseUrl;
// Counties GET https://countriesnow.space/api/v0.1/countries/positions
// State GET https://countriesnow.space/api/v0.1/countries/states/q?country=Germany
export const getCountries = async () => {
  const url = `https://countriesnow.space/api/v0.1/countries/positions`;
  return await axios.get(url);
};

export const getStatesForCountry = async (country) => {
  const url = `https://countriesnow.space/api/v0.1/countries/states/q?country=${country}`;
  return await axios.get(url);
};

export const getCities = async (country, state) => {
  const url = `https://countriesnow.space/api/v0.1/countries/state/cities/q?country=${country}&state=${state}`;
  return await axios.get(url);
};
