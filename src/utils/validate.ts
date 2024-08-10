export function checkStringType(str: string) {
    // Sử dụng regex để kiểm tra xem chuỗi có chứa toàn số hay không
    const isNumber = /^\d+$/.test(str);

    if (isNumber) {
        return 'number';
    }
    return 'name';
}
