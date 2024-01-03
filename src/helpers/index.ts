export const numberWithCommas = (x: number) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

export const formatPriceChange = (priceChange: number, after: number = 2) => {
    if (!priceChange) return '-'
    if (!Number.isInteger(priceChange)) {
        return priceChange.toFixed(after);
    } else {
        return priceChange.toString();
    }
};

export const getPriceChangeClass = (priceChange) => ({
    "text-red": priceChange < 0,
    "text-green": priceChange > 0,
});