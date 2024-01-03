import { ref } from 'vue';
import axios from 'axios';
import { errorState } from '@/states/errorState';

const BaseUrl = import.meta.env.VITE_BASEURL;

function getUrl(url: string) {
    return `${BaseUrl}/${url}`
}

export default function useAxios() {

    const data = ref(null);

    async function get(url: string, config = {}) {
        try {
            const response = await axios.get(getUrl(url), config);
            data.value = response.data;
        } catch (e) {
            console.error(e);
            errorState.showError(e.message);
        }
        return data.value
    }

    async function post(url: string, payload: object, config = {}) {
        try {
            const response = await axios.post(getUrl(url), payload, config);
            data.value = response.data;
        } catch (e) {
            console.error(e);
            errorState.showError(e.message);
        }
        return data.value
    }

    return { get, post };
}