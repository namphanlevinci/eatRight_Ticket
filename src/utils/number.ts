export function roundTo(num: number, decimalPlaces: number) {
    const factor = Math.pow(10, decimalPlaces);
    return Math.round(num * factor) / factor;
}
