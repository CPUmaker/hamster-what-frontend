export const BASE_URL = "https://hamsterwhat.com";

const API_URL = BASE_URL + "/api";

export const endpoints = {
  register: API_URL + "/auth/register",
  login: API_URL + "/auth/login",
  logout: API_URL + "/auth/logout",
  validate_token: API_URL + "/auth/validate-token",
  delete_account: API_URL + "/auth/delete-account",
  apple: API_URL + "/auth/apple",
  google: API_URL + "/auth/google",
  facebook: API_URL + "/auth/facebook",
  bill: API_URL + "/bill/",
  search: API_URL + "/bill/search/",
  pricesum: API_URL + "/bill/price-sum/",
  change_password: API_URL + "/change-password",
  password_reset: API_URL + "/password_reset",
  coupon: API_URL + "/coupon",
  profile: API_URL + "/profile",
};
