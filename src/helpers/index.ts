export const numberWithCommas = (x: number) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

export const formatPriceChange = (priceChange: number, after: number) => {
    if (Math.abs(priceChange) < 1) {
        return priceChange.toFixed(after);
    } else {
        return priceChange;
    }
}