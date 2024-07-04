export enum EnumCustomerOrderSortableField {
    NUMBER = 'NUMBER',
    CREATED_AT = 'CREATED_AT',
}

export enum SortEnum {
    DESC = 'DESC',
    ASC = 'ASC',
}

export interface MerchantOrdersFilterInput {
    table_id: {
        eq: number;
    };
    created_at: {
        from: string;
        to: string;
    };
}
