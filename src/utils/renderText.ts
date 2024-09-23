export function getLastFourChars(str: string) {
    if (str?.length <= 4) {
        return str; // Trả về chuỗi gốc nếu chuỗi có độ dài nhỏ hơn hoặc bằng 4
    }
    return str?.slice(-4);
}

export function capitalizeFirstLetter(str: string) {
    return (
        str
            ?.split(' ')
            .map((word) => {
                return (
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                );
            })
            .join(' ') || 'New'
    );
}
