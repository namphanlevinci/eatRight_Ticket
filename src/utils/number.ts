export function roundTo(num: number, decimalPlaces: number) {
    const factor = Math.pow(10, decimalPlaces);
    return Math.round(num * factor) / factor;
}

export function formatPhoneNumber(phoneNumber: string) {
    // Lấy độ dài của chuỗi

    // Thay thế các ký tự trước 4 số cuối bằng "x"
    const masked = phoneNumber.slice(0, -4).replace(/\d/g, 'x');

    // Ghép phần bị che và 4 số cuối lại
    const formattedNumber = masked + phoneNumber.slice(-4);

    return formattedNumber;
}
