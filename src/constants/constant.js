export const API_URL = 'https://harlequin-newt-kit.cyclic.app/api/';


// eslint-disable-next-line import/no-anonymous-default-export
export default {
  LOGIN:`${API_URL}user/login`,
  LOGOUT: `${API_URL}auth/logout`,
  SIGNUP: `${API_URL}user/signup`,
  FORGOT_PASSWORD: `${API_URL}user/send-reset-password-email`,
  GET_SERVICE_DATA: `${API_URL}services`,
  YOUTUBE:`${API_URL}youtube`,
  RESETPASSWORD:`${API_URL}user/reset-password`,
  ABOUT_US:`${API_URL}about_us`
  

};