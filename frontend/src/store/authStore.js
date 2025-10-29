export const authStore = {
  get token() { return localStorage.getItem("access_token"); },
  set token(val) {
    if (val) localStorage.setItem("access_token", val);
    else localStorage.removeItem("access_token");
  }
};
