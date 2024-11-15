const data = {
  baseURL: process.env.BACKEND_HOST
    ? process.env.BACKEND_HOST
    : process.env.VUE_APP_BACKEND_HOST,
};
export default data;
