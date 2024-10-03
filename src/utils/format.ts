export function formatNumberWithCommas(number: number) {
    const formattedNumber = number?.toFixed(2);
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

export const formatPhoneNumberByUSA = (phoneNumberString: string) => {
    const fPhoneNumberString = phoneNumberString.slice(2);
    const cleaned = ('' + fPhoneNumberString).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + ' ' + match[3];
    }
    return null;
};

export const formatMoney = (currency: string) => {
    if (currency === undefined || currency === '' || currency === null) {
        return '';
    }
    const money = currency.toString().replace(/[^0-9.-]+/g, '');
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    return money ? formatter.format(Number(money)) : '';
};

export const formatPrice = (value: string) => {
    // Chuyển đổi giá trị định dạng thành số
    return parseFloat(value.replace(/[$,]/g, '')) || 0; // loại bỏ ký hiệu $ và dấu ,
};

export const convertMethod = (method: any) => {
    if(method?.toString()?.toLocaleLowerCase?.()?.includes?.("purchase")){
        return "Other"
    }
    return method;
}