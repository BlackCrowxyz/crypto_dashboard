// errorState.js
import { reactive } from 'vue';

export const errorState = reactive({
    error: 'null',
    showError(errorMessage) {
        this.error = errorMessage;
        setTimeout(() => this.clearError(), 2000);
    },
    clearError() {
        this.error = null;
    }
});