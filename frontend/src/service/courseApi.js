import axiosClient from './axiosClient';

const courseApi = {
    getAll() {
        const url = '/course/getAll';
        return axiosClient.get(url);
    },
};

export default courseApi;
