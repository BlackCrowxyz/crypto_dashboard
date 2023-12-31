import { useFetch } from '@/composables/useFetch';

export const apis = {
  getCoinsList(vs_currency: string = 'usd') {
    // Name, Symbol, Current_price
    return useFetch(`coins/markets?vs_currency=${vs_currency}`);
  },
};