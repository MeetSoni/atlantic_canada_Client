export const API_URL = 'https://dull-teal-moose-belt.cyclic.app/api/';


// eslint-disable-next-line import/no-anonymous-default-export
export default {
  LOGIN:`${API_URL}user/login`,
  LOGOUT: `${API_URL}auth/logout`,
  SIGNUP: `${API_URL}user/signup`,
  FORGOT_PASSWORD: `${API_URL}user/send-reset-password-email`,
  GET_SERVICE_DATA: `${API_URL}services/subservices`,
  GET_ALL_SERVICE_DATA: `${API_URL}services`,
  YOUTUBE:`${API_URL}youtube`,
  RESETPASSWORD:`${API_URL}user/reset-password`,
  PROVINCE_BY_ID:`${API_URL}province`,
  ABOUT_US:`${API_URL}about_us`,
  GET_USERDATA_BY_ID:`${API_URL}getdatabyemail`,
  GET_ALL_HOME_PROVINCES:`${API_URL}home_provinces`,
  ADD_PROFILE_PHOTO_URL:`${API_URL}addprofilepic`,
  UPDATE_PROFILE_DATA:`${API_URL}profileupdate`,
  SEND_CONTACT_INFO:`${API_URL}user/sendcontactinfo`,
  DELETE_ITEM:`${API_URL}delete`


};