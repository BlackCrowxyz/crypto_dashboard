import useAxios from "@/composables/useAxios";
const { get } = useAxios();

function createQueryString(params) {
    return Object.entries(params)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');
}

export const apis = {
    getCoinsList: ({ vs_currency = "usd" } = {}) => get(`coins/markets?vs_currency=${vs_currency}`),
    getCoinsListByName: ({
        vs_currency = "usd",
        order = "market_cap_desc",
        per_page = 100,
        page = 1,
        sparkline = false,
        names
    }) => {
        const query = createQueryString({
            vs_currency,
            ids: names,
            order,
            per_page,
            page,
            sparkline,
            locale: 'en'
        });
        return get(`coins/markets?${query}`);
    },
    getCoinsListBySymbol: ({
        vs_currency = "usd",
        order = "market_cap_desc",
        per_page = 100,
        page = 1,
        sparkline = false,
    }) => {
        const query = createQueryString({
            vs_currency,
            order,
            per_page,
            page,
            sparkline,
            locale: 'en'
        });
        return get(`coins/markets?${query}`);
    },
    getChart: async ({ coin_id, days, vs_currency = "usd" }) => {
        const query = createQueryString({ vs_currency, days })
        // await get(`coins/${coin_id}/market_chart?vs_currency=${vs_currency}&days=${options.days}`)
        return await get(`coins/${coin_id}/market_chart?${query}`)
    },
    getCoinDetail: async (coin_id: string) => await get(`coins/${coin_id}`)

}