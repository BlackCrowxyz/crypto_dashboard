import { ref } from 'vue';
import axios from 'axios';
import { errorState } from '@/states/errorState';

const BaseUrl = import.meta.env.VITE_BASEURL;

export default function useAxios() {

    // Function to create state refs for each request
    function createState() {
        const data = ref(null);
        const loading = ref(false);
        // We no longer hold error in the local state
        return { data, loading };
    }

    // Function to perform GET requests
    async function get(url, config = {}) {
        const { data, loading } = createState();
        loading.value = true;

        try {
            const response = await axios.get(`${BaseUrl}/${url}`, config);
            data.value = response.data;
        } catch (e) {
            console.error(e); // Log error
            errorState.showError(e.message); // Use showError from useError
        } finally {
            loading.value = false;
        }
        // Return data and loading states only
        return { data, loading };
    }

    // Function to perform POST requests
    async function post(url, payload, config = {}) {
        const { data, loading } = createState();
        loading.value = true;

        try {
            const response = await axios.post(`${BaseUrl}/${url}`, payload, config);
            data.value = response.data;
        } catch (e) {
            console.error(e); // Log error
            errorState.showError(e.message); // Use showError from useError
        } finally {
            loading.value = false;
        }
        // Return data and loading states only
        return { data, loading };
    }

    // You don't need to expose showError or clearError here as they will be used only internally
    return { get, post };
}