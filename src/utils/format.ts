export function formatNumberWithCommas(number: number) {
    const formattedNumber = number.toFixed(2);
    return formattedNumber;
}

// Xoá dấu của tiếng việt
export function removeAccents(str: string) {
    return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D');
}

export const formatCurrency = ({ value = 0, currency = 'VND' }) => {
    if (!isNaN(Number(value))) {
        switch (currency) {
            case 'USD':
                return `${Number(value)
                    .toFixed(2)
                    .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                    .replace(/\.?0+$/, '')} $`;
            case 'VND':
            default:
                return `${Number(value)
                    .toFixed(2)
                    .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                    .replace(/\.?0+$/, '')} đ`;
        }
    }
};
