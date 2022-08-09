const env = process.env.NODE_ENV;
export const API_URL =
  env === "production"
    ? "https://bellyfood-backend.herokuapp.com/api/v1/"
    : "http://localhost:8000/api/v1/";
console.log(API_URL);
