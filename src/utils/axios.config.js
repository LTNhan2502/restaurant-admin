import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:3000',
});


// Trước khi nó tuyền res lên thì nó phải chạy qua interceptor

// Add a request interceptor
instance.interceptors.request.use( (config) => {
    // config.headers.Authorization = `Bearer ${localStorage.getItem("access_token")}`;
    // return config;

    // Lấy token mới nhất từ localStorage
    const token = localStorage.getItem("access_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        // Xử lý khi không có token
        delete config.headers.Authorization;
    }
    return config;
},  (error) => {
    return Promise.reject(error);
});

// Response interceptor
instance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // Kiểm tra lỗi liên quan tới token
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem("refresh_token");

            // Nếu không có refresh token thì không xử lí
            if (!refreshToken) {
                return Promise.reject(error);
            }

            // Access token hết hạn
            try {
                // Xóa access token cũ
                localStorage.removeItem("access_token");

                // Gọi API làm mới access token
                const res = await instance.post("/auth/refreshtoken", {
                    refreshToken: refreshToken,
                });

                console.log(">> Check API config: ", res);

                // Cập nhật token mới
                const newAccessToken = res.data.data.access_token;
                localStorage.setItem("access_token", newAccessToken);

                // Cập nhật lại header của request bằng token mới
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                // Gọi lại API
                return instance.request(originalRequest);
            } catch (refreshError) {
                // Kiểm tra nếu refresh token hết hạn
                if (refreshError.response?.status === 401) {
                    console.error("Error refresh token");

                    // Xóa token và chuyển hướng tới trang login
                    localStorage.removeItem("access_token");
                    localStorage.removeItem("refresh_token");
                    window.alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
                    window.location.href = "/login";
                }

                return Promise.reject(refreshError);
            }
        }

        // Trả lỗi nếu không phải lỗi liên quan đến token
        if (error?.response?.data) return Promise.reject(error.response.data);
        return Promise.reject(error);
    }
);


export default instance