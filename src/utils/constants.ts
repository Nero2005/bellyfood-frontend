const env = process.env.NODE_ENV;
// export const API_URL =
//   env === "production"
//     ? "https://bellyfood.onrender.com/api/v1/"
//     : process.env.REACT_APP_BACKEND_URL || "";
export const API_URL = process.env.REACT_APP_BACKEND_URL || "";
console.log(API_URL);
