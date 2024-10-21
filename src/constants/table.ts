import { EStatusTable } from 'graphql/table/table';

interface ISTATUS {
    primaryColor: string;
    secondaryColor: string;
    value: EStatusTable;
    label: string;
}
export const TABLE_STATUS: Record<string, ISTATUS> = {
    available: {
        primaryColor: '#889092',
        secondaryColor: '#BBC7C9',
        value: EStatusTable.AVAILABLE,
        label: 'Available',
    },
    dining: {
        primaryColor: '#15B7FF',
        secondaryColor: '#9BE0FF',
        value: EStatusTable.DINING,
        label: 'Dining',
    },
    reserved: {
        primaryColor: '#1AC6CC',
        secondaryColor: '#7DE9ED',
        value: EStatusTable.RESERVED,
        label: 'Reserved',
    },
};

export const SIZES: Record<
    string,
    {
        width: string;
        maxWidth: string;
        minWidth: string;
        height: string;
        aspectRatio: string;
    }
> = {
    small: {
        width: 'auto',
        maxWidth: 'min(25%,204px)',
        minWidth: 'max(12%,204px)',
        height: '204px',
        aspectRatio: '1 / 1',
    },
    large: {
        width: 'auto',
        maxWidth: 'min(30%,288px)',
        minWidth: 'max(20%,288px)',
        height: '204px',
        aspectRatio: '3 / 4',
    },
};

export const STATUS: Record<
    string,
    { backgroundColor: string; borderColor: string; empty?: boolean }
> = {
    0: {
        backgroundColor: Object.values(TABLE_STATUS)[0].primaryColor,
        borderColor: Object.values(TABLE_STATUS)[0].secondaryColor,
        empty: true,
    },
    1: {
        backgroundColor: Object.values(TABLE_STATUS)[1].primaryColor,
        borderColor: Object.values(TABLE_STATUS)[1].secondaryColor,
    },
    2: {
        backgroundColor: Object.values(TABLE_STATUS)[2].primaryColor,
        borderColor: Object.values(TABLE_STATUS)[2].secondaryColor,
    },
};
