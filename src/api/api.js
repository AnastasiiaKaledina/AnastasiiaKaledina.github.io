import axios from "axios"

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: { 
        "API-KEY": "13ab82a7-d62c-439a-9694-0a828341daa6" 
    }
});

export const userAPI = {
    getUsers (currentPage, pageSize) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            }); 
    },
    deleteUserFollowing (userId) {
        return instance.delete(`follow/${userId}`)
            .then(response => {
                return response.data;
            }); 
    },
    postUserFollowing (userId) {
        return instance.post(`follow/${userId}`)
            .then(response => {
                return response.data;
            }); 
    }, 
    getUserProfile (userId) {
        console.warn('Используется устаревший метод');
        return profileAPI.getUserProfile(userId);
    }
}

export const profileAPI = {
    getUserProfile (userId) { 
        return instance.get(`profile/${userId}`)
            .then(response => {
                return response.data;
            }); 
    },
    getStatus (userId) { 
        return instance.get(`profile/status/${userId}`)
            .then(response => {
                return response.data;
            }); 
    },
    updateStatus (status) { 
        return instance.put(`profile/status`, {status: status})
            .then(response => {
                return response.data;
            }); 
    },
    putPhoto(file) {
        const formData = new FormData();
        formData.append("image", file); // image - название с сервака, название данных, которые отсылаем

        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            } 
        });
    },
    postDataProfile(profile) {
        return instance.put(`profile`, profile)
            .then(response => {
                return response.data;
            });
    }
}


export const authAPI = {
    me () {
        return instance.get(`auth/me`)
            .then(response => {
                return response.data;
            }); 
    },
    login(email, password, rememberMe) {
        return instance.post(`auth/login`, {email, password, rememberMe})
            .then(response => {
                return response.data;
            }); 
    },
    logout() {
        return instance.delete(`auth/login`)
            .then(response => {
                return response.data;
            }); 
    }
}




