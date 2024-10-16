interface ISTATUS {
    primaryColor: string;
    secondaryColor: string;
    value: string;
    label: string;
}
export const TABLE_STATUS: Record<string, ISTATUS> = {
    available: {
        primaryColor: '#889092',
        secondaryColor: '#BBC7C9',
        value: 'available',
        label: 'Available',
    },
    dining: {
        primaryColor: '#15B7FF',
        secondaryColor: '#9BE0FF',
        value: 'dining',
        label: 'Dining',
    },
    reserved: {
        primaryColor: '#1AC6CC',
        secondaryColor: '#7DE9ED',
        value: 'reserved',
        label: 'Reserved',
    },
};
