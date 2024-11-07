import axiosClient from './axiosClient';

const enrollmentApi = {
    enroll(enrollRequest) {
        const url = '/enrollment/enroll';
        return axiosClient.post(url, enrollRequest);
    },
};

export default enrollmentApi;
