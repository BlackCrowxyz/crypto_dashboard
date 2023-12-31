import { ref } from 'vue';
import axios from 'axios';

const BaseUrl = import.meta.env.VITE_BASEURL

export default function useAxios() {

    // Function to create state refs for each request
    function createState() {
        const data = ref(null);
        const error = ref(null);
        const loading = ref(false);
        return { data, error, loading };
    }

    // Function to perform GET requests
    async function get(url, config = {}) {
        url = `${BaseUrl}/${url}`
        const { data, error, loading } = createState();
        loading.value = true;

        try {
            const response = await axios.get(url, config);
            data.value = response.data;
        } catch (e) {
            console.log(e);
            error.value = e;
        } finally {
            loading.value = false;
        }
        return { data, error, loading };
    }

    // Function to perform POST requests
    async function post(url, payload, config = {}) {
        url = `${BaseUrl}/${url}`
        const { data, error, loading } = createState();
        loading.value = true;

        try {
            const response = await axios.post(url, payload, config);
            data.value = response.data;
        } catch (e) {
            console.log(e);
            error.value = e;
        } finally {
            loading.value = false;
        }
        return { data, error, loading };
    }

    return { get, post };
}