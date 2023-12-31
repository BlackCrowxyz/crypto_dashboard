import axios, { AxiosInstance } from 'axios';
import { ref } from 'vue';

const BaseUrl = import.meta.env.VITE_BASEURL

const axiosInstance: AxiosInstance = axios.create({
    baseURL: BaseUrl // Default base URL for all calls
});


export const useFetch = (apiUrl: string) => {
    const data = ref(null)
    const loading = ref(false)
    const error = ref(null)

    // TODO: handle error banner
    const fetchData = async () => {
        const url = BaseUrl + '/' + apiUrl
        data.value = null;
        loading.value = false;
        error.value = null

        console.log(url);
        try {
            const response = await axiosInstance.get(apiUrl);
            data.value = response.data;
        } catch (e) {
            console.log('An error occurred while fetching data.'); // Show error using useError
            error.value = e
        } finally {
            loading.value = false;
        }
    };

    return { fetchData, data, loading, error }
};