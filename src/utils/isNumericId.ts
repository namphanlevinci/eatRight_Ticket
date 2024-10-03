export function isCartIdFromLocal(id: string) {
    try {
        return id.length > 4 ? false : true;
    } catch (error) {
        return false;
    }
}
