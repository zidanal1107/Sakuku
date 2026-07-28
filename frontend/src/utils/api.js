import axios from "axios";

// 1. Buat Instance Axios dengan Base URL backend kamu
const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// 2. REQUEST INTERCEPTOR: Otomatis Tempel Token JWT
api.interceptors.request.use(
  (config) => {
    // Ambil token dari localStorage
    const token = localStorage.getItem("sakuku_token");

    // Jika token ada, tambahkan ke Header Authorization
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 3. RESPONSE INTERCEPTOR: Penanganan jika Token Expired (401)
api.interceptors.response.use(
  (response) => response, // Jika response sukses (2xx), langsung kembalikan
  (error) => {
    // Jika backend mengembalikan status 401 (Unauthorized/Token kadaluwarsa)
    if (error.response && error.response.status === 401) {
      // Hapus token dan data user dari storage
      localStorage.removeItem("sakuku_token");
      localStorage.removeItem("sakuku_user");

      // Redirect paksa ke halaman login atau trigger event reload
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);

export default api;
